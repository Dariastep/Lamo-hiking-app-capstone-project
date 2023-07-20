import styled from "styled-components";

export default function Header({ title, BackButton, Login }) {
  return (
    <HeaderContainer>
      <SpaceLeft>{BackButton && <BackButton />}</SpaceLeft>
      <Title>{title}</Title>
      <SpaceRight>{Login}</SpaceRight>
    </HeaderContainer>
  );
}
const HeaderContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 5;
  width: 100%;
  display: grid;
  padding: 0.2rem 0.5rem;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  justify-items: center;
  background-color: var(--primary-color);
  height: 5rem;

  h1 {
    color: black;
  }
`;
const SpaceLeft = styled.div`
  grid-column: 1;
  justify-self: start;
`;
const Title = styled.h1`
  grid-column: 2;
  color: var(--primary-color);
  font-weight: 550;
`;
const SpaceRight = styled.div`
  grid-column: 3;
  justify-self: end;
`;
