import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
@import url('https://fonts.googleapis.com/css2?family=Manrope:wght@400;500&display=swap');
:root {
  --primary-color: #FDFDFD;
  --secondary-color: #0496ff;
  --tercery-color: hsla(0, 0%, 80%, 0.80);
  --active-favorite-button-color: hsla(0, 0%, 90%, 0.80);
  --action-color: #ff6700;
  --main-text-color:#393838; 
  --warning-color: #CE6D7F;
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
    font-family: 'Manrope', sans-serif;
    background: var(--primary-color);
    overflow-y: scroll;
     
  }

  h1 {
  text-align: center;
  font-size: 1.25rem;
  margin: 1rem auto;
  width: 100%;
  font-weight: 500;
  }
`;
