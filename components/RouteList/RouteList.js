import styled from "styled-components";

const List = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  padding-left: 0;
`;
const ListItem = styled.li`
  position: relative;
  width: 100%;
`;

export default function RouteList({ routesData }) {
  return (<><h1>Routes</h1>
    <List role="list">
      {routesData.map((route) => {
        return <ListItem key={route.id}>
            <h2>{route.name}</h2>
            <p>Activity: {route.activity}</p>
            <p>Difficulty: {route.difficulty}</p>
            <p>Length: {route.length}</p>
            <p>Altitude: {route.altitude}</p>
            </ListItem>;
      })}
    </List></>
  );
}
