import type { AppProps } from "next/app";
import { Global } from "@emotion/react";
import { reset } from "../styles/reset";
import '../styles/resposiveLayout.css';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Global styles={reset} />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp
