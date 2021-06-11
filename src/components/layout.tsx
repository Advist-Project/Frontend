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
        { title
          ? <title>{title} | {APP_NAME}</title>
          : <title>업계 일잘러 선배들의 1:1 코칭, {APP_NAME}</title>
        }
        { title
          ? <meta property="og:title" content={title} />
          : <meta property="og:title" content={`업계 일잘러 선배들의 1:1 코칭, ${APP_NAME}`} />
        }
        <meta property="og:image" content="/mainThumb.png" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
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
