import RouteCard from "../RouteCard/index.js";
import SearchBar from "../SearchBar/index.js";
import { ListItem, Heading, List } from "./RouteList.styled";

export default function RouteList({ routesData }) {
  return (
    <>
      <SearchBar />
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
