import styled from "styled-components";

export default function SearchBar({searchQuery,handleSearch,searchResults  }) {

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
