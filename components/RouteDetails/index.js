import Head from "next/head";
import {
  Heading,
  RouteDetailsWrapper,
  ImageContainer,
  StyledImage,
  RouteInfo,
  RouteCardKey,
  Description,
} from "./routeDetails.styled";

import FavoriteButton from "../FavoriteButton";
import BackButton from "../BackButton";

export default function RouteDetails({
  name,
  activity,
  difficulty,
  length,
  altitude,
  description,
  imageUrl,
  id,
}) {
  return (
    <>
      <Head>
        <title>{name}</title>
      </Head>
      <Heading>
        <BackButton />
        <h1>{name}</h1>
      </Heading>
      <RouteDetailsWrapper>
        <ImageContainer>
          <StyledImage src={imageUrl} alt={name} width={350} height={100} />
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
      </RouteDetailsWrapper>
    </>
  );
}
