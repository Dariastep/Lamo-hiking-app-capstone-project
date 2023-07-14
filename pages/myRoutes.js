import Header from "../components/Header/index.js";
import BackButton from "../components/BackButton/index.js";
import styled from "styled-components";
import CommonButton from "../components/CommonButton/index.js";
import RoutesPage from "../components/RoutesPage/index.js";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import RouteForm from "../components/RouteForm/index.js";

export default function MyRoutes() {
  const [myRoutes, setMyRoutes] = useState([]);
  const router = useRouter();

  async function fetchRoutes() {
    try {
      const response = await fetch("/api/routes");
      const data = await response.json();
      setMyRoutes(data);
    } catch (error) {
      console.error("Failed to fetch my routes", error);
    }
  }

  useEffect(() => {
    fetchRoutes();
  }, []);

  function handleRouteCreated(newRoute) {
    setMyRoutes((prevRoutes) => [...prevRoutes, newRoute]);
    console.log("New route:", newRoute);
    router.push("/");
  }

  function handleCreateRoute() {
    router.push("/createRoute"); // Navigate to the route creation page
  }

  return (
    <>
      <Header title="My Routes" BackButton={BackButton} />
      <MainSection>
        {router.pathname === "/createRoute" ? (
          <RouteForm onRouteCreated={handleRouteCreated} />
        ) : (
          <>
            <CommonButton
              ButtonName="Create a new route"
              onClick={handleCreateRoute}
            />
            {myRoutes.length > 0 ? (
              <RoutesPage routes={myRoutes} />
            ) : (
              <P>You haven&apos;t created any routes yet.</P>
            )}
          </>
        )}
      </MainSection>
    </>
  );
}

const MainSection = styled.div`
  margin-top: 6rem;
  display: flex;
  flex-direction: column;
`;

const P = styled.p`
  text-align: center;
`;
