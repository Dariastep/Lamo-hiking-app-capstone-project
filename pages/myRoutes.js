import Header from "../components/Header/index.js";
import BackButton from "../components/BackButton/index.js";
import styled from "styled-components";
import CommonButton from "../components/CommonButton/index.js";
import RoutesPage from "../components/RoutesPage/index.js";
import useSWR from "swr";
import { useRouter } from "next/router";
import RouteForm from "../components/RouteForm/index.js";
import Loader from "../components/Loader/index.js";

export default function MyRoutes() {
  const { data: myRoutes, error } = useSWR("/api/routes"); //replace the fetch on useSWR
  const router = useRouter();

  function handleRouteCreated(newRoute) {
    router.push("/");
  }

  function handleCreateRoute() {
    router.push("/createRoute"); // Navigate to the route creation page
  }
  if (error) {
    console.error("Failed to fetch my routes", error);
  }
  if (!myRoutes) {
    return <Loader />;
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
            {myRoutes ? (
              <RoutesPage routes={myRoutes} />
            ) : (
              <P>You have not created any routes yet.</P>
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
