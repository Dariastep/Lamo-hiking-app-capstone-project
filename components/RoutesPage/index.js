import { useState, useEffect } from "react";
import RouteCard from "../RouteCard";
import RouteForm from "../RouteForm";
import { List, ListItem } from "../RouteList/RouteList.styled";

export default function RoutesPage() {
  const [myRoutes, setMyRoutes] = useState([]);

  useEffect(() => {
    fetchRoutes(); // Daten beim Initialisieren der Komponente abrufen
  }, []);

  async function fetchRoutes() {
    try {
      const response = await fetch("/api/routes");
      const data = await response.json();
      setMyRoutes(data.reverse()); // Umkehren der Route List
    } catch (error) {
      console.error("Failed to fetch routes:", error);
    }
  }

  function handleRouteCreated(newRoute) {
    setMyRoutes((prevRoutes) => [...prevRoutes, newRoute]);
  }

  return (
    <>
      {myRoutes.length > 0 && (
        <List role="list">
          {myRoutes.map((route) => (
            <ListItem key={route._id}>
              <RouteCard route={route} id={route._id} />
            </ListItem>
          ))}
        </List>
      )}
    </>
  );
}
