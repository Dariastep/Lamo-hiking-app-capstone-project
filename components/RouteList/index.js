import RouteCard from "../RouteCard/index.js";
import { ListItem, Heading, List } from "./RouteList.styled";


export default function RouteList({ routesData }) {
  return (
    <>
      <Heading>
        <h1>Routes</h1>
      </Heading>
      <List role="list">
        {routesData.map((route) => {
          return (
            <ListItem key={route.id}>
              <RouteCard route={route} id={route.id} />
            </ListItem>
          );
        })}
      </List>
    </>
  );
}