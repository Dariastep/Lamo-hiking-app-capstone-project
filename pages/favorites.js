import Header from "../components/Header/index.js";
import FavoritePage from "../components/FavoritePage/index.js";
import BackButton from "../components/BackButton/index.js";
import styled from "styled-components";
import { useState } from "react";
import Login from "../components/Login/index.js";
import Loader from "../components/Loader/index.js";
import useSWR from "swr";

export default function Favorites() {
  const { data: favoriteRoutes, error } = useSWR("/api/favorites");
  const [locked, setIsLocked] = useState(false);
  console.log(favoriteRoutes);
  if (!favoriteRoutes) {
    return <Loader />;
  } else if (error) {
    setIsLocked(true);
    <div>Error: {error.message}</div>;
  }

  return (
    <>
      <Header title="Favorites" BackButton={BackButton} Login={<Login />} />
      <MainSection>
        {locked ? (
          <>
            <p>You are not authorized, please log in.</p>
            <Login />
          </>
        ) : (
          <FavoritePage favoriteRoutes={favoriteRoutes} />
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
