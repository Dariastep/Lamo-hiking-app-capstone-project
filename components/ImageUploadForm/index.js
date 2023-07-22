import { useState, useRef } from "react";
import styled from "styled-components";
import Button from "../Button";

function ImageUploadForm({ handleAvatarChange }) {
  const [bannerStatus, setBannerStatus] = useState("");
  const [error, setError] = useState(undefined);
  const fileInputRef = useRef(null);

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
      }
    } catch (error) {
      setError(error);
    }
  }

  function handleUploadClick() {
    fileInputRef.current.click();
    console.log("we are in handle upload click");
  }

  function handleFileChange(event) {
    const file = event.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append("file", file);
      submitImage(formData);
      console.log("we are in handleFileChange");
    }
  }

  return (
    <>
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
        isSecondaryButton
      />
    </>
  );
}

const FileInput = styled.input`
  display: none;
`;

export default ImageUploadForm;
