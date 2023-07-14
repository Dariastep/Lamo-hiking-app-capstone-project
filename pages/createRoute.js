import styled from "styled-components";
import Header from "../components/Header";
import BackButton from "../components/BackButton/index.js";
import RouteForm from "../components/RouteForm";
import { useRouter } from "next/router";
import { useState } from "react";

export default function CreateRoutePage() {
  const [myRoutes, setMyRoutes] = useState([]);
  const router = useRouter();

  function handleRouteCreated(newRoute) {
    setMyRoutes((prevRoutes) => [...prevRoutes, newRoute]);
    router.push("/myRoutes");
  }
  return (
    <>
      <Header title="New Route" BackButton={BackButton} />
      <MainSection>
        <RouteForm onRouteCreated={handleRouteCreated} />
      </MainSection>
    </>
  );
}

const MainSection = styled.div`
  margin-top: 6rem;
  display: flex;
  flex-direction: column;
`;
