import RouteList from "../components/RouteList/index.js";
import { useState } from "react";
import SearchBar from "../components/SearchBar";
import styled from "styled-components";
import Header from "../components/Header/index.js";
import Logo from "../components/Logo/Logo.js";
import useSWR from "swr";
import { toggleFavorite } from "../utils/toggleFavorite.js";
import Loader from "../components/Loader/index.js";
import Login from "../components/Login/index.js";
import { useSession } from "next-auth/react";
import dynamic from "next/dynamic";
import DropdownSearch from "../components/DropdownSearch/index.js";
// Import Leaflet and react-leaflet components dynamically
const LeafletMap = dynamic(() => import("../components/LeafletMap"), {
  ssr: false, // Disable server-side rendering
});

export default function HomePage() {
  const { data: routesData, error } = useSWR("/api/routes", {
    fallbackData: [],
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const { data: session } = useSession();
  function handleSearch(query) {
    setSearchQuery(query);
    const results = routesData.filter((route) =>
      route.name.toLowerCase().includes(query.toLowerCase())
    );
    setSearchResults(results);
  }

  if (!routesData) {
    return <Loader />; // Render the loader component while data is being fetched
  } else if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <>
      <HeaderWrapper>
        <Header title={<Logo />} Login={<Login session={session} />} />
      </HeaderWrapper>

      <SearchBarWrapper>
        <SearchBar
          searchQuery={searchQuery}
          handleSearch={handleSearch}
          searchResults={searchResults}
        />
      </SearchBarWrapper>
      <MainSection>
        <LeafletMap />
        <DropdownSearch />

        <RouteList
          routesData={routesData}
          toggleFavorite={toggleFavorite}
          searchQuery={searchQuery}
          searchResults={searchResults}
        />
      </MainSection>
    </>
  );
}

const HeaderWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 5;

`;

const SearchBarWrapper = styled.div`
  width: 100%;
  padding: 2rem;
  background-color: var(--primary-color);
  position: relative;
  z-index: 4;
`;

const MainSection = styled.div`
 /*  margin-top: 6rem;  */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
