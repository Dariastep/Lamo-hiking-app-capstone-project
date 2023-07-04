import styled from "styled-components";
import Logo from "../Logo/Logo.js";

export default function Header({ title, BackButton }) {
  return (
    <HeaderContainer>
      <SpaceLeft>
        <SpaceLeft>{BackButton && <BackButton />}</SpaceLeft>
      </SpaceLeft>
      <Title>{title}</Title>
      <SpaceRight />
    </HeaderContainer>
  );
}
const HeaderContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 5;
  width: 100%;
  display: flex;
  align-items: end;
  justify-content: space-between;
  flex-direction: row;
  background-color: var(--primary-color);
  height: 4rem;

  h1 {
    color: black;
  }
`;
const SpaceLeft = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: end;
  height: 100%;
`;
const Title = styled.h1`
  margin: 0;
  text-align: center;
  flex: 2;
  color: var(--primary-color);
`;
const SpaceRight = styled.div`
  flex: 1;
`;
