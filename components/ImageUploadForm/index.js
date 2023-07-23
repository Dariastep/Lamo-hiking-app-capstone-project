import { useState, useRef } from "react";
import styled from "styled-components";

export default function ImageUploadForm({ handleAvatarChange }) {
  const [error, setError] = useState(undefined);
  const fileInputRef = useRef(null);

  async function submitImage(formData) {
    try {
      const response = await fetch("/api/images/upload", {
        method: "post",
        body: formData,
      });
      if (response.status === 201) {
        const result = await response.json();
        const imageURL = result.url;
        handleAvatarChange(imageURL);
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
      handleUploadClick();
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
    </>
  );
}

const FileInput = styled.input``;
