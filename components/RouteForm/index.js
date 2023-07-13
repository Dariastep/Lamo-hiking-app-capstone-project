import styled from "styled-components";
import CommonButton from "../CommonButton";
import { useState } from "react";

const descriptonPlaceholder =
  "Provide a description of the route. Include details such as the trail difficulty, terrain, notable landmarks, scenic views, and any important considerations or recommendations for hikers.";
const maxDescriptionLength = 235;

export default function RouteForm({ onRouteCreated, myRoutes }) {
  const [description, setDescription] = useState("");

  function handleDescriptionChange(event) {
    setDescription(event.target.value);
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);

    try {
      const response = await fetch("/api/routes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (response.ok) {
        const newRoute = await response.json();
        onRouteCreated(newRoute);
      }
    } catch (error) {
      console.error("Failed to create a new route:", error);
    }
  }

  return (
    <FormContainer onSubmit={handleSubmit}>
      <FormLabel htmlFor="name" autocomplete="on">
        Route name
      </FormLabel>
      <FormInput
        id="name"
        name="name"
        type="text"
        placeholder="e.g. Zugspitze via Höllental"
        required
        minLength="10"
        maxLength="35"
      />
      <FormLabel htmlFor="activity">Activity</FormLabel>
      <FormSelect id="activity" name="activity" required>
        <option value="hiking">hiking</option>
        <option value="trailrunning">trailrunning</option>
        <option value="cycling">cycling</option>
      </FormSelect>
      <FormLabel htmlFor="difficulty">Difficulty</FormLabel>
      <FormSelect id="difficulty" name="difficulty" required>
        <option value="easy">easy</option>
        <option value="moderate">moderate</option>
        <option value="difficult">difficult</option>
      </FormSelect>
      <FormLabel htmlFor="length">Length, km</FormLabel>
      <FormInput id="length" name="length" type="number" required />
      <FormLabel htmlFor="altitude">Altitude, hm</FormLabel>
      <FormInput id="altitude" name="altitude" type="number" required />
      <FormLabel htmlFor="description">Description</FormLabel>
      <FormTextArea
        id="description"
        name="description"
        placeholder={descriptonPlaceholder}
        required
        value={description}
        minLength="10"
        maxLength={maxDescriptionLength}
        rows="10"
        onChange={handleDescriptionChange}
      />
      <CharactersLeft>
        {maxDescriptionLength - description.length} characters remaining
      </CharactersLeft>
      <CommonButton type="submit" ButtonName="Create a new route">
        {/*  {defaultData ? "Update place" : "Add place"} */}
      </CommonButton>
    </FormContainer>
  );
}

const FormContainer = styled.form`
  display: grid;
  gap: 0.5rem;
  margin: 1rem 2rem;
`;

const FormLabel = styled.label`
  font-weight: bold;
`;

const FormInput = styled.input`
  padding: 0.5rem;
  border: 1px solid var(--secondary-color);
  border-radius: 4px;
  font-size: 1rem;
`;

const FormSelect = styled.select`
  padding: 0.5rem;
  border: 1px solid var(--secondary-color);
  border-radius: 4px;
  font-size: 1rem;
`;

const FormTextArea = styled.textarea`
  padding: 0.5rem;
  border: 1px solid var(--secondary-color);
  border-radius: 4px;
  font-size: 1rem;
`;
const CharactersLeft = styled.p`
  text-align: right;
  color: #888;
  font-size: 1rem;
  margin-top: 0.5rem;
`;
