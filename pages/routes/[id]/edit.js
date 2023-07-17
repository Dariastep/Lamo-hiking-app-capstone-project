import { useRouter } from "next/router";
import RouteDetails from "../../../components/RouteDetails/index.js";
import useSWR from "swr";
import Loader from "../../../components/Loader/index.js";
import Header from "../../../components/Header/index.js";
import BackButton from "../../../components/BackButton/index.js";
import { useSession } from "next-auth/react";
import Login from "../../../components/Login/index.js";
import styled from "styled-components";
import RouteForm from "../../../components/RouteForm/index.js";

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

  
async function editRoute(route) {
    const response = await fetch(`/api/routes/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(route),
      });
      if (response.ok) {
        await response.json();
        router.push(`/routes/${id}`);
      }
    }

  return (
    <>
      <Header
        title={route.name}
        BackButton={BackButton}
        Login={<Login session={session} />}
      />
      <MainSection>
        <RouteForm session={session} onSubmit = {editRoute} formName={"edit-route"} defaultData={route}/>
      </MainSection>
    </>
  );
}

const MainSection = styled.div`
  margin-top: 6rem;
  display: flex;
  flex-direction: column;
`;
