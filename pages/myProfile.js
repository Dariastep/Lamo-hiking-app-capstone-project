import BackButton from "@/components/BackButton";
import NavigationBar from "@/components/NavigationBar";
import { Heading } from "../components/RouteDetails/routeDetails.styled";


export default function MyProfile() {
  return (
    <div>
         <Heading>
        <BackButton />
        <h1>My Profile</h1>
      </Heading>
      <NavigationBar />
    </div>
  );
}
