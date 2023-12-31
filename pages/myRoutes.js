import BackButton from "../components/BackButton/index.js";
import styled from "styled-components";
import Button from "../components/Button/index.js";
import useSWR from "swr";
import { useRouter } from "next/router";
import Loader from "../components/Loader/index.js";
import Login from "../components/Login/index.js";
import { useSession } from "next-auth/react";
import NonAuthorizedUser from "../components/NonAuthorizedUser/index.js";
import { List, ListItem } from "../components/RouteList/RouteList.styled.js";
import RouteCard from "../components/RouteCard/index.js";
import Layout from "../components/Layout/index.js";

export default function MyRoutes() {
  const { data: session } = useSession();
  const { data: routes, error } = useSWR("/api/routes"); //replace the fetch on useSWR
  const router = useRouter();

  function handleCreateRoute() {
    router.push("/createRoute"); // Navigate to the route creation page
  }
  if (error) {
    console.error("Failed to fetch my routes", error);
  }
  if (!routes) {
    return <Loader />;
  }

  const userRoutes = routes
    .filter((route) => route.createdBy === session?.user.email)
    .reverse();

  const headerProps = {
    title: "My Routes",
    BackButton: BackButton,
    Login: <Login session={session} />,
  };

  return (
    <Layout headerProps={headerProps}>
      <>
        {session ? (
          <>
            {userRoutes.length > 0 ? (
              <List role="list">
                {userRoutes.map((route) => (
                  <ListItem key={route._id}>
                    <RouteCard route={route} id={route._id} />
                  </ListItem>
                ))}
              </List>
            ) : (
              <P>You have not created any routes yet.</P>
            )}
          </>
        ) : (
          <NonAuthorizedUser />
        )}
      </>
      {session && (
        <FixedButtonContainer>
          <Button
            ButtonName="New route"
            onClick={handleCreateRoute}
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width={24}
                height={24}
              >
                <title>plus</title>
                <path
                  fill="white"
                  d="M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z"
                />
              </svg>
            }
          />
        </FixedButtonContainer>
      )}
    </Layout>
  );
}

const P = styled.p`
  text-align: center;
`;

const FixedButtonContainer = styled.div`
  position: fixed;
  bottom: 4.5rem;
  left: 0;
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 2rem;
  z-index: 5;
  background: linear-gradient(
    to bottom,
    rgba(252, 252, 252, 0) 0%,
    rgba(252, 252, 252, 1) 60%
  );
`;
