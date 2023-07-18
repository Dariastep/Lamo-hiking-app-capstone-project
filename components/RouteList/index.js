import RouteCard from "../RouteCard/index.js";
import { ListItem, List } from "./RouteList.styled.js";


export default function RouteList({
  routesData,
  toggleFavorite = { toggleFavorite },
  searchQuery,
  searchResults,
}) {
  return (
    <List role="list">
      {searchQuery === "" ? (
        routesData.map((route) => (
          <ListItem key={route._id}>
            <RouteCard
              route={route}
              id={route._id}
              toggleFavorite={toggleFavorite}
            />
          </ListItem>
        ))
      ) : searchResults.length > 0 ? (
        searchResults.map((route) => (
          <ListItem key={route.id}>
            <RouteCard route={route} id={route.id} />
          </ListItem>
        ))
      ) : (
        <ListItem>No matching route found.</ListItem>
      )}
    </List>
  );
}
