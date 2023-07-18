import { useRouter } from "next/router";
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

  const { data, isLoading, error } = useSWR(
    isReady && id ? `/api/routes/${id}` : null
  );
  if (isLoading || error || !isReady || !id) return <Loader />;

  return (
    <>
      <Header
        title={data.name}
        BackButton={BackButton}
        Login={<Login session={session} />}
      />
      <MainSection>
        <RouteForm formName={"edit-route"} data={data} id={id} />
      </MainSection>
    </>
  );
}

const MainSection = styled.div`
  margin-top: 6rem;
  display: flex;
  flex-direction: column;
`;
