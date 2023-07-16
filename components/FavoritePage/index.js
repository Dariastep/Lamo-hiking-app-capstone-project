import RouteCard from "../RouteCard";
import SearchBar from "../SearchBar";
import { ListItem, List } from "../RouteList/RouteList.styled.js";
import { useState, useEffect } from "react";

import { toggleFavorite } from "../../utils/toggleFavorite.js";

export default function FavoritePage({ favoriteRoutes }) {
  /* Search Bar states */
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  
 
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
                <ListItem key={favoriteRoute._id}>
                  <RouteCard
                    route={favoriteRoute}
                    id={favoriteRoute._id}
                    toggleFavorite={toggleFavorite( favoriteRoute._id,
                      favoriteRoute.isFavorite)}
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
              <ListItem key={favoriteRoute._id} id={favoriteRoute._id}>
                <RouteCard
                  route={favoriteRoute}
                  id={favoriteRoute._id}
                  toggleFavorite={() =>
                    toggleFavorite(favoriteRoute._id, favoriteRoute.isFavorite, setFavorites)
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
