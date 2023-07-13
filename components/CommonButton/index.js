import styled from "styled-components";

export default function CommonButton({ ButtonName }) {
  return <StyledButton>{ButtonName}</StyledButton>;
}

const StyledButton = styled.button`
  cursor: pointer;
  border-radius: 5px;
  background-color: var(--secondary-color);
  color: var(--primary-color);
  font-size: 1.1rem;
  margin: 1.5rem 1rem;
  border: 1px var(--secondary-color);
  padding: 0.5rem 1rem;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  &:hover {
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  }
`;
