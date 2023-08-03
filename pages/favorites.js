import FavoritePage from "../components/FavoritePage/index.js";
import BackButton from "../components/BackButton/index.js";
import Login from "../components/Login/index.js";
import Loader from "../components/Loader/index.js";
import useSWR from "swr";

import { useSession } from "next-auth/react";
import NonAuthorizedUser from "../components/NonAuthorizedUser/index.js";
import Layout from "../components/Layout/index.js";

export default function Favorites() {
  const { data: session, status } = useSession();
  const { data: favoriteRoutes, error } = useSWR("/api/favorites");

  if (!favoriteRoutes || !status) {
    return <Loader />;
  } else if (error) {
    return <div>Error: {error.message}</div>;
  }
  const headerProps = {
    title: "Favorites",
    BackButton: BackButton,
    Login: <Login session={session} />,
  };
  return (
    <Layout headerProps={headerProps}>
      {session ? (
        <FavoritePage favoriteRoutes={favoriteRoutes} session={session} />
      ) : (
        <NonAuthorizedUser />
      )}
    </Layout>
  );
}
