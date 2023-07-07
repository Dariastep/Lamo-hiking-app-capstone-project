import RouteCard from "../RouteCard";
import SearchBar from "../SearchBar";
import { ListItem, List } from "../RouteList/RouteList.styled.js";
import { useState, useEffect } from "react";
import useSWR from "swr";

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
                    favoriteRoute={favoriteRoute}
                    id={favoriteRoute.id}
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
                  favoriteRoute={favoriteRoute}
                  id={favoriteRoute.id}
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
