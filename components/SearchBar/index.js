import styled from "styled-components";
import { useState } from "react";

export default function SearchBar() {
  const [searchQuery, setSearchQuery] = useState([""]);
  const [searchrResults, setSearchResults] = useState([]);
  async function handleSearch(event) {
    event.preventDefault();
    const query = event.target.value;
    setSearchQuery(query);

    const results = routesData.filter((route) =>
      route.name.toLowerCase().includes(query.toLowerCase())
    );
  }
  setSearchResults(results);
  return (
    <div>
        <input type="text" aria-label="search field" value={searchQuery} id="search" name="search" onChange={handleSearch}/>
      <ul>

      </ul>
    </div>
  );
}

const StyledSearchBar = styled(SearchBar)`
  display: flex;
`;
