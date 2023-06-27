import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import styled from "styled-components";

export default function RouteDetails({
  name,
  activity,
  difficulty,
  length,
  altitude,
  description,
  imageUrl,
}) {
  return (
    <>
      <Head>
        <title>{name}</title>
      </Head>
      <Link href="/">
        <button>← back</button>
      </Link>
      <StyledImage src={imageUrl} alt={name} width={250} height={100} />
      <RouteCardHeading>{name}</RouteCardHeading>

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
        <p>{description}</p>
      </RouteInfo>
    </>
  );
}

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
