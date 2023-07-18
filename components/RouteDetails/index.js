import defaultImage from "../../public/defaultImage.jpg";
import FavoriteButton from "../FavoriteButton";
import {
  RouteDetailsWrapper,
  ImageContainer,
  StyledImage,
  RouteInfo,
  RouteCardKey,
  Description,
} from "./routeDetails.styled";
import CommonButton from "../CommonButton";
import { useRouter } from "next/router";
import styled from "styled-components";
import dynamic from "next/dynamic";
// Import Leaflet and react-leaflet components dynamically
const LeafletMap = dynamic(() => import("../LeafletMap"), {
  ssr: false, // Disable server-side rendering
});

export default function RouteDetails({
  name,
  activity,
  difficulty,
  length,
  altitude,
  description,
  imageUrl,
  id,
  createdBy,
  session,
}) {
  const router = useRouter();
  function handleEdit() {
    router.push(`/routes/${id}/edit`);
  }

  async function deleteRoute() {
    const response = await fetch(`/api/routes/${id}`, { method: "DELETE" });
    if (response.ok) {
      await response.json();
      router.push("/myRoutes");
    } else {
      console.log(response.status);
    }
  }
  return (
    <RouteDetailsWrapper>
      <LeafletMap />
      <ImageContainer>
        <StyledImage
          src={imageUrl || defaultImage}
          alt={name}
          width={350}
          height={100}
        />
        <FavoriteButton id={id} />
      </ImageContainer>
      
      <RouteInfo>
        <div>
          <RouteCardKey>Activity:</RouteCardKey>
          <p>{activity}</p>
        </div>

        <div>
          <RouteCardKey>Difficulty:</RouteCardKey>
          <p>{difficulty}</p>
        </div>

        <div>
          <RouteCardKey>Length:</RouteCardKey>
          <p>{length}</p>
        </div>

        <div>
          <RouteCardKey>Altitude:</RouteCardKey>
          <p>{altitude}</p>
        </div>
      </RouteInfo>
      <Description>Description:</Description>
      <p>{description}</p>
     
      {session && session.user.email === createdBy ? (
        <ButtonWrapper>
          <CommonButton ButtonName="Edit" onClick={handleEdit} />
          <CommonButton
            ButtonName="Delete"
            onClick={deleteRoute}
            warningButton
          />
        </ButtonWrapper>
      ) : null}

    </RouteDetailsWrapper>
  );
}

const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: row;
`;
