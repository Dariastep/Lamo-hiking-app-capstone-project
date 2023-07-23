import styled from "styled-components";
import RouteList from "../components/RouteList/index.js";
import SearchBar from "../components/SearchBar";
import Logo from "../components/Logo/Logo.js";
import Loader from "../components/Loader/index.js";
import Login from "../components/Login/index.js";
import Layout from "../components/Layout/index.js";
import useSWR from "swr";
import { toggleFavorite } from "../utils/toggleFavorite.js";
import { useSession } from "next-auth/react";
import { useState } from "react";

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
      <ContentWrapper>
        <SearchBar
          searchQuery={searchQuery}
          handleSearch={handleSearch}
          searchResults={searchResults}
        />
        <RouteList
          routesData={routesData}
          toggleFavorite={toggleFavorite}
          searchQuery={searchQuery}
          searchResults={searchResults}
        />
      </ContentWrapper>
    </Layout>
  );
}

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
