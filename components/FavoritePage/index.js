import BackButton from "../BackButton";
import RouteCard from "../RouteCard";
import { ListItem, List } from "../RouteList/RouteList.styled.js";
import { Heading } from "../RouteDetails.js";
import { routesData } from "@/routesData";

export default function FavoritePage() {
  let favoriteRoutes = [];

  if (typeof localStorage !== "undefined") {
    favoriteRoutes = Object.keys(localStorage).filter((key) =>
      key.startsWith("toggleFavoriteRoute-")
    );
  }

  return (
    <>
      <Heading>
        <BackButton />
        <h1>Favorites</h1>
      </Heading>
      <List role="list">
        {favoriteRoutes.length > 0 ? (
          favoriteRoutes.map((key) => {
            const id = key.replace("toggleFavoriteRoute-", "");
            const currentRoute = routesData.find((route) => route.id === id);
            if (!currentRoute) return null;

            return (
              <ListItem key={id} {...currentRoute} id={id}>
                <RouteCard route={currentRoute} />
              </ListItem>
            );
          })
        ) : (
          <ListItem>
            <p>No favorite routes found.</p>
          </ListItem>
        )}
      </List>
    </>
  );
}
