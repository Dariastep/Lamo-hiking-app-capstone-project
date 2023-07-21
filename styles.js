import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
@import url('https://fonts.googleapis.com/css2?family=Manrope:wght@400;500&display=swap');
:root {

  --primary-color: #0496FF; //brand color, blue
  --secondary-color: #0079D0; //accent-color, dark blue
  --main-background-color: #FDFDFD; // whiteysh
  --main-text-color: #010638; //dark grey
  --warning-color: #cc2936;
  --success-color:#136f63;
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
    color: var(--main-text-color);
    background: var(--main-background-color);
    overflow-y: scroll; 

    // ---------nessessary, that <div id="__next" doesnt't have a fixed form"
    display: flex; 
    min-height: 100vh;
    }

  #__next {
  flex: 1 1 auto;
  }
// ------
  h1 {
  text-align: center;
  font-size: 1.25rem;
  margin: 1rem auto;
  width: 100%;
  font-weight: 500;
  }
`;
