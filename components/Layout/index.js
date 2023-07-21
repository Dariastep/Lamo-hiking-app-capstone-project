import NavigationBar from "../NavigationBar";
import Header from "../Header";
import styled from "styled-components";

export default function Layout({ children, headerProps }) {
  return (
    <GridLayout>
      <div>
        <Header {...headerProps} />
      </div>
      <main>{children}</main>
      <div>
        <NavigationBar />
      </div>
    </GridLayout>
  );
}
const GridLayout = styled.div`
  display: grid;
  grid-template-rows: 5rem auto 4.5rem;
`;

