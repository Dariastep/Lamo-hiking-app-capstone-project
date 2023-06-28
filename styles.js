import { createGlobalStyle } from "styled-components"; 

export default createGlobalStyle`
:root {
  --primary-color: #FBFBFB;
  --secondary-color: #008bf8;
  --tercery-color: #ccc
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
  font-size: 1.5rem;
  margin: 1rem auto;
  width: 100%;
  }
`;
