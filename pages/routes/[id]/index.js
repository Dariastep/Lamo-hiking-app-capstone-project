import { useRouter } from "next/router";
import RouteDetails from "../../../components/RouteDetails/index.js";
import useSWR from "swr";
import Loader from "../../../components/Loader/index.js";
import Header from "../../../components/Header/index.js";
import BackButton from "../../../components/BackButton/index.js";
import { useSession } from "next-auth/react";
import Login from "../../../components/Login/index.js";
import styled from "styled-components";
import Layout from "../../../components/Layout/index.js";

export default function Route() {
  const router = useRouter();
  const { isReady } = router;
  const { id } = router.query;
  const { data: session } = useSession();

  const {
    data: route,
    isLoading,
    error,
  } = useSWR(isReady && id ? `/api/routes/${id}` : null);
  if (isLoading || error || !isReady || !id) return <Loader />;

  const {
    name,
    activity,
    difficulty,
    length,
    altitude,
    description,
    imageUrl,
    createdBy,
    location,
    lon,
    lat,
  } = route;

  const headerProps = {
    title: name,
    BackButton: BackButton,
    Login: <Login session={session} />,
  };
  return (
    <Layout headerProps={headerProps}>
      <RouteDetails
        data={route}
        name={name}
        activity={activity}
        difficulty={difficulty}
        length={length}
        altitude={altitude}
        description={description}
        imageUrl={imageUrl}
        id={id}
        createdBy={createdBy}
        session={session}
        location={location}
        lon={lon}
        lat={lat}
      />
    </Layout>
  );
}
