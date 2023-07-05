import RouteCard from "../RouteCard";
import { ListItem, List } from "../RouteList/RouteList.styled.js";
import { routesData } from "@/routesData";
import { useState, useEffect } from "react";
import SearchBar from "../SearchBar";

export default function FavoritePage() {
  const [favoriteRoutes, setFavoriteRoutes] = useState([]);

  useEffect(() => {
    if (typeof localStorage !== "undefined") {
      const filteredRoutes = Object.keys(localStorage).filter(
        (key) =>
          key.startsWith("toggleFavoriteRoute-") &&
          localStorage.getItem(key) === "true"
      );
      setFavoriteRoutes(filteredRoutes);
    }
  }, []); /*  Only keys that satisfy both conditions will be included in the favoriteRoutes array. */

  /* Search Bar states */
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  function handleSearch(event) {
    const query = event.target.value;
    setSearchQuery(query);

    const results = favoriteRoutes.filter((route) => {
      const currentRoute = routesData.find(
        (routeData) => routeData.id === route
      );
      return (
        currentRoute &&
        currentRoute.name.toLowerCase().includes(query.toLowerCase())
      );
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
          favoriteRoutes.length > 0 ? (
            favoriteRoutes.map((key) => {
              const id = key.replace("toggleFavoriteRoute-", "");
              const currentRoute = routesData.find((route) => route.id === id);
              if (!currentRoute) return null;

              return (
                <ListItem key={id} {...currentRoute} id={id}>
                  <RouteCard route={currentRoute} id={id} />
                </ListItem>
              );
            })
          ) : (
            <ListItem>
              <p>No favorite routes found.</p>
            </ListItem>
          )
        ) : searchResults.length > 0 ? (
          searchResults.map((route) => {
            const currentRoute = routesData.find((routeData) => routeData.id === route);
            if (!currentRoute) return null;
            return (
              <ListItem key={id} {...currentRoute} id={id}>
                <RouteCard route={currentRoute} id={id} />
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
