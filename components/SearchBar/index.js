import styled from "styled-components";
import icon from "./icon.png";

export default function SearchBar({
  searchQuery,
  handleSearch,
  searchResults,
}) {
  return (
    <SearchBarWrapper>
      <SearchText>Search</SearchText>
      <SearchInput
        autoFocus={true}
        type="text"
        aria-label="search field"
        value={searchQuery}
        id="search"
        name="search"
        onChange={handleSearch}
        placeholder="What do you want to do?"
      />
      <StyledP isVisible={searchQuery !== "" && searchResults.length > 0}>
        {searchResults.length > 0
          ? `${searchResults.length} ${
              searchResults.length !== 1 ? "results" : "result"
            } found`
          : ""}
      </StyledP>
      {searchQuery === "" ? (
        <SearchText>Start exploring</SearchText>
      ) : searchQuery !== "" && searchResults.length > 0 ? (
        <SearchText>Search results</SearchText>
      ) : null}
    </SearchBarWrapper>
  );
}

const SearchBarWrapper = styled.div`
  position: sticky;
  height: 9rem;
  top: 6rem;
  left: 0;
  background-color: var(--main-background-color);
  z-index: 5;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const SearchInput = styled.input`
  height: 2.5rem;
  border-radius: 10px;
  border: 1px solid var(--primary-color);
  padding-left: 2.5rem;
  font-size: 1rem;
  background-image: url(${icon.src});
  background-repeat: no-repeat;
  background-position: 0.5rem center;
  background-size: 1rem;
  width: 100%;

  /* Media query for small devices */
  @media (max-width: 600px) {
    width: 85%; /* Full width for small devices */
  }
  @media (min-width: 600px) {
    width: 50%; /* Full width for small devices */
  }
`;
const StyledP = styled.p`
  text-align: center;
  margin-top: 0.5rem;
  margin-bottom: 1rem;
  visibility: ${(props) => (props.isVisible ? "visible" : "hidden")};
`;
const SearchText = styled.h3`
  text-align: left;
  margin-bottom: 0.5rem;
  width: 100%;
  color: var(--main-text-color);
  font-weight: 550;

  @media (max-width: 600px) {
    width: 85%; /* Full width for small devices */
  }
  @media (min-width: 600px) {
    width: 50%; /* Full width for small devices */
  }
`;
