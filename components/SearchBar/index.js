import styled from "styled-components";
import icon from "./icon.png";

export default function SearchBar({
  searchQuery,
  handleSearch,
  searchResults,
}) {
  console.log(icon);
  return (
    <>
      <SearchInput
        autoFocus={true}
        type="text"
        aria-label="search field"
        value={searchQuery}
        id="search"
        name="search"
        onChange={handleSearch}
        placeholder="Search..."
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
  width: 50%;
  border: 1px solid var(--tercery-color);
  height: 2.5rem;
  border-radius: 10px;
  padding-left: 2.5rem; /* Adjust the padding to accommodate the icon */
  margin: 0 auto;
  background-image: url(${icon.src});
  background-repeat: no-repeat;
  background-position: 0.5rem center;
  background-size: 1rem;

  &:focus {
    outline: 1.25px solid var(--secondary-color);
  }

   /* Media query for small devices */
   @media (max-width: 600px) {
    width: 90%; /* Full width for small devices */
  }
`;
const StyledP = styled.p`
  text-align: center;
  margin-top: 0.5rem;
  visibility: ${(props) => (props.isVisible ? "visible" : "hidden")};
`;
