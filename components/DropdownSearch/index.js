import styled from "styled-components";
import { useState } from "react";
import placeholder from "../../public/icon-location.png";

const NOMNATIM_BASE_URL = "https://nominatim.openstreetmap.org/search?";
const params = {
  q: "",
  format: "json",
  addressdetails: "addressdetails",
};

export default function DropdownSearch({ selectPosition, setSelectPosition }) {
  const [searchText, setSearchText] = useState("");
  const [listPlace, setListPlace] = useState([]);

  function handleDropdownSearch(event) {
    setSearchText(event.target.value);
    const params = {
      q: searchText,
      format: "json",
      addressdetails: 1,
      polygon_geojson: 0,
    };
    const queryString = new URLSearchParams(params).toString();
    const requestOptions = {
      method: "GET",
      redirect: "follow",
    };
    fetch(`${NOMNATIM_BASE_URL}${queryString}`, requestOptions)
      .then((response) => response.text())
      .then((result) => {
        setListPlace(JSON.parse(result));
      })
      .catch((error) => console.log("error", error));
  }
  return (
    <>
      <SearchBarWrapper>
        <SearchInput
          autoFocus={true}
          type="text"
          aria-label="search field"
          id="search"
          name="search"
          value={searchText}
          onChange={handleDropdownSearch}
          placeholder="Search..."
        />
      </SearchBarWrapper>
      {listPlace.length > 0 && searchText !== "" ? (
        <ul>
          {listPlace.map((item) => (
            <div key={item?.osm_id}>
              <li
                onClick={() => {
                  setSelectPosition(item);
                }}
              >
                {item.display_name}
              </li>
            </div>
          ))}
        </ul>
      ) : null}
    </>
  );
}
const SearchBarWrapper = styled.div`
  width: 100%;
  z-index: 1;
  background-color: var(--primary-color);
`;

const SearchInput = styled.input`
  border: 1px solid var(--tercery-color);
  display: flex;
  height: 2.5rem;
  border-radius: 10px;
  padding-left: 2.5rem;
  font-size: 1rem;
  background-repeat: no-repeat;
  background-position: 0.5rem center;
  background-size: 1rem;
  background-image: url(${placeholder.src});

  &:focus {
    outline: 1.25px solid var(--secondary-color);
  }

  /* Media query for small devices */
  @media (max-width: 600px) {
    width: 90%; /* Full width for small devices */
  }
  @media (min-width: 600px) {
    width: 70%; /* Full width for small devices */
  }
`;
const StyledP = styled.p`
  text-align: center;
  margin-top: 0.5rem;
  visibility: ${(props) => (props.isVisible ? "visible" : "hidden")};
`;
