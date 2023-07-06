import { useState } from "react";
import RouteCard from "../RouteCard/index.js";
import SearchBar from "../SearchBar/index.js";
import { ListItem, List } from "./RouteList.styled";

export default function RouteList({ routesData }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  function handleSearch(event) {
    event.preventDefault();
    const query = event.target.value;
    setSearchQuery(query);

    const results = routesData.filter((route) =>
      route.name.toLowerCase().includes(query.toLowerCase())
    );
    setSearchResults(results);
  }
  return (
    <>
      <SearchBar
        searchQuery={searchQuery}
        handleSearch={handleSearch}
        searchResults={searchResults}
      />
      <List role="list">
        {searchQuery === "" ? (
          routesData.map((route) => (
            <ListItem key={route._id}>
              <RouteCard route={route} id={route._id} />
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
    </>
  );
}
