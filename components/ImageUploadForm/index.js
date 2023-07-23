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


const FileInputWrapper = styled.label`
  border: 1px solid var(--primary-color);
  border-radius: 4px;

  display: inline-block;
  padding: 0.5rem 1rem;
  cursor: pointer;`


const FileInput = styled.input`
 padding: 0.5rem;
  border: 1px solid var(--primary-color);
  border-radius: 4px;
  font-size: 1rem;
  &:focus {
    border: 1px solid var(--action-color);
  }
`;