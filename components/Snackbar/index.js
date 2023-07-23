import styled, { keyframes } from "styled-components";
import { useState, useEffect } from "react";

export default function Snackbar({ type, message }) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
    }, 3000); // Hide the Snackbar after 3 seconds

    return () => clearTimeout(timer);
  }, []);

  return (
    <SnackbarWrapper type={type} visible={visible}>
      {message}
    </SnackbarWrapper>
  );
}

const slideIn = keyframes`
  from {
    transform: translateX(100%);
  }
  to {
    transform: translateX(0);
  }
`;

const slideOut = keyframes`
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(100%);
  }
`;

const SnackbarWrapper = styled.div`
  position: fixed;
  right: 0;
  top: 6rem;
  text-align: right;
  height: 2.5rem;
  background-color: ${(props) =>
    props.type === "success" ? "var(--success-color)" : "var(--warning-color)"};
  color: white;
  width: 70%;
  padding: 0.5rem 1rem;
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
  overflow: hidden;
  opacity: ${(props) => (props.visible ? 1 : 0)};
  transform: translateX(${(props) => (props.visible ? "0" : "100%")});
  animation: ${(props) => (props.visible ? slideIn : slideOut)} 0.3s
    ease-in-out;
`;