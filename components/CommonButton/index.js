import styled from "styled-components";

export default function CommonButton({
  ButtonName,
  disabled,
  onClick,
  warningButton,
  actionButton,
  icon,
}) {
  return (
    <StyledButton
      type="submit"
      disabled={disabled}
      onClick={onClick}
      warningButton={warningButton}
      actionButton={actionButton}
    >
      {icon && <IconWrapper>{icon}</IconWrapper>}
      {ButtonName}
    </StyledButton>
  );
}

const StyledButton = styled.button`
  cursor: pointer;
  border-radius: 25px;
  border: 1.3px solid
    ${(props) =>
      props.warningButton
        ? "var(--warning-color)"
        : props.actionButton
        ? "var(--action-color)"
        : "var(--secondary-color)"};
  color: ${(props) =>
    props.warningButton
      ? "var(--warning-color)"
      : props.actionButton
      ? "var(--action-color)"
      : "var(--secondary-color)"};
  font-size: 1.1rem;
  background-color: var(--primary-color);
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
