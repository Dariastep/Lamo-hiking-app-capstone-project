import styled from "styled-components";

export default function BackButton() {
  function handleBack() {
    window.history.back();
  }

  return (
    <BackButtonContainer onClick={handleBack}>
      <Back>&larr;</Back>
    </BackButtonContainer>
  );
}
const Back = styled.span`
  display: inline-block;

  color: "black";
  font-size: 1.5rem;
  cursor: pointer;
  transition: 0.3s ease-in-out;
  &:hover {
    background-color: var(--tercery-color);
    border-radius: 30%;
  }
`;

const BackButtonContainer = styled.div`
  cursor: pointer;
`;
