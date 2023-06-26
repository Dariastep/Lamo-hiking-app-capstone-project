import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
  *,
  *::before,
  *::after {
    box-sizing: border-box;
    margin:0;
    padding: 0;
  }

  body {
    margin: 0;
    font-family: system-ui;
    background: #ffffff;
     
  }

  h1 {
  text-align: center;
  font-size: 1.5rem;
  margin: 1rem auto;
  width: 100%;
  }
`;
