import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
:root {
  --primary-color: #FBFBFB;
  --secondary-color: #008bf8;
  --tercery-color: hsla(0, 0%, 80%, 0.80);
  --active-favorite-button-color: hsla(0, 0%, 90%, 0.80);
}
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
    background: var(--primary-color);
     
  }

  h1 {
  text-align: center;
  font-size: 1.25rem;
  margin: 1rem auto;
  width: 100%;
  }
`;
