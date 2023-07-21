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
  display: flex;
  align-items: center;
  background-color: var(--main-background-color);
  height: 6rem;
  padding: 0 1rem;
  width: 100vw;

  h1 {
    color: black;
  }
`;
const SpaceLeft = styled.div`
  flex: 1;
  min-width: 5rem;
  max-width: 13rem;
`;

const Title = styled.h1`
  color: var(--secondary-color);
  font-weight: 550;
`;

const SpaceRight = styled.div`
  flex: 1;
  display: flex;
  min-width: 5.5rem;
  max-width: 13rem;
  justify-content: end;
`;
