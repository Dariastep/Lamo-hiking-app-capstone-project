import { useRouter } from "next/router";
import useSWR from "swr";
import Loader from "../../../components/Loader/index.js";
import BackButton from "../../../components/BackButton/index.js";
import { useSession } from "next-auth/react";
import Login from "../../../components/Login/index.js";
import RouteForm from "../../../components/RouteForm/index.js";
import Layout from "../../../components/Layout/index.js";

export default function Route() {
  const router = useRouter();
  const { isReady } = router;
  const { id } = router.query;
  const { data: session } = useSession();

  const { data, isLoading, error } = useSWR(
    isReady && id ? `/api/routes/${id}` : null
  );
  if (isLoading || error || !isReady || !id) return <Loader />;

  const headerProps = {
    title: data.name,
    BackButton: BackButton,
    Login: <Login session={session} />,
  };
  return (
    <Layout headerProps={headerProps}>
      <RouteForm formName={"edit-route"} data={data} id={id} />
    </Layout>
  );
}
