import styled from "styled-components";
import { useState, useEffect } from "react";
import { mutate } from "swr";
import ImageUploadForm from "../ImageUploadForm";
import Avatar from "../Avatar/index.js";
import useSWR from "swr";
import Loader from "../Loader";
import Button from "../Button";
import { toast } from "react-toastify";

export default function Profile({ userProfile, session }) {
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [showNameInput, setShowNameInput] = useState(false);

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
        toast.success("Saved successfully!", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
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
        console.log("Unfortunately failed to update avatar in MongoDB");
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
        <GreetWrapper>
          <GreetText>{`Hello ${name}!`}</GreetText>
          <P>{`You are signed in as ${session.user.email}`}</P>
        </GreetWrapper>
        <AvatarWrapper>
          <Avatar data={data} error={error} avatar={avatar} />
        </AvatarWrapper>
        <Grid>
          {editMode ? (
            <>
              <form onSubmit={handleSubmit}>
                <Flex>
                  <Label htmlFor="name-change">Change name:</Label>
                  <Input
                    type="text"
                    name="name-change"
                    value={name}
                    onChange={handleNameChange}
                  />
                  <Label htmlFor="avatar-change">Change image:</Label>
                  <ImageUploadForm handleAvatarChange={handleAvatarChange} />
                  <ButtonWrapper>
                    <Button type="submit" ButtonName="Save" />
                  </ButtonWrapper>
                </Flex>
              </form>
            </>
          ) : (
            <Button onClick={handleEditClick} ButtonName="Edit" />
          )}
        </Grid>
      </ProfileWrapper>
    </>
  );
}
const ProfileWrapper = styled.div`
  display: grid;
  flex-direction: column;
  align-items: center;
  justify-items: center;
  gap: 1rem;
`;
const GreetText = styled.h1`
  text-align: left;
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--primary-color);
  margin-bottom: 1rem;
  margin-top: 4rem;
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

const Input = styled.input`
  padding: 0.5rem;
  border: 1px solid var(--primary-color);
  border-radius: 4px;
  font-size: 1rem;
  &:focus {
    border: 1px solid var(--action-color);
  }
`;

const GreetWrapper = styled.div`
  text-align: center;
  margin-bottom: 2rem;
`;
const Grid = styled.div``;

const Label = styled.label`
  margin-top: 1rem;
  margin-bottom: 0.5rem;
`;

const Flex = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: left;
  width: 80%;
  margin: 0 auto;
`;
const ButtonWrapper = styled.div`
  margin: 1rem auto;
`;
