import RouteList from "../components/RouteList/index.js";
import { useState } from "react";
import SearchBar from "../components/SearchBar";
import styled from "styled-components";
import Logo from "../components/Logo/Logo.js";
import useSWR from "swr";
import { toggleFavorite } from "../utils/toggleFavorite.js";
import Loader from "../components/Loader/index.js";
import Login from "../components/Login/index.js";
import { useSession } from "next-auth/react";
import dynamic from "next/dynamic";
import DropdownSearch from "../components/DropdownSearch/index.js";
import Layout from "../components/Layout/index.js";
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

  function handleSearch(event) {
    const query = event.target.value;
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

  const headerProps = { title: <Logo />, Login: <Login session={session} /> };

  return (
    <Layout headerProps={headerProps}>
      <SearchBar
        searchQuery={searchQuery}
        handleSearch={handleSearch}
        searchResults={searchResults}
      />
      <MapWrapper>
        <LeafletMap />{" "}
      </MapWrapper>

      <DropdownSearch />
      <RouteList
        routesData={routesData}
        toggleFavorite={toggleFavorite}
        searchQuery={searchQuery}
        searchResults={searchResults}
      />
    </Layout>
  );
}

const MapWrapper = styled.div`
  display: grid;
  flex-direction: column;
  margin: 4rem 2rem;
  justify-content: center;
  align-items: center;
`;
