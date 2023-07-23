import RouteCard from "../RouteCard/index.js";
import { ListItem, List, P } from "./RouteList.styled.js";


export default function RouteList({
  routesData,
  toggleFavorite = { toggleFavorite },
  searchQuery,
  searchResults,
}) {
  return (
    <List role="list">
      {searchQuery === "" ? (
        <>
          {routesData.map((route) => (
            <ListItem key={route._id}>
              <RouteCard
                route={route}
                id={route._id}
                toggleFavorite={toggleFavorite}
              />
            </ListItem>
          ))}
        </>
      ) : searchResults.length > 0 ? (
        searchResults.map((route) => (
          <ListItem key={route.id}>
            <RouteCard route={route} id={route._id} />
          </ListItem>
        ))
      ) : (
        <P key="no-results">No matching routes found.</P>
      )}
    </List>
  );
}
