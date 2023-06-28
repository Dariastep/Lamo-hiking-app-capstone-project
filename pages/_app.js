import GlobalStyle from "../styles";
import useLocalStorageState from "use-local-storage-state";

export default function App({ Component, pageProps }) {
  const [isFavorite, setIsFavorite] = useLocalStorageState("isFavorite", {defaultValue: false});

  function onToggleFavorite() {
    setIsFavorite(!isFavorite);
  }
  return (
    <>
      <GlobalStyle />
      <Component {...pageProps} onToggleFavorite={onToggleFavorite} isFavorite={isFavorite}/>
    </>
  );
}
