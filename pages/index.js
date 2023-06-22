import RouteList from "@/components/RouteList/RouteList";
import { routesData } from "@/routesData";

export default function HomePage() {
  return (
    <div>
      <RouteList routesData={routesData} />
    </div>
  );
}
