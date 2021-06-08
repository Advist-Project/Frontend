import type { AppProps } from "next/app";
import { Global } from "@emotion/react";
import '../styles/SpoqaHanSansNeo.css';
import { reset } from "../styles/reset";
import '../styles/resposiveLayout.css';
import Context from "../context";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

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
