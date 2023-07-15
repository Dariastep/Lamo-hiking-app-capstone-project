import Loader from "../Loader";
import RouteCard from "../RouteCard";
import { List, ListItem } from "../RouteList/RouteList.styled";
import useSWR from "swr";

export default function RoutesPage() {
  const { data: myRoutes, error } = useSWR("/api/routes", fetchRoutes);

  async function fetchRoutes() {
    const response = await fetch("/api/routes");
    const data = await response.json();
    return data.reverse();
  }

  if (!myRoutes) {
    return <Loader />; // Render the loader component while data is being fetched
  }
  if (error) {
    console.error("Failed to fetch my routes", error);
  }
  return (
    <>
      {myRoutes && myRoutes.length > 0 && (
        <List role="list">
          {myRoutes.map((route) => (
            <ListItem key={route._id}>
              <RouteCard route={route} id={route._id} />
            </ListItem>
          ))}
        </List>
      )}
    </>
  );
}
