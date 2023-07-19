import styled from "styled-components";
import { useEffect, useState } from "react";
import placeholder from "../../public/icon-location.png";

const NOMNATIM_BASE_URL = "https://nominatim.openstreetmap.org/search?";

export default function DropdownSearch({
  data,
  selectPosition,
  setSelectPosition,
}) {
  const [searchText, setSearchText] = useState("");
  const [listPlace, setListPlace] = useState([]);

  useEffect(() => {
    let delayTimer;

    if (searchText !== "") {
      delayTimer = setTimeout(() => {
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
      }, 1000);
    }

    return () => clearTimeout(delayTimer);
  }, [searchText]);

  function handleResultClick(item) {
    setSearchText(item.display_name);



    setSelectPosition({
      lat: item.lat,
      lon: item.lon,
    });
    setListPlace([]);
  }
  return (
    <>
      <SearchInput
        autoFocus={true}
        autoComplete="off"
        type="text"
        aria-label="search field"
        id="search"
        name="search"
        defaultValue={searchText}
        onChange={(event) => {
          setSearchText(event.target.value);
        }}
        placeholder="Search..."
      />
      {listPlace.length > 0 && searchText !== "" ? (
        <ul>
          {listPlace.map((item) => (
            <div key={item?.osm_id}>
              <li onClick={() => handleResultClick(item)}>
                {item.display_name}
              </li>
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

  border: 1px solid var(--secondary-color);
  border-radius: 4px;
  font-size: 1rem;
  width: 100%;

  &:focus {
    border: 1.25px solid var(--action-color);
  }
`;
