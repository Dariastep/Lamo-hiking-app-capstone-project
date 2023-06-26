import styled from "styled-components";
import { routesData } from "@/routesData.js";
import RouteCard from "../RouteCard/index.js";

export default function RouteList() {
  return (
    <>
      <Heading><h1>Routes</h1></Heading>
      <List role="list">
        {routesData.map((route) => {
          return (
            <ListItem key={route.id}>
              <RouteCard route={route} />
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
  margin: 6rem 0.5rem;
  overflow: hidden;
  z-index: 1;
`;
const ListItem = styled.li`
  display: flex;
  flex-direction: column;
  width: 90%;
  border: 1px solid #ccc;
  border-radius: 10px;
  padding: 1rem;
  background-color: #ccc;
  margin: auto;
  justify-content: center;
  align-items: center;
`;

const Heading = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 2;
  background-color: #ffffff;
  padding: 1rem;
`;
