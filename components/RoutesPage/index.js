import { useState } from "react";
import RouteCard from "../RouteCard";
import RouteForm from "../RouteForm";

export default function RoutesPage() {
  const [myRoutes, setMyRoutes] = useState([]);

  function handleRouteCreated(newRoute) {
    setMyRoutes((prevRoute) => [...prevRoute, newRoute]);
  }

  return (
    <>
      <RouteForm onRouteCreated={handleRouteCreated} myRoutes={myRoutes} />
      {myRoutes.length > 0 && (
        <RouteCard
          route={myRoutes[myRoutes.length - 1]}
          id={myRoutes[myRoutes.length - 1]._id}
        />
      )}
    </>
  );
}
