import { useRouter } from "next/router";
import RouteDetails from "../../../components/RouteDetails/index.js";
import useSWR from "swr";
import Loader from "../../../components/Loader/index.js";
import Header from "../../../components/Header/index.js";
import BackButton from "../../../components/BackButton/index.js";
import { useSession } from "next-auth/react";
import Login from "../../../components/Login/index.js";
import styled from "styled-components";

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
    createdBy
  } = route;

  return (
    <>
      <Header
        title={name}
        BackButton={BackButton}
        Login={<Login session={session} />}
      />
      <MainSection>
        <RouteDetails
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
        />{" "}
      </MainSection>
    </>
  );
}

const MainSection = styled.div`
  margin-top: 6rem;
  display: flex;
  flex-direction: column;
`;
