import { useState } from "react";
import RouteCard from "../RouteCard";
import RouteForm from "../RouteForm";
import { List, ListItem } from "../RouteList/RouteList.styled";

export default function RoutesPage() {
  const [myRoutes, setMyRoutes] = useState([]);

  function handleRouteCreated(newRoute) {
    setMyRoutes((prevRoute) => [...prevRoute, newRoute]);
    console.log(newRoute);
  }

  return (
    <>
      <RouteForm onRouteCreated={handleRouteCreated} myRoutes={myRoutes} />
      {myRoutes.length > 0 && (
        <List role="list">
          {myRoutes.map((route) => (
            <ListItem key={route.id}>
              <RouteCard route={route} id={route.id} />
            </ListItem>
          ))}
        </List>
      )}
    </>
  );
}
