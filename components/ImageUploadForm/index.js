import React, { useState } from "react";
import styled from "styled-components";
// we are using useSWR to mutate the data once a file has been uploaded
import useSWR from "swr";
import CommonButton from "../CommonButton";

function ImageUploadForm({ handleAvatarChange }) {
  const { mutate } = useSWR("/api/images/");
  // We define some states to give some feedback to the user what happened to our upload
  const [uploadStatus, setUploadStatus] = useState("");
  const [error, setError] = useState(undefined);
  // a kind of 'standard' form handler
  async function submitImage(event) {
    event.preventDefault();
    setUploadStatus("Uploading...");
    const formData = new FormData(event.target);
    // we use fetch to call our API and pass the form data and request method
    try {
      const response = await fetch("/api/images/upload", {
        method: "post",
        body: formData,
      });
      // once the file is uploaded (= the promise in our api upload is resolved)
      if (response.status === 201) {
        // we call mutate to refresh our image data
        const result = await response.json();
        const imageURL = result.url; // 'url' enthält die URL des hochgeladenen Bildes

        // and set a successful state
        setUploadStatus("Upload complete!");
        handleAvatarChange(imageURL);
      }
    } catch (error) {
      // in case of error, we set the state accordingly
      setError(error);
    }
  }

  return (
    <>
      <Form onSubmit={submitImage}>
        <input type="file" name="file" />
        <CommonButton type="submit" onClick={handleAvatarChange} ButtonName="change avatar"/>
         
        <p>{uploadStatus}</p>
        {error && <p>{error.message}</p>}
      </Form>
    </>
  );
}
const Form = styled.form`
  margin: 2rem auto;
  border: none;
`;

export default ImageUploadForm;
