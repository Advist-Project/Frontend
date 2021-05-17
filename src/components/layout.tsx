import Head from "next/head";
import { APP_NAME } from "common/constants";
import { Header } from "components/header";
import { Footer } from "components/footer";

interface ILayoutProps {
  title?: string;
  noFooter?: boolean;
}

export const Layout: React.FC<ILayoutProps> = ({ children, title, noFooter}) => {
  return (
    <>
      <Head>
        <title>
        { title ?
          `${title} | ${APP_NAME}`
          : APP_NAME
        }  
        </title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <Header />
      <>{children}</>
      {
        noFooter?
        null :
        <Footer />
      }
    </>
  );
};
