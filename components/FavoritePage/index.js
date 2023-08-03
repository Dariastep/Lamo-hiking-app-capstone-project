import RouteCard from "../RouteCard";
import SearchBar from "../SearchBar";
import { ListItem, List, P } from "../RouteList/RouteList.styled.js";
import { useState } from "react";

import { toggleFavorite } from "../../utils/toggleFavorite.js";

export default function FavoritePage({ favoriteRoutes, session }) {
  /* Search Bar states */
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  function handleSearch(event) {
    const query = event.target.value;
    setSearchQuery(query);

    const results = favoriteRoutes.filter((favoriteRoute) =>
      favoriteRoute.name.toLowerCase().includes(query.toLowerCase())
    );
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
          favoriteRoutes.length > 0 ? (
            favoriteRoutes.map((favoriteRoute) => (
              <ListItem key={favoriteRoute._id}>
                <RouteCard
                  route={favoriteRoute}
                  id={favoriteRoute._id}
                  toggleFavorite={() =>
                    toggleFavorite({
                      id: favoriteRoute._id,
                      isFavorite: favoriteRoute.isFavorite,
                      session: session,
                    })
                  }
                />
              </ListItem>
            ))
          ) : (
            <P>No favorite routes found.</P>
          )
        ) : searchResults.length > 0 ? (
          searchResults.map((favoriteRoute) => (
            <ListItem key={favoriteRoute._id} id={favoriteRoute._id}>
              <RouteCard route={favoriteRoute} id={favoriteRoute._id} />
            </ListItem>
          ))
        ) : (
          <P>No matching favorite routes found.</P>
        )}
      </List>
    </>
  );
}
