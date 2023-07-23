import Header from "../components/Header/index.js";
import BackButton from "../components/BackButton/index.js";
import RouteForm from "../components/RouteForm";
import Login from "../components/Login";
import { useSession } from "next-auth/react";
import NonAuthorizedUser from "../components/NonAuthorizedUser";
import Layout from "../components/Layout/index.js";

export default function CreateRoutePage() {
  const { data: session } = useSession();

  const headerProps = {
    title: "New Route",
    BackButton: BackButton,
    Login: <Login session={session} />,
  };
  return (
    <Layout headerProps={headerProps}>
      {" "}
      {session ? (
        <RouteForm formName="create-route" />
      ) : (
        <>
          <NonAuthorizedUser />
        </>
      )}
    </Layout>
  );
}
