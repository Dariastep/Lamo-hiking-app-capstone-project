import BackButton from "@/components/BackButton";
import NavigationBar from "@/components/NavigationBar";
import Header from "@/components/Header";


export default function MyProfile() {
  return (
    <div>
      <Header title="My Profile" BackButton={BackButton}/>
        <BackButton />
      <NavigationBar />
    </div>
  );
}
