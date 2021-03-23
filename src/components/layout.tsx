import Head from "next/head";
import { APP_NAME } from "common/constants";
import { Header } from "components/header";
import { Footer } from "components/footer";


interface ILayoutProps {
  title?: string;
}

export const Layout: React.FC<ILayoutProps> = ({ children, title }) => {
  return (
    <>
      <Head>
        <title>
          {title} | {APP_NAME}
        </title>
      </Head>
      <Header />
      <>{children}</>
      <Footer />
    </>
  );
};
