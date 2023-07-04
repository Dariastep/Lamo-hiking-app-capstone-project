import SearchBar from "@/components/SearchBar/index.js";
import RouteList from "../components/RouteList/index.js";
import { routesData } from "@/routesData";

export default function HomePage() {
  return (
    <div>
      <SearchBar />
      <RouteList routesData={routesData} />
    </div>
  );
}
