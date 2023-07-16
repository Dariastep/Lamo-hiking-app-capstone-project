import Header from "../components/Header/index.js";
import FavoritePage from "../components/FavoritePage/index.js";
import BackButton from "../components/BackButton/index.js";
import styled from "styled-components";
import { useState } from "react";
import Login from "../components/Login/index.js";
import Loader from "../components/Loader/index.js";
import useSWR from "swr";
import { useSession } from "next-auth/react";

export default function Favorites() {
  const { data: session, status } = useSession();

  const { data: favoriteRoutes, error } = useSWR("/api/favorites");
  const [locked, setIsLocked] = useState(false);
  if (!favoriteRoutes || !status) {
    return <Loader />;
  } else if (error) {
    setIsLocked(true);
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
          <>
            {locked ? (
              <>
                <p>You are not authorized, please log in.</p>
                <Login />
              </>
            ) : (
              <FavoritePage favoriteRoutes={favoriteRoutes} />
            )}
          </>
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
