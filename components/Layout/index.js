import NavigationBar from "../NavigationBar";
import Header from "../Header";
import styled from "styled-components";

export default function Layout({ children, headerProps }) {
  return (
    <GridLayout>
      <HeaderWrapper>
        <Header {...headerProps} />
      </HeaderWrapper>
      <MainSection>{children}</MainSection>
      <NavigationBarWrapper>
        <NavigationBar />
      </NavigationBarWrapper>
    </GridLayout>
  );
}
const GridLayout = styled.div`
  display: grid;
  grid-template-rows: 5rem auto 5rem;
`;

const HeaderWrapper = styled.div`
  height: 5rem;
`;

const MainSection = styled.main`
  padding: 1rem;
`;

const NavigationBarWrapper = styled.div`
  height: 5rem;
`;
