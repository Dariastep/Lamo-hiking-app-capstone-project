import styled from "styled-components";
import Button from "../Button";
import { useState } from "react";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import DropdownSearch from "../DropdownSearch";
// Import Leaflet and react-leaflet components dynamically
const LeafletMap = dynamic(() => import("../LeafletMap"), {
  ssr: false, // Disable server-side rendering
});
import dynamic from "next/dynamic";
import { toast } from "react-toastify";

const descriptonPlaceholder =
  "Provide a description of the route. Include details such as the trail difficulty, terrain, notable landmarks, scenic views, and any important considerations or recommendations for hikers.";
const maxDescriptionLength = 235;

export default function RouteForm({ formName, data, id }) {
  const { data: session } = useSession();
  const router = useRouter();
  const [description, setDescription] = useState("");
  const [isDisabled, setIsDisabled] = useState(false);
  const [selectedPosition, setselectedPosition] = useState(null);
  const [selectedLocation, setselectedLocation] = useState("");

  function handleDescriptionChange(event) {
    setDescription(event.target.value);
  }

  async function createRoute(data) {
    try {
      data.createdBy = session.user.email;
      const response = await fetch("/api/routes/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (response.ok) {
        return { status: "success" };
      }
      return { status: "fail" };
    } catch (error) {
      console.error("Failed to create a new route:", error);
      return { status: "fail" };
    }
  }
  async function editRoute(data, id) {
    try {
      const response = await fetch(`/api/routes/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (response.ok) {
        return { status: "success" };
      }
      return { status: "fail" };
    } catch (error) {
      console.error("Failed to edit the route:", error);
      return { status: "fail" };
    }
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);

    if (selectedPosition) {
      data.lat = selectedPosition.lat;
      data.lon = selectedPosition.lon;
    }

    if (selectedLocation) {
      data.location = selectedLocation;
    }

    setIsDisabled(!isDisabled);

    if (formName === "create-route") {
      const { status } = await createRoute(data);

      if (status === "success") {
        event.target.reset();
        setDescription("");
        setselectedPosition(null);
        toast.success("Route is created successfully!", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        router.push("/myRoutes/");
      }
    }

    if (formName === "edit-route") {
      const { status } = await editRoute(data, id);
      if (status === "success") {
        toast.success("Route is edited successfully!", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        router.push(`/routes/${id}`);
      }
    }
  }

  return (
    <>
      <FormContainer onSubmit={handleSubmit} aria-labelledby={formName}>
        <FormLabel htmlFor="name">Route name</FormLabel>
        <FormInput
          id="name"
          name="name"
          type="text"
          placeholder="e.g. Zugspitze via Höllental"
          required
          minLength="4"
          maxLength="35"
          autoComplete="on"
          defaultValue={data?.name}
        />
        <FormLabel htmlFor="activity">Activity</FormLabel>
        <FormSelect
          id="activity"
          name="activity"
          required
          defaultValue={data?.activity}
        >
          <option value="hiking">hiking</option>
          <option value="trailrunning">trailrunning</option>
          <option value="cycling">cycling</option>
        </FormSelect>
        <FormLabel htmlFor="difficulty">Difficulty</FormLabel>
        <FormSelect
          id="difficulty"
          name="difficulty"
          required
          defaultValue={data?.difficulty}
        >
          <option value="easy">easy</option>
          <option value="moderate">moderate</option>
          <option value="difficult">difficult</option>
        </FormSelect>
        <FormLabel htmlFor="length">Length, km</FormLabel>
        <FormInput
          id="length"
          name="length"
          type="number"
          autoComplete="on"
          required
          defaultValue={data?.length}
        />
        <FormLabel htmlFor="altitude">Altitude, hm</FormLabel>
        <FormInput
          id="altitude"
          name="altitude"
          type="number"
          autoComplete="on"
          required
          defaultValue={data?.altitude}
        />
        <FormLabel htmlFor="description">Description</FormLabel>
        <FormTextArea
          id="description"
          name="description"
          placeholder={descriptonPlaceholder}
          required
          maxLength={maxDescriptionLength}
          rows="4"
          onChange={handleDescriptionChange}
          defaultValue={data?.description}
        />
        <CharactersLeft>
          {maxDescriptionLength - description.length} characters remaining
        </CharactersLeft>
        <FormLabel htmlFor="createdBy">Created by</FormLabel>
        <FormInput
          id="createdBy"
          name="createdBy"
          type="text"
          readOnly
          disabled
          value={session?.user.email}
        />
        <FormLabel htmlFor="search">Location</FormLabel>
        <StyledDropdownSearch
          selectedPosition={selectedPosition}
          setselectedPosition={setselectedPosition}
          data={data}
          selectedLocation={selectedLocation}
          setselectedLocation={setselectedLocation}
        />
        <MapWrapper>
          <LeafletMap selectedPosition={selectedPosition} data={data} />
        </MapWrapper>
        <ButtonContainer>
          <Button
            ButtonName={data ? "Save changes" : "Create"}
            disabled={isDisabled}
          ></Button>
        </ButtonContainer>
      </FormContainer>
    </>
  );
}

const FormContainer = styled.form`
  display: grid;
  gap: 0.5rem;
  margin: 1rem 2rem 7rem;
`;

const FormLabel = styled.label`
  font-weight: bold;
`;

const FormInput = styled.input`
  padding: 0.5rem;
  border: 1px solid var(--primary-color);
  border-radius: 4px;
  font-size: 1rem;
`;

const FormSelect = styled.select`
  padding: 0.5rem;
  border: 1px solid var(--primary-color);
  border-radius: 4px;
  font-size: 1rem;
`;

const FormTextArea = styled.textarea`
  padding: 0.5rem;
  border: 1px solid var(--primary-color);
  border-radius: 4px;
  font-size: 1rem;
  resize: none;
  overflow: hidden;
  font-family: Arial, Helvetica, sans-serif;

  ::placeholder {
    font-family: Arial, Helvetica, sans-serif;
  }
`;
const CharactersLeft = styled.p`
  text-align: right;
  color: #888;
  font-size: 1rem;
  margin-top: 0.2rem;
`;
const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;
const MapWrapper = styled.div`
  display: grid;
  flex-direction: column;
  margin: 1rem 0rem;
  justify-content: center;
  align-items: center;
`;
const StyledDropdownSearch = styled(DropdownSearch)`
  && {
  }
`;
