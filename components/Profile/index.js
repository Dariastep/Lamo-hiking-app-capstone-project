import Image from "next/image";
import styled from "styled-components";
import avatarImage from "./avatar.jpg";


export default function Profile() {
  return (
    <ProfileWrapper>
      <AvatarWrapper>
        <StyledImage
          src={avatarImage}
          alt="Avatar"
          width={200}
          height={200}
        />
      </AvatarWrapper>
      <PersonalInfoWrapper>
        <label>Name</label>
        <Input type="text" />
        <label>E-mail</label>
        <Input type="email" />
      </PersonalInfoWrapper>{" "}
    </ProfileWrapper>
  );
}
const ProfileWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 2rem;
`;

const AvatarWrapper = styled.div`
  border-radius: 50%;
  overflow: hidden;
  margin-bottom: 1rem;
  height: 200px;
  width: 200px;
  display: flex;
  align-content: center;
  justify-content: center;
`;
const StyledImage = styled(Image)`

`;

const PersonalInfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-bottom: 1rem;
`;