import RouteList from "../components/RouteList/index.js";
import styled from "styled-components";
import Header from "../components/Header/index.js";
import Logo from "../components/Logo/Logo.js";
import useSWR from "swr";
import { toggleFavorite } from "../utils/toggleFavorite.js";
import Loader from "../components/Loader/";
import Login from "../components/Login/index.js";
import { useSession } from "next-auth/react";

export default function HomePage() {
  const { data: routesData, error } = useSWR("/api/routes", {
    fallbackData: [],
  });
  const { data: session } = useSession();

  if (!routesData) {
    return <Loader />; // Render the loader component while data is being fetched
  } else if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <>
      <Header title={<Logo />} Login={<Login session={session} />} />
      <MainSection>
        
          <RouteList routesData={routesData} toggleFavorite={toggleFavorite} />
        
    
      </MainSection>
    </>
  );
}

const MainSection = styled.div`
  margin-top: 6rem;
  display: flex;
  flex-direction: column;
`;
