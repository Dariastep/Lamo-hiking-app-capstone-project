import styled from "styled-components";
import Header from "../components/Header/index.js";
import BackButton from "../components/BackButton/index.js";
import RouteForm from "../components/RouteForm";
import Login from "../components/Login";
import { useSession } from "next-auth/react";
import NonAuthorizedUser from "../components/NonAuthorizedUser";
import Loader from "../components/Loader/index.js";
import useSWR from "swr";

export default function CreateRoutePage() {
  const { data: session } = useSession();

  return (
    <>
      <Header
        title="New Route"
        BackButton={BackButton}
        Login={<Login session={session} />}
      />
      <MainSection>
        {session ? (
          <RouteForm formName="create-route" />
        ) : (
          <>
            <NonAuthorizedUser />
          </>
        )}
      </MainSection>
    </>
  );
}

const MainSection = styled.div`
  margin-top: 6rem;
  display: flex;
  flex-direction: column;
`;
