import Image from "next/image";
import styled from "styled-components";
import { useState, useEffect } from "react";
import { mutate } from "swr";
import ImageUploadForm from "../ImageUploadForm";
import Avatar from "../Avatar";
import AvatarImage from "../../public/avatar.jpg";
import useSWR from "swr";
import Loader from "../Loader";

export default function Profile({ userProfile }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [avatar, setAvatar] = useState(null);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    if (userProfile[0].name && userProfile[0].email) {
      setName(userProfile[0].name);
      setEmail(userProfile[0].email);
      setAvatar(userProfile[0].avatar);
    } else {
      // Set default name and email if there is no data in the database
      setName("ChangeTheName");
      setEmail("name@example.com");
      setAvatar(AvatarImage);
    }
  }, [userProfile[0]]);

  // get image data (and error for error handling) via useSWR hook from the next api route
  const { data, error } = useSWR("/api/images/");
  if (error) return <div>failed to load</div>;
  if (!data) return <Loader />>;

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      const requestBody = { name, email };
      const formData = new FormData();
      formData.append("name", name);
      formData.append("email", email);

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

        mutate("/api/profile");
        
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
  async function handleAvatarChange(imageURL) {
    try {
      const requestBody = { imageURL: imageURL };
      const response = await fetch("/api/images/imagesChange", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      if (response.ok) {
        setAvatar(imageURL);
        mutate();
      } else {
        console.error(
          "Unfortunately failed to update avatar in MongoDB",
          error
        );
      }
    } catch (error) {
      console.error("Failed to update avatar in MongoDB", error);
    }
  }

  function handleEditClick() {
    setEditMode(true); // Turn on editing mode when Edit button is clicked
  }
  return (
    <>
      <ProfileWrapper>
        <AvatarWrapper>
          {/*   {editMode ? (
          <input type="file" accept="image/*" onChange={handleAvatarChange} />
        ) : ( */}
          <Avatar data={data} error={error} avatar={avatar} />
        </AvatarWrapper>
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
      <StyledUpload>
        <ImageUploadForm handleAvatarChange={handleAvatarChange} />
      </StyledUpload>
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
