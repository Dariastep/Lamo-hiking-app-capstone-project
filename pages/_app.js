import GlobalStyle from "../styles";
import { useState } from "react";

export default function App({ Component, pageProps }) {
  const [isFavorite, setIsFavorite] = useState(false);

  function onToggleFavorite() {
    setIsFavorite(!isFavorite);
    console.log("djdjdjdjd")
  }
  return (
    <>
      <GlobalStyle />
      <Component {...pageProps} onToggleFavorite={onToggleFavorite} isFavorite={isFavorite}/>
    </>
  );
}
