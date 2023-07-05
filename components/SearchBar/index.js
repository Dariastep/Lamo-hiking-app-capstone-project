import styled from "styled-components";

export default function SearchBar({
  searchQuery,
  handleSearch,
  searchResults,
}) {
  return (
    <>
      <SearchInput
        type="text"
        aria-label="search field"
        value={searchQuery}
        id="search"
        name="search"
        onChange={handleSearch}
      />
      <StyledP isVisible={searchQuery !== "" && searchResults.length > 0}>
        {searchResults.length > 0
          ? `${searchResults.length} ${
              searchResults.length !== 1 ? "results" : "result"
            } found`
          : ""}
      </StyledP>
    </>
  );
}

const SearchInput = styled.input`
  width: 80%;
  margin: 0 auto;
  border: 1px solid black;
  height: 3rem;
`;
const StyledP = styled.p`
  text-align: center;
  margin-top: 0.5rem;
  visibility: ${(props) => (props.isVisible ? "visible" : "hidden")};
`;
