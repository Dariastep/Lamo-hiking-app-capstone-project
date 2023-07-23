import styled from "styled-components";

export default function Button({
  ButtonName,
  isDisabled,
  onClick,
  isWarningButton,
  isSecondaryButton,

  icon,
}) {
  return (
    <StyledButton
      type="submit"
      isDisabled={isDisabled}
      onClick={onClick}
      isWarningButton={isWarningButton}
      isSecondaryButton={isSecondaryButton}
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
    props.isSecondaryButton ? "var(--primary-color)" : "white"};
  border: 1.3px solid
    ${(props) =>
      props.isWarningButton ? "var(--warning-color)" : "var(--primary-color)"};

  font-size: 1.1rem;
  background-color: ${(props) =>
    props.isWarningButton
      ? "var(--warning-color)"
      : props.isSecondaryButton
      ? "white"
      : "var(--primary-color)"};

  padding: 0.5rem 0.7rem;
  max-width: 9rem;
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
