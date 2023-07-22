import { useState, useRef } from "react";
import styled from "styled-components";
// we are using useSWR to mutate the data once a file has been uploaded
import useSWR from "swr";
import Button from "../Button";
import Banner from "../Snackbar";

function ImageUploadForm({ handleAvatarChange }) {
  const { mutate } = useSWR("/api/images/");
  // We define some states to give some feedback to the user what happened to our upload
  const [bannerStatus, setBannerStatus] = useState("");
  const [error, setError] = useState(undefined);
  const fileInputRef = useRef(null);
  const [showBanner, setShowBanner] = useState(false); // New state for controlling the banner visibility
  // a kind of 'standard' form handler
  async function submitImage(formData) {
    setBannerStatus("Uploading...");
    try {
      const response = await fetch("/api/images/upload", {
        method: "post",
        body: formData,
      });
      if (response.status === 201) {
        const result = await response.json();
        const imageURL = result.url;
        setBannerStatus("New avatar changed!");
        handleAvatarChange(imageURL);
        setShowBanner(true); // Show the banner
      }
    } catch (error) {
      setError(error);
    }
  }

  function handleUploadClick() {
    fileInputRef.current.click();
  }
  function handleFileChange(event) {
    const file = event.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append("file", file);
      submitImage(formData);
    }
  }

  return (
    <>
      {showBanner && (
        <Banner bannerStatus={bannerStatus} setShowBanner={setShowBanner} />
      )}
      {error && <p>{error.message}</p>}
      <FileInput
        type="file"
        name="file"
        ref={fileInputRef}
        onChange={handleFileChange}
      />
      <Button
        type="button"
        onClick={handleUploadClick}
        ButtonName="Change image"
        secondaryButton
      />
      <Form onSubmit={submitImage}></Form>
    </>
  );
}

const Form = styled.form`
  margin: 2rem auto;
  border: none;
`;
const FileInput = styled.input`
  display: none;
`;
export default ImageUploadForm;
