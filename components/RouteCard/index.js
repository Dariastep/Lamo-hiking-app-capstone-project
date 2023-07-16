import Image from "next/image";
import Link from "next/link";
import styled from "styled-components";
import FavoriteButton from "../FavoriteButton";
import CommonButton from "../CommonButton";
import defaultImage from "../../public/defaultImage.jpg";

export default function RouteCard({ route, id, toggleFavorite }) {
  return (
    <>
      <ImageContainer>
        <StyledImage
          src={route.imageUrl || defaultImage}
          alt={route.name}
          width={250}
          height={100}
          priority
        />
        <FavoriteButton
          id={id}
          toggleFavorite={toggleFavorite}
          isFavorite={route.isFavorite}
        />
      </ImageContainer>
      <RouteCardHeading>{route.name}</RouteCardHeading>

      <RouteInfo>
        <div>
          <RouteCardKey>Activity:</RouteCardKey>
          <p>{route.activity}</p>
        </div>

        <div>
          <RouteCardKey>Difficulty:</RouteCardKey>
          <p>{route.difficulty}</p>
        </div>

        <div>
          <RouteCardKey>Length:</RouteCardKey>
          <p>{route.length} km</p>
        </div>

        <div>
          <RouteCardKey>Altitude:</RouteCardKey>
          <p>{route.altitude} hm</p>
        </div>
      </RouteInfo>
      <StyledLink href={`routes/${id}`} passHref>
        <CommonButton ButtonName="Details" />
      </StyledLink>
    </>
  );
}
const ImageContainer = styled.div`
  position: relative;
  width: 100;
`;
const RouteCardHeading = styled.h2`
  font-size: 1.25rem;
  margin: 1rem;
  text-align: center;
`;
const StyledImage = styled(Image)`
  max-width: 100%;
  height: auto;
  width: auto;
  border-radius: 10px;
`;
const RouteInfo = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
`;

const RouteCardKey = styled.p`
  font-weight: bold;
  margin: 0;
`;
export const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;

  &:visited {
    text-decoration: none;
    color: inherit;
  }
`;
