import { useRouter } from "next/router";
import RouteDetails from "../../../components/RouteDetails/index.js";
import useSWR from "swr";
import Loader from "../../../components/Loader/index.js";

export default function Route() {
  const router = useRouter();
  const { isReady } = router;
  const { id } = router.query;

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
  } = route;

  return (
    <RouteDetails
      name={name}
      activity={activity}
      difficulty={difficulty}
      length={length}
      altitude={altitude}
      description={description}
      imageUrl={imageUrl}
      id={id}
    />
  );
}
