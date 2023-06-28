import styled from "styled-components";
import { routesData } from "@/routesData.js";
import RouteCard from "../RouteCard/index.js";
import Link from "next/link.js";
import FavoriteButton from "../FavoriteButton/index.js";

export default function RouteList() {
  return (
    <>
      <Heading>
        <h1>Routes</h1>
      </Heading>
      <List role="list">
        {routesData.map((route) => {
          return (
            <ListItem key={route.id}>
              <RouteCard route={route} />
              <StyledLink href={`/${route.id}`}>
                <StyledButton>Details</StyledButton>
              </StyledLink>
            </ListItem>
          );
        })}
      </List>
    </>
  );
}

const List = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
  margin: 7rem 0.5rem;
  overflow: hidden;
  z-index: 1;
`;
const ListItem = styled.li`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 90%;
  border: 1px solid var(--tercery-color);
  border-radius: 10px;
  padding: 1rem;
  background-color: var(--tercery-color);
  margin: auto;
  justify-content: center;
  align-items: center;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 13px 27px -5px,
    rgba(0, 0, 0, 0.3) 0px 8px 16px -8px;

  &:hover {
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  }
`;

const Heading = styled.div`
  position: fixed;
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

const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;

  &:visited {
    text-decoration: none;
    color: inherit;
  }
`;

const StyledButton = styled.button`
  cursor: pointer;
  border-radius: 5px;
  background-color: var(--secondary-color);
  color: var(--primary-color);
  font-size: 1.1rem;
  margin: 1.5rem 1rem;
  border: 1px var(--secondary-color);
  padding: 0.5rem 1rem;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  &:hover {
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  }
`;
