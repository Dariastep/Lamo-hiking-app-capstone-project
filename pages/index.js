import RouteList from "../components/RouteList/index.js";
import { routesData } from "@/routesData";
import styled from "styled-components";
import Header from "@/components/Header/index.js";
import Logo from "@/components/Logo/Logo.js";

export default function HomePage() {
  return (
    <>
      <Header title={<Logo />} />
      <Container>
        <RouteList routesData={routesData} />
      </Container>
    </>
  );
}

const Container = styled.div`
  margin-top: 6rem;
  display: flex;
  flex-direction: column;
`;
