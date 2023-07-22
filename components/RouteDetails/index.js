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
import Button from "../Button";
import { useRouter } from "next/router";
import styled from "styled-components";
// Import Leaflet and react-leaflet components dynamically
const LeafletMap = dynamic(() => import("../LeafletMap"), {
  ssr: false, // Disable server-side rendering
});
import dynamic from "next/dynamic";
import { toast } from "react-toastify";

export default function RouteDetails({
  data,
  name,
  activity,
  difficulty,
  length,
  altitude,
  description,
  imageUrl,
  id,
  createdBy,
  location,
  session,
  lon,
  lat,
}) {
  const router = useRouter();
  function handleEdit() {
    router.push(`/routes/${id}/edit`);
  }

  async function deleteRoute() {
    const response = await fetch(`/api/routes/${id}`, { method: "DELETE" });
    if (response.ok) {
      await response.json();
      toast.success("Route is deleted!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      router.push("/myRoutes");
    } else {
      console.log(response.status);
    }
  }
  return (
    <RouteDetailsWrapper>
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
      <Description>Location:</Description>
      <P>{location}</P>
      <MapWrapper>
        <LeafletMap data={data} />
      </MapWrapper>
      <Description>Description:</Description>
      <p>{description}</p>
      {session && session.user.email === createdBy ? (
        <ButtonWrapper>
          <Button ButtonName=" Edit" onClick={handleEdit} />
          <Button ButtonName="Delete" onClick={deleteRoute} isWarningButton />
        </ButtonWrapper>
      ) : null}
    </RouteDetailsWrapper>
  );
}

const ButtonWrapper = styled.div`
  margin-top: 1rem;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  width: 70%;
`;
const P = styled.p`
  text-align: center;
`;
const MapWrapper = styled.div`
  display: grid;
  flex-direction: column;
  margin: 4rem 0rem;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  margin: 1rem;
`;
