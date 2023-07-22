import NavigationBar from "../NavigationBar";
import Header from "../Header";
import styled from "styled-components";

export default function Layout({ children, headerProps }) {
  return (
    <GridLayout>
      <HeaderWrapper>
        <Header {...headerProps} />
      </HeaderWrapper>
      <StyledMain>{children}</StyledMain>
      <div>
        <NavigationBar />
      </div>
    </GridLayout>
  );
}
const GridLayout = styled.div`
  display: grid;
  grid-template-rows: 6rem auto 4.5rem;
  width: 100%;
`;

const StyledMain = styled.main`
 padding: 0 1rem;
`;
const HeaderWrapper = styled.div`
 `