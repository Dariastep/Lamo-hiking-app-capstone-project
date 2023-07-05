
import RouteCard from "../RouteCard";
import { ListItem, List } from "../RouteList/RouteList.styled.js";
import { routesData } from "@/routesData";
import { useState, useEffect } from "react";

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

  return (
    <List role="list">
      {favoriteRoutes.length > 0 ? (
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
      )}
    </List>
  );
}
