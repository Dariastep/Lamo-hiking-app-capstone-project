import { useRouter } from "next/router";
import RouteDetails from "../components/RouteDetails/index.js";
import { useEffect } from "react";
import useSWR from "swr";

export default function Route() {
  const router = useRouter();
  const { isReady } = router;
  const { id } = router.query;
  const { data: route, isLoading, error } = useSWR(`/api/routes/${id}`);
  if (!isReady || isLoading || error) return <h2>Loading...</h2>;

  /* const currentRoute = routesData.find((route) => route.id === id); */

/*   async function deleteRoute() {
    const response = await fetch(`/api/routes/${id}`, { method: "DELETE" });
    if (response.ok) {
      await response.json();
      router.push("/");
    } else {
      console.log(response.status);
    }
  } */


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
