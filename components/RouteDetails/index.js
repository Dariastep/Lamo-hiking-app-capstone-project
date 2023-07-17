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
  /* console.log(session.user.mail); */
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
      <Description>Description:</Description>
      <p>{description}</p>
      {session && session.user.email === createdBy ? (
        <CommonButton ButtonName="Edit" />
      ) : null}
    </RouteDetailsWrapper>
  );
}
