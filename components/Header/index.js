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
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: row;
  background-color: var(--primary-color);
  height: 5rem;

  h1 {
    color: black;
  }
`;
const SpaceLeft = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;
const Title = styled.h1`
  margin: 0;
  text-align: center;
  flex: 2;
  color: var(--primary-color);
  font-weight: 550;
`;
const SpaceRight = styled.div`
  flex: 1;
`;
