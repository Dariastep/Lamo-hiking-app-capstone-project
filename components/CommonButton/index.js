import styled from "styled-components";

export default function CommonButton({
  ButtonName,
  disabled,
  onClick,
  warningButton,
  loginButton,
  icon,
}) {
  return (
    <StyledButton
      type="submit"
      disabled={disabled}
      onClick={onClick}
      warningButton={warningButton}
      loginButton={loginButton}
    >
      {icon && <IconWrapper>{icon}</IconWrapper>}
      {ButtonName}
    </StyledButton>
  );
}

const StyledButton = styled.button`
  cursor: pointer;
  border-radius:   ${(props) =>
      props.warningButton || props.loginButton ? "25px" : "10px" };
  border: 1.3px solid
    ${(props) =>
      props.warningButton
        ? "var(--warning-color)"
        : props.loginButton ?
        "var(--secondary-color)" :
        "var(--secondary-color)" };
  color: ${(props) =>
    props.warningButton
      ? "var(--warning-color)"
      : props.loginButton
      ? "var(--secondary-color)" 
      : "var(--primary-color)"};
  font-size: 1.1rem;
  background-color:  ${(props) =>
      props.warningButton ? "var(--primary-color)" :  props.loginButton ? "var(--primary-color)"  :  "var(--secondary-color)"};
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
