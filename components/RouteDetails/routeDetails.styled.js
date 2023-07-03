import styled from "styled-components";
import Image from "next/image";

export const Heading = styled.div`
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

export const StyledImage = styled(Image)`
  max-width: 100%;
  height: auto;
  border-radius: 10px;
  position: relative;
`;
export const ImageContainer = styled.div`
  position: relative;
  width: fit-content;
`;

export const RouteInfo = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  margin: 1.5rem auto;
`;

export const RouteCardKey = styled.p`
  font-weight: bold;
  margin: 0;
`;

export const RouteDetailsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 2rem 1rem;
  margin: 7rem 1rem 1rem;
  justify-content: center;
  align-items: center;
`;
export const Description = styled.p`
  font-weight: bold;
  text-align: left;
  margin: 1.5rem auto 0.5rem auto;
`;
