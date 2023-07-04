import Header from "@/components/Header/index.js";
import FavoritePage from "../components/FavoritePage/index.js";
import BackButton from "@/components/BackButton/index.js";


export default function Favorites() {

  return (
    <>
      <Header title="Favorites" BackButton={BackButton} />
      <FavoritePage />
      </>
    
  );
}
