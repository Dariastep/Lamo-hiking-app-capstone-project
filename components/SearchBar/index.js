import styled from "styled-components";
import { useState } from "react";
import RouteCard from "../RouteCard";
import { List, ListItem } from "../RouteList/RouteList.styled";
import { routesData } from "@/routesData";

export default function SearchBar() {
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
    <SearchContainer>
      <SearchInput
        type="text"
        aria-label="search field"
        value={searchQuery}
        id="search"
        name="search"
        onChange={handleSearch}
      />
      {searchResults.length > 0 && (
        <List>
          {searchResults.map((result) => {
            return (
              <ListItem key={result.id}>
                <RouteCard route={result} id={result.id} />
              </ListItem>
            );
          })}
        </List>
      )}
    </SearchContainer>
  );
}

const SearchContainer = styled.div`
  position: relative;
`;

const SearchInput = styled.input`
  width: 80%;
  margin: 6rem auto 0;
  height: 3rem;
`;
