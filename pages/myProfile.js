import BackButton from "../components/BackButton/index.js";
import Header from "../components/Header/index.js";
import styled from "styled-components";
import Profile from "../components/Profile";
import useSWR from "swr";
import Loader from "../components/Loader/index.js";

export default function MyProfile() {
  const { data: userProfile, error } = useSWR("api/profile");

  if (error) {
    return <div>Error: Failed to load user profile data</div>;
  }
  if (!userProfile) {
    return <Loader />;
  }

  return (
    <div>
      <Header title="My Profile" BackButton={BackButton} />
      <MainSection>
        <Profile userProfile={userProfile} />
      </MainSection>
    </div>
  );
}

const MainSection = styled.div`
  margin-top: 6rem;
  display: flex;
  flex-direction: column;
`;
