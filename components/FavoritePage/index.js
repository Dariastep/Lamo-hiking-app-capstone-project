import RouteCard from "../RouteCard";
import SearchBar from "../SearchBar";
import { ListItem, List } from "../RouteList/RouteList.styled.js";
import { useState, useEffect } from "react";
import useSWR, { mutate } from "swr";
import { toggleFavorite } from "../../utils/toggleFavorite.js";

export default function FavoritePage() {
  const { data: favoriteRoutes, error } = useSWR("/api/favorites");
  /* Search Bar states */
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    if (error) {
      console.error("Failed to load the favorite routes:", error);
    }
  }, [error]);

  function handleSearch(event) {
    const query = event.target.value;
    setSearchQuery(query);

    const results = favoriteRoutes.filter((favoriteRoute) => {
      favoriteRoute.name.toLowerCase().includes(query.toLowerCase());
    });
    setSearchResults(results);
  }
  async function toggleFavorite(id, isFavorite) {
    try {
      const response = await fetch(`/api/routes/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ isFavorite: !isFavorite }),
      });
      if (response.ok) {
        mutate("/api/favorites");
      } else {
        console.error("Failed to toggle favorite status.");
      }
    } catch (error) {
      console.error("Failed to toggle favorite status.");
    }
  }

  return (
    <>
      <SearchBar
        searchQuery={searchQuery}
        handleSearch={handleSearch}
        searchResults={searchResults}
      />
      <List role="list">
        {searchQuery === "" ? (
          favoriteRoutes && favoriteRoutes.length > 0 ? (
            favoriteRoutes.map((favoriteRoute) => {
              return (
                <ListItem key={favoriteRoute.id}>
                  <RouteCard
                    route={favoriteRoute}
                    id={favoriteRoute.id}
                    toggleFavorite={toggleFavorite}
                  />
                </ListItem>
              );
            })
          ) : (
            <ListItem>
              <p>No favorite routes found.</p>
            </ListItem>
          )
        ) : searchResults.length > 0 ? (
          searchResults.map((favoriteRoute) => {
            return (
              <ListItem key={favoriteRoute.id} id={favoriteRoute.id}>
                <RouteCard
                  route={favoriteRoute}
                  id={favoriteRoute.id}
                  toggleFavorite={() =>
                    toggleFavorite(favoriteRoute.id, favoriteRoute.isFavorite)
                  }
                />
              </ListItem>
            );
          })
        ) : (
          <ListItem>
            <p>No matching favorite routes found.</p>
          </ListItem>
        )}
      </List>
    </>
  );
}
