import styled from "styled-components";
import Header from "../components/Header";
import BackButton from "../components/BackButton/index.js";
import RouteForm from "../components/RouteForm";
import { useRouter } from "next/router";
import { useState } from "react";
import Login from "../components/Login";
import { useSession } from "next-auth/react";

export default function CreateRoutePage() {
  const [myRoutes, setMyRoutes] = useState([]);
  const { data: session } = useSession();
  const router = useRouter();

  function handleRouteCreated(newRoute) {
    setMyRoutes((prevRoutes) => [...prevRoutes, newRoute]);
    router.push("/myRoutes");
  }
  return (
    <>
      <Header
        title="New Route"
        BackButton={BackButton}
        Login={<Login session={session} />}
      />
      <MainSection>
        {session ? (
          <RouteForm onRouteCreated={handleRouteCreated} session={session} />
        ) : (
          <>
            <p>
              You are not logged in. Please log in to view your favorite routes.
            </p>
            <Login />
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
