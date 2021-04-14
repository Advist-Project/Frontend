import type { AppProps } from "next/app";
import { Global } from "@emotion/react";
import { reset } from "../styles/reset";
import '../styles/resposiveLayout.css';
import Context from "../context"

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
    <Context>
      <Global styles={reset} />
      <Component {...pageProps} />
    </Context>
    </>
  );
}

export default MyApp
