import styled from "styled-components";

export default function CommonButton({
  ButtonName,
  isDisabled,
  onClick,
  warningButton,
  secondaryButton,
  icon,
}) {
  return (
    <StyledButton
      type="submit"
      isDisabled={isDisabled}
      onClick={onClick}
      warningButton={warningButton}
      secondaryButton={secondaryButton}
    >
      {icon && <IconWrapper>{icon}</IconWrapper>}
      {ButtonName}
    </StyledButton>
  );
}

const StyledButton = styled.button`
  cursor: pointer;
  border-radius: 10px;
  color: ${(props) =>
   props.secondaryButton ? "var(--primary-color)" : "white"};
  border: 1.3px solid
    ${(props) =>
      props.warningButton ? "var(--warning-color)" : "var(--primary-color)"};

  font-size: 1.1rem;
  background-color: ${(props) =>
    props.warningButton
      ? "var(--warning-color)"
      : props.secondaryButton
      ? "white"
      : "var(--primary-color)"};
  margin: 1.5rem 1rem;
  padding: 0.5rem 1rem;
  max-width: 13rem;
  min-width: 5rem;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;

  &:hover {
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  }

  ${(props) =>
    props.disabled &&
    `opacity: 1;
    cursor: pointer;
  `}
`;
const IconWrapper = styled.div`
  display: inline-block;
  margin-right: 0.5rem;
  vertical-align: middle;
`;