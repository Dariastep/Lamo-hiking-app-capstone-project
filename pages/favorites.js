import Header from "../components/Header/index.js";
import FavoritePage from "../components/FavoritePage/index.js";
import BackButton from "../components/BackButton/index.js"
import styled from "styled-components";

export default function Favorites() {
  return (
    <>
      <Header title="Favorites" BackButton={BackButton} />
      <MainSection>
        <FavoritePage />
      </MainSection>
    </>
  );
}
const MainSection = styled.div`
  margin-top: 6rem;
  display: flex;
  flex-direction: column;
`;
