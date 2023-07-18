import  { useState, useRef } from "react";
import styled from "styled-components";
// we are using useSWR to mutate the data once a file has been uploaded
import useSWR from "swr";
import CommonButton from "../CommonButton";

function ImageUploadForm({ handleAvatarChange }) {
  const { mutate } = useSWR("/api/images/");
  // We define some states to give some feedback to the user what happened to our upload
  const [uploadStatus, setUploadStatus] = useState("");
  const [error, setError] = useState(undefined);
  const fileInputRef = useRef(null);
  const [showBanner, setShowBanner] = useState(false); // New state for controlling the banner visibility
  // a kind of 'standard' form handler
  async function submitImage(formData) {
    setUploadStatus("Uploading...");
    try {
      const response = await fetch("/api/images/upload", {
        method: "post",
        body: formData,
      });
      if (response.status === 201) {
        const result = await response.json();
        const imageURL = result.url;
        setUploadStatus("Upload complete!");
        handleAvatarChange(imageURL);
        setShowBanner(true); // Show the banner
        setTimeout(() => {
          setShowBanner(false); // Hide the banner after 3 seconds (adjust as needed)
        }, 3000);
      
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
    <>{showBanner && <Banner>{uploadStatus}</Banner>}
    {error && <p>{error.message}</p>}
    <FileInput
      type="file"
      name="file"
      ref={fileInputRef}
      onChange={handleFileChange}
    />
    <CommonButton
      type="button"
      onClick={handleUploadClick}
      ButtonName="Change image"
    />
    <Form onSubmit={submitImage}>
    
    </Form>
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
const Banner = styled.div`
  position: fixed;
  top: 5rem;
  left: 0;
  width: 100%;
  background-color: var(--action-color); 
  padding: 1rem;
  text-align: center;
  font-weight: bold;
  color: var(--main-text-color); 
`;

export default ImageUploadForm;
