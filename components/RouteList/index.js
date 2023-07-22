import RouteCard from "../RouteCard/index.js";
import { ListItem, List } from "./RouteList.styled.js";
import styled from "styled-components";

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
          <SearchText>Start exploring</SearchText>
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
        <ListItem key="no-results">No matching route found.</ListItem>
      )}
    </List>
  );
}
const SearchText = styled.h3`
  text-align: left;
  margin: 2rem auto 0.5rem;
  color: var(--main-text-color);
  margin-left: 1rem;

  @media (max-width: 600px) {
    width: 85%; /* Full width for small devices */
  }
  @media (min-width: 600px) {
    width: 70%; /* Full width for small devices */
  }
`;
