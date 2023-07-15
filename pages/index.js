import RouteList from "../components/RouteList/index.js";
import styled from "styled-components";
import Header from "../components/Header/index.js";
import Logo from "../components/Logo/Logo.js";
import useSWR from "swr";
import { toggleFavorite } from "../utils/toggleFavorite.js";
import Loader from "../components/Loader/";
import { useSession, signIn, signOut } from "next-auth/react";
import CommonButton from "../components/CommonButton/index.js";

export default function HomePage() {
  const { data: session } = useSession();
  const { data: routesData, error } = useSWR("/api/routes", {
    fallbackData: [],
  });
  if (!routesData) {
    return <Loader />; // Render the loader component while data is being fetched
  } else if (error) {
    return <div>Error: {error.message}</div>;
  }
  return (
    <>
      <Header title={<Logo />} />
      <MainSection>
        <StyledSection>
          {session ? ( // check if we have session data (= user is already signed in => display a logout button)
            <>
              <CommonButton onClick={signOut}>Logout</CommonButton>
              <p>Signed in as {session.user.email}</p>
            </>
          ) : (
            // no session data available yet, display a login button
            <CommonButton onClick={() => signIn("github")}>Login</CommonButton>
          )}
        </StyledSection>
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
const StyledSection = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
`;
