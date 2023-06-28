import Link from "next/link";
import { useRouter } from "next/router";
import { routesData } from "@/routesData";
import RouteDetails from "@/components/RouteDetails";
import { useEffect } from "react";

export default function Route({isFavorite,onToggleFavorite }) {
  const router = useRouter();
  const { id } = router.query;
  const currentRoute = routesData.find((route) => route.id === id);

  useEffect(() => {
    if (!currentRoute) {
      const timeout = setTimeout(() => {
        router.push("/");
      }, 3000);

      return () => clearTimeout(timeout);
    }
  }, [currentRoute, router]);
  if (!currentRoute) {
    return <h1>This route is not found</h1>;
  }

  const {
    name,
    activity,
    difficulty,
    length,
    altitude,
    description,
    imageUrl,
  } = currentRoute;

  return (
    <RouteDetails
      name={name}
      activity={activity}
      difficulty={difficulty}
      length={length}
      altitude={altitude}
      description={description}
      imageUrl={imageUrl}
      onToggleFavorite={onToggleFavorite}
      isFavorite={isFavorite}
    />
  );
}
