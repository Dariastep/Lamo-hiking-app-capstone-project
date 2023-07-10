import BackButton from "@/components/BackButton";
import Header from "@/components/Header";
import styled from "styled-components";
import Profile from "../components/Profile";
import useSWR from "swr";

export default function MyProfile() {
  const {data: userProfile, error} = useSWR("api/profile");
  if (error) {
    return <div>Error: Failed to load user profile data</div>
  }
  if (!userProfile) {
    return <div>Loading...</div>;
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
