import styled from "styled-components";
import { useState, useEffect } from "react";
import { mutate } from "swr";
import ImageUploadForm from "../ImageUploadForm";
import Avatar from "../Avatar/index.js";
import useSWR from "swr";
import Loader from "../Loader";
import CommonButton from "../CommonButton";
import Banner from "../Banner";

export default function Profile({ userProfile, session }) {
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [showNameInput, setShowNameInput] = useState(false);
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    if (userProfile[0].name) {
      setName(userProfile[0].name);
      setAvatar(userProfile[0].avatar);
    } else {
      // Set default name and email if there is no data in the database
      setName("Stranger");
      setAvatar(null);
    }
  }, [userProfile[0]]);

  // get image data (and error for error handling) via useSWR hook from the next api route
  const { data, error } = useSWR("/api/images/");
  if (error) return <div>failed to load</div>;
  if (!data) return <Loader />;

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      const requestBody = { name };
      const formData = new FormData();
      formData.append("name", name);

      const response = await fetch("/api/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      if (response.ok) {
        userProfile.name = name; // Update the userProfile object with the new name

        mutate("/api/profile");

        setEditMode(false);
        setShowNameInput(false);
        setShowBanner(true);
      } else {
        console.error("Failed to save the information");
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
    setShowNameInput(true); // Show the name input field
  }
  return (
    <>
      <ProfileWrapper>
      {showBanner && <Banner bannerStatus="Name changed!" setShowBanner={setShowBanner} />}
        <GreetWrapper>
          <GreetText>{`Hello ${name}!`}</GreetText>
          <P>{`You are signed in as ${session.user.email}`}</P>
        </GreetWrapper>
        <AvatarWrapper>
          <Avatar data={data} error={error} avatar={avatar} />
        </AvatarWrapper>
        <ButtonWrapper>
          <CommonButton onClick={handleEditClick} ButtonName="Change name" />
        </ButtonWrapper>
        <ImageUploadForm handleAvatarChange={handleAvatarChange} />
        <PersonalInfoWrapper>
          {editMode && (
            <form onSubmit={handleSubmit}>
              <InfoGrid>
                {showNameInput && (
                  <Input type="text" value={name} onChange={handleNameChange} />
                )}
              </InfoGrid>
              <ButtonWrapper>
                <CommonButton type="submit" ButtonName="Save" />
              </ButtonWrapper>
            </form>
          )}
        </PersonalInfoWrapper>
      </ProfileWrapper>
    </>
  );
}

const ProfileWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-items: center;
`;
const GreetText = styled.h1`
  text-align: left;
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--secondary-color);
`;

const P = styled.p`
  text-align: left;
  font-size: 1rem;
`;

const AvatarWrapper = styled.div`
  border-radius: 50%;
  overflow: hidden;
  height: 200px;
  width: 200px;
`;

const PersonalInfoWrapper = styled.div`
  display: grid;
  gap: 0.5rem;
  align-items: center;
`;

const InfoGrid = styled.div`
  display: grid;
  grid-template-columns: max-content 1fr;
  gap: 0.5rem;
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
const GreetWrapper = styled.div`
  text-align: center;
  margin-bottom: 2rem;
`;
