import Image from "next/image";
import styled from "styled-components";

const RouteCardHeading = styled.h2`
  font-size: 1.25rem;
  margin: 1rem;
  text-align: center;
`;
const StyledImage = styled(Image)`
  max-width: 100%;
  height: auto;
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

export default function RouteCard({ route }) {
  return (
    <>
      <StyledImage
        src={route.imageUrl}
        alt={route.name}
        width={250}
        height={100}
      />
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
          <p>{route.length}</p>
        </div>

        <div>
          <RouteCardKey>Altitude:</RouteCardKey>
          <p>{route.altitude}</p>
        </div>
      </RouteInfo>
    </>
  );
}
