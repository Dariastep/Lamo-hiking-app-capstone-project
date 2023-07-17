import Header from "../components/Header/index.js";
import FavoritePage from "../components/FavoritePage/index.js";
import BackButton from "../components/BackButton/index.js";
import Login from "../components/Login/index.js";
import Loader from "../components/Loader/index.js";
import useSWR from "swr";
import styled from "styled-components";
import { useSession } from "next-auth/react";

export default function Favorites() {
  const { data: session, status } = useSession();
  const { data: favoriteRoutes, error } = useSWR("/api/favorites");

  if (!favoriteRoutes || !status) {
    return <Loader />;
  } else if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <>
      <Header
        title="Favorites"
        BackButton={BackButton}
        Login={<Login session={session} />}
      />
      <MainSection>
        {session ? (
          <FavoritePage favoriteRoutes={favoriteRoutes} />
        ) : (
          <>
            <p>You are not authorized, please log in.</p>
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
