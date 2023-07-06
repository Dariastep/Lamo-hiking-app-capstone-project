import Image from "next/image";
import styled from "styled-components";
import avatarImage from "./avatar.jpg";
import { useState, useEffect } from "react";

export default function Profile() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [editMode, setEditMode] = useState(false);
  
  function handleNameChange(event) {
    event.preventDefault();
    const newName = event.target.value;
    setName(newName);
  }
  function handleEmailChange(event) {
    event.preventDefault();
    const newEmail = event.target.value;
    setEmail(newEmail);
  }

  useEffect(() => {
    //update the info every time when name and email changes.
    localStorage.setItem("name", name);
    localStorage.setItem("email", email);
  }, [name, email]);

  useEffect(() => {
    //initial mount -> take the name and the email, if the are stored in the local storage or leave it empty.
    const storedName = localStorage.getItem("name", name);
    const storedEmail = localStorage.getItem("email", email);
    setName(storedName || "");
    setEmail(storedEmail || "");
  }, []);

  return (
    <ProfileWrapper>
      <AvatarWrapper>
        <StyledImage src={avatarImage} alt="Avatar" width={200} height={200} />
      </AvatarWrapper>
      <PersonalInfoWrapper>
        <label>Name</label>
        <Input type="text" value={name} onChange={handleNameChange} />
        <label>E-mail</label>
        <Input type="email" value={email} onChange={handleEmailChange} />
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
const StyledImage = styled(Image)``;

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
