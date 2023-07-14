import { useState, useEffect } from "react";
import RouteCard from "../RouteCard";
import RouteForm from "../RouteForm";
import { List, ListItem } from "../RouteList/RouteList.styled";

export default function RoutesPage() {
  const [myRoutes, setMyRoutes] = useState([]);
  useEffect(() => {
    console.log("myRoutes updated:", myRoutes); //console log will show the correct value of myRoutes after the state has been updated.
  }, [myRoutes]);

  useEffect(() => {
    fetchRoutes(); // Daten beim Initialisieren der Komponente abrufen
  }, []);

  async function fetchRoutes() {
    try {
      const response = await fetch("/api/routes");
      const data = await response.json();
      setMyRoutes(data);
    } catch (error) {
      console.error("Failed to fetch routes:", error);
    }
  }

  function handleRouteCreated(newRoute) {
    setMyRoutes((prevRoutes) => [...prevRoutes, newRoute]);
    console.log("New route:", newRoute);
  }

  return (
    <>
      <RouteForm onRouteCreated={handleRouteCreated} myRoutes={myRoutes} />
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
