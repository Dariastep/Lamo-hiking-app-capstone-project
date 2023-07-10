import Image from "next/image";
import styled from "styled-components";
import avatarImage from "./avatar.jpg";
import { useState, useEffect } from "react";
import { mutate } from "swr";

export default function Profile({userProfile}) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    if (userProfile.name && userProfile.email) {
      setName(userProfile.name);
      setEmail(userProfile.email);
    } else {
      // Set default name and email if there is no data in the database
      setName("Default Name");
      setEmail("default@example.com");
    }
  }, [userProfile]);

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      const response = await fetch("/api/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email }),
      });

      if (response.ok) {
        userProfile.name = name; // Update the userProfile object with the new name and email
        userProfile.email = email;
        mutate("/api/profile");
        console.log("response is OK");
        setEditMode(false);
      } else {
        console.error("Failed to save the  information");
      }
    } catch (error) {
      console.error("Failed to save the personal information", error);
    }
  }

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
  function handleEditClick() {
    setEditMode(true); // Turn on editing mode when Edit button is clicked
  }
  return (
    <ProfileWrapper>
      <AvatarWrapper>
        <StyledImage src={avatarImage} alt="Avatar" width={200} height={200} />
      </AvatarWrapper>
      <PersonalInfoWrapper>
        {editMode ? (
          <form onSubmit={handleSubmit}>
            <InfoGrid>
              <label>Name:</label>
              <Input type="text" value={name} onChange={handleNameChange} />
              <label>E-mail:</label>
              <Input type="email" value={email} onChange={handleEmailChange} />
            </InfoGrid>
            <ButtonWrapper>
              <Button type="submit">Save</Button>
            </ButtonWrapper>
          </form>
        ) : (
          <InfoGrid>
            <label>Name:</label>
            <div>{name}</div>
            <label>E-mail:</label>
            <div>{email}</div>
            <ButtonWrapper>
              <Button onClick={handleEditClick}>Edit</Button>
            </ButtonWrapper>
          </InfoGrid>
        )}
      </PersonalInfoWrapper>
    </ProfileWrapper>
  );
}

const ProfileWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
  align-items: center;
  justify-items: center;
  margin-top: 2rem;
`;

const AvatarWrapper = styled.div`
  border-radius: 50%;
  overflow: hidden;
  height: 200px;
  width: 200px;
`;

const StyledImage = styled(Image)`
  display: block;
`;

const PersonalInfoWrapper = styled.div`
  display: grid;
  gap: 1rem;
  align-items: center;
`;

const InfoGrid = styled.div`
  display: grid;
  grid-template-columns: max-content 1fr;
  gap: 1rem;
  align-items: center;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const Button = styled.button`
  padding: 0.5rem 1rem;
  background-color: #ccc;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;
