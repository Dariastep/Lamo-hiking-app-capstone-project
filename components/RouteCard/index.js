import Image from "next/image";
import Link from "next/link";
import styled from "styled-components";
import FavoriteButton from "../FavoriteButton";
import Button from "../Button";
import defaultImage from "../../public/defaultImage.jpg";

export default function RouteCard({ route, id, toggleFavorite }) {

  function truncateLocation(location, maxLength) {
    if (!location) return ""; 
    if (location.length <= maxLength) {
      return location;
    } else {
      return location.slice(0, maxLength) + "...";
    }
  }
  return (
    <Wrapper>
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
      <div><RouteLocation>Location:</RouteLocation>
        <p>{truncateLocation(route.location, 30)}</p></div>
      <StyledLink href={`routes/${id}`} passHref>
        <Button ButtonName="Details" isSecondaryButton />
      </StyledLink>
    </Wrapper>
  );
}
const ImageContainer = styled.div`
  position: relative;
  width: 100;
`;
const RouteCardHeading = styled.h2`
  font-size: 1.25rem;
  font-weight: 550;
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
const RouteLocation = styled.p`
  font-weight: bold;
  margin: 0;
  text-align: center;
  
`;
export const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;

  &:visited {
    text-decoration: none;
    color: inherit;
  }
`;
const Wrapper = styled.div`
  display: grid;
  gap: 1rem;
  justify-items: center;
`;
