import RouteList from "../components/RouteList/index.js";
import styled from "styled-components";
import Header from "@/components/Header/index.js";
import Logo from "@/components/Logo/Logo.js";
import useSWR from "swr";

export default function HomePage() {
  const { data: routesData } = useSWR("/api/routes", { fallbackData: [] });
  console.log(routesData);
  if (!routesData) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Header title={<Logo />} />
      <MainSection>
        <RouteList routesData={routesData} />
      </MainSection>
    </>
  );
}

const MainSection = styled.div`
  margin-top: 6rem;
  display: flex;
  flex-direction: column;
`;
