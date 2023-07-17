import BackButton from "../components/BackButton/index.js";
import Header from "../components/Header/index.js";
import styled from "styled-components";
import Profile from "../components/Profile/index.js";
import useSWR from "swr";
import Loader from "../components/Loader/index.js";
import { useSession } from "next-auth/react";
import Login from "../components/Login/index.js";
import NonAuthorizedUser from "../components/NonAuthorizedUser/index.js";

export default function MyProfile() {
  const { data: session } = useSession();
  const { data: userProfile, error } = useSWR("api/profile");

  if (error) {
    return <div>Error: Failed to load user profile data</div>;
  }
  if (!userProfile) {
    return <Loader />;
  }

  return (
    <>
      <Header
        title="My Profile"
        BackButton={BackButton}
        Login={<Login session={session} />}
      />

      <MainSection>
        {session ? (
          <>
            <p>You are signed in as {session.user.email}</p>
            <Profile userProfile={userProfile} />{" "}
          </>
        ) : (
          <NonAuthorizedUser />
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
