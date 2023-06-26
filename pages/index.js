import RouteList from "@/components/RouteList/index.js";
import { routesData } from "@/routesData";

export default function HomePage() {
  return (
    <div>
      <RouteList routesData={routesData} />
    </div>
  );
}
