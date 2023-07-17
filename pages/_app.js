
import GlobalStyle from "../styles.js";
import { SWRConfig } from "swr";
import { SessionProvider } from "next-auth/react";
import NavigationBar from "../components/NavigationBar/index.js";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <SessionProvider session={session}>
      <SWRConfig
        value={{
          fetcher: async (...args) => {
            const response = await fetch(...args);
            if (!response.ok) {
              throw new Error(`Request with ${JSON.stringify(args)} failed.`);
            }
            return await response.json();
          },
        }}
      >
        <GlobalStyle />
        <Component {...pageProps} />
        <NavigationBar />
      </SWRConfig>
    </SessionProvider>
  );
}
