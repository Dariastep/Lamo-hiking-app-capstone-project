import SearchBar from "@/components/SearchBar/index.js";
import RouteList from "../components/RouteList/index.js";
import { routesData } from "@/routesData";
import styled from "styled-components";
import Header from "@/components/Header/index.js";
import Logo from "@/components/Logo/Logo.js";

export default function HomePage() {
  return (
    <Container>
      <Header title={<Logo />} />
      <RouteList routesData={routesData} />
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;
