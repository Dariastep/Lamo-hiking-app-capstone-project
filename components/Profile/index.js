import Image from "next/image";
import styled from "styled-components";
import avatarImage from "./avatar.jpg";
import { useState, useEffect } from "react";
import { mutate } from "swr";
import ImageUploadForm from "../ImageUploadForm";
import Avatar from "../Avatar";

export default function Profile({ userProfile }) {
  const [name, setName] = useState("ChangeTheName");
  const [email, setEmail] = useState("name@example.com");
  const [editMode, setEditMode] = useState(false);
  const [avatar, setAvatar] = useState(null);

  useEffect(() => {
    if (userProfile[0].name && userProfile[0].email) {
      setName(userProfile[0].name);
      setEmail(userProfile[0].email);
      setAvatar(userProfile[0].avatar);
    } else {
      // Set default values if there is no data in the database
      setName("ChangeTheName");
      setEmail("name@example.com");
      setAvatar("./avatar.jpg");
    }
  }, [userProfile[0]]);

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      const requestBody = { name, email, avatar };
      const formData = new FormData();
      formData.append("name", name);
      formData.append("email", email);
      formData.append("avatar", avatar);

      const response = await fetch("/api/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      if (response.ok) {
        userProfile.name = name; // Update the userProfile object with the new name and email
        userProfile.email = email;
        userProfile.avatar = data.avatar;
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
  function handleAvatarChange(event) {
    event.preventDefault();
    const newAvatar = event.target.files[0];
    console.log(newAvatar);
    setAvatar(newAvatar);
  }
  function handleEditClick() {
    setEditMode(true); // Turn on editing mode when Edit button is clicked
  }
  return (
    <>
      <ProfileWrapper>
        <Avatar userProfile={userProfile} />
        <PersonalInfoWrapper>
          {editMode ? (
            <form onSubmit={handleSubmit}>
              <InfoGrid>
                <label>Name:</label>
                <Input type="text" value={name} onChange={handleNameChange} />
                <label>E-mail:</label>
                <Input
                  type="email"
                  value={email}
                  onChange={handleEmailChange}
                />
              </InfoGrid>
              <ButtonWrapper>
                <Button type="submit">Save</Button>
              </ButtonWrapper>
              <StyledUpload>
                <ImageUploadForm handleAvatarChange={handleAvatarChange} />
              </StyledUpload>
            </form>
          ) : (
            <>
              <InfoGrid>
                <label>Name:</label>
                <div>{name}</div>
                <label>E-mail:</label>
                <div>{email}</div>
              </InfoGrid>
              <ButtonWrapper>
                <Button onClick={handleEditClick}>Edit</Button>
              </ButtonWrapper>
            </>
          )}
        </PersonalInfoWrapper>
      </ProfileWrapper>
    </>
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
  margin-top: 1rem;
`;

const Button = styled.button`
  padding: 0.5rem 1rem;
  background-color: #ccc;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;
const StyledUpload = styled.div`
  width: 100%;
  border: 1px solid #ccc;
  border-radius: 0.5rem;
  padding: 4rem;
`;
