import BackButton from "@/components/BackButton";
import Header from "@/components/Header";
import Profile from "@/components/Profile";
import styled from "styled-components";

export default function MyProfile() {
  return (
    <div>
      <Header title="My Profile" BackButton={BackButton} />
      <MainSection>
        <Profile />
      </MainSection>
    </div>
  );
}

const MainSection = styled.div`
  margin-top: 6rem;
  display: flex;
  flex-direction: column;
`;
