import BackButton from "../components/BackButton/index.js";
import Profile from "../components/Profile/index.js";
import useSWR from "swr";
import Loader from "../components/Loader/index.js";
import { useSession } from "next-auth/react";
import Login from "../components/Login/index.js";
import NonAuthorizedUser from "../components/NonAuthorizedUser/index.js";
import Layout from "../components/Layout/index.js";

export default function MyProfile() {
  const { data: session } = useSession();
  const { data: userProfile, error } = useSWR("api/profile");

  if (error) {
    return <div>Error: Failed to load user profile data</div>;
  }
  if (!userProfile) {
    return <Loader />;
  }
  const headerProps = {
    title: "My Profile",
    BackButton: BackButton,
    Login: <Login session={session} />,
  };
  return (
    <Layout headerProps={headerProps}>
      {session ? (
          <Profile userProfile={userProfile} session={session}/>
      ) : (
        <NonAuthorizedUser />
      )}
    </Layout>
  );
}
