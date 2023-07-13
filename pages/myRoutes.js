import Header from "../components/Header/index.js";
import BackButton from "../components/BackButton/index.js";
import styled from "styled-components";
import CommonButton from "../components/CommonButton/index.js";
import RoutesPage from "../components/RoutesPage/index.js";

export default function MyRoutes() {
  return (
    <>
      <Header title="My Routes" BackButton={BackButton} />
      <MainSection>
        <RoutesPage />
        <CommonButton ButtonName="Create a new route" />
      </MainSection>
    </>
  );
}
const MainSection = styled.div`
  margin-top: 6rem;
  display: flex;
  flex-direction: column;
`;
