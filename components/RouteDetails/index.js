import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import styled from "styled-components";
import FavoriteButton from "../FavoriteButton";


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
      <Heading>
        <Link href="/">
          <Back>&#8249;</Back>
        </Link>
        <h1>{name}</h1>
      </Heading>
      <RouteDetailsWrapper>
        <ImageContainer>
          <StyledImage src={imageUrl} alt={name} width={350} height={100} />
          <FavoriteButton />
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
const Heading = styled.div`
  position: fixed;
  display: flex;
  align-items: center;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 2;
  background-color: var(--secondary-color);
  padding: 1rem;

  h1 {
    color: var(--primary-color);
  }
`;
const Back = styled.span`
  display: inline-block;
  background-color: #0170c4;
  border-radius: 50%;
  color: white;
  padding: 1rem 1.5rem;
  font-size: 2rem;
  line-height: 1;
  cursor: pointer;
  transition: background-color 0.3s ease-in-out;

  &:hover {
    background-color: #015c9e;
  }
`;

const StyledImage = styled(Image)`
  max-width: 100%;
  height: auto;
  border-radius: 10px;
  position: relative;
`;
const ImageContainer = styled.div`
  position: relative;
  width: 100%;
`;


const RouteInfo = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  margin: 1.5rem auto;
`;

const RouteCardKey = styled.p`
  font-weight: bold;
  margin: 0;
`;

const RouteDetailsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 2rem 1rem;
  margin: 7rem 1rem 1rem;
  justify-content: center;
  align-items: center;
`;
const Description = styled.p`
  font-weight: bold;
  text-align: left;
  margin: 1.5rem auto 0.5rem auto;
`;
