import styled from "styled-components";
import { useEffect, useState } from "react";
import placeholder from "../../public/icon-location.png";
import { NOMINATIM_BASE_URL } from "../../constants.js";

export default function DropdownSearch({
  data,
  selectedPosition,
  setselectedPosition,
  selectedLocation,
  setselectedLocation,
}) {
  const [searchTextInput, setSearchTextInput] = useState(data?.location || "");
  const [listPlace, setListPlace] = useState([]);
  const [timeoutId, setTimeoutId] = useState(null);

  async function getPlaceList(searchParam) {
    const params = {
      q: searchParam,
      format: "json",
      addressdetails: 1,
      polygon_geojson: 0,
    };
    const queryString = new URLSearchParams(params).toString();
    const requestOptions = {
      method: "GET",
      redirect: "follow",
    };
    fetch(`${NOMINATIM_BASE_URL}${queryString}`, requestOptions)
      .then((response) => response.text())
      .then((result) => {
        setListPlace(JSON.parse(result));
      })
      .catch((error) => console.error("error", error));
  }

  async function handleSearchText(event) {
    setSearchTextInput(event.target.value);

    clearTimeout(timeoutId);

    const newTimeoutId = setTimeout(() => {
      getPlaceList(event.target.value);
    }, 2000);

    setTimeoutId(newTimeoutId);
  }

  const handleResultClick = (item) => {
    setSearchTextInput(item.display_name);
    setselectedLocation(item.display_name);
    setselectedPosition({
      lat: item.lat,
      lon: item.lon,
    });
    setListPlace([]);
  };

  return (
    <>
      <SearchInput
        autoFocus={true}
        autoComplete="off"
        type="text"
        aria-label="search field"
        id="search"
        name="search"
        value={searchTextInput}
        onChange={handleSearchText}
        placeholder="Search..."
      />
      {listPlace.length > 0 && searchTextInput !== "" ? (
        <ul>
          {listPlace.map((item) => (
            <div key={item?.osm_id}>
              <ListItem onClick={() => handleResultClick(item)}>
                {item.display_name}
              </ListItem>
            </div>
          ))}
        </ul>
      ) : null}
    </>
  );
}

const SearchInput = styled.input`
  height: 2.5rem;
  padding: 0.5rem 0 0.5rem 2.5rem;
  font-size: 1rem;
  background-repeat: no-repeat;
  background-position: 0.5rem center;
  background-size: 1rem;
  background-image: url(${placeholder.src});

  border: 1px solid var(--primary-color);
  border-radius: 4px;
  font-size: 1rem;
  width: 100%;

  &:focus {
    border: 1.25px solid var(--action-color);
  }
`;
const ListItem = styled.li`
  cursor: pointer;
`;
