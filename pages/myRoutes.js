import BackButton from "../components/BackButton/index.js";
import styled from "styled-components";
import CommonButton from "../components/CommonButton/index.js";
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

  const userRoutes = routes.filter(
    (route) => route.createdBy === session?.user.email
  );

  const headerProps = {
    title: "My Routes",
    BackButton: BackButton,
    Login: <Login session={session} />,
  };

  return (
    <Layout headerProps={headerProps}>
       <ContentWrapper>
      {" "}
      {session ? (
        <>
          <CommonButton
            ButtonName="Create new route"
            onClick={handleCreateRoute}
          />
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
      )}{" "}
   </ContentWrapper> </Layout>
  );
}

const P = styled.p`
  text-align: center;
`;
const ContentWrapper = styled.div`
  margin-top: 2rem; /* Adjust the margin as needed */
`;