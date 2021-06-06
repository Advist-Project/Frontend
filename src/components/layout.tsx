import Head from "next/head";
import { APP_NAME } from "common/constants";
import { Header } from "components/header";
import { Footer } from "components/footer";

interface ILayoutProps {
  title?: string;
  noFooter?: boolean;
  whiteHeader?: boolean;
}

export const Layout: React.FC<ILayoutProps> = ({ children, title, noFooter, whiteHeader}) => {
  return (
    <>
      <Head>
        <title>
        { title ?
          `${title} | ${APP_NAME}`
          : `업계 일잘러 선배들의 1:1 코칭, ${APP_NAME}`
        }  
        </title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <Header white={whiteHeader}/>
      <>{children}</>
      {
        noFooter?
        null :
        <Footer />
      }
    </>
  );
};
