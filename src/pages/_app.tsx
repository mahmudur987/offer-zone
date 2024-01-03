import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import { ManagedUIContext } from "@contexts/ui.context";
import ManagedModal from "@components/common/modal/managed-modal";
import ManagedDrawer from "@components/common/drawer/managed-drawer";
import React, { useEffect, useRef } from "react";
import { DehydratedState, QueryClient, QueryClientProvider } from "react-query";
import { Hydrate } from "react-query/hydration";
import { ToastContainer } from "react-toastify";
// import { ReactQueryDevtools } from 'react-query/devtools';
import { appWithTranslation, SSRConfig } from "next-i18next";
import { DefaultSeo } from "@components/seo/default-seo";

// external
import "react-toastify/dist/ReactToastify.css";

// base css file
import "@assets/css/scrollbar.css";
import "@assets/css/swiper-carousel.css";
import "@assets/css/custom-plugins.css";
import "@assets/css/globals.css";
import { getDirection } from "@utils/get-direction";

type customAppProps = AppProps & {
  Component: AppProps["Component"] & {
    Layout?: React.FC<{ pageProps: any }>;
  };

  pageProps: AppProps["pageProps"] &
    SSRConfig & {
      dehydratedState?: DehydratedState;
    };
};

function Noop({ children }: React.PropsWithChildren) {
  return <>{children}</>;
}

const CustomApp = ({ Component, pageProps }: customAppProps) => {
  const queryClientRef = useRef<QueryClient>();
  if (!queryClientRef.current) {
    queryClientRef.current = new QueryClient();
  }
  const router = useRouter();
  const dir = getDirection(router.locale);
  useEffect(() => {
    document.documentElement.dir = dir;
  }, [dir]);
  const Layout = Component.Layout || Noop;

  return (
    <QueryClientProvider client={queryClientRef.current}>
      <Hydrate state={pageProps.dehydratedState}>
        <ManagedUIContext>
          <>
            <DefaultSeo />
            <Layout pageProps={pageProps}>
              <Component {...pageProps} key={router.route} />
            </Layout>
            <ToastContainer />
            <ManagedModal />
            <ManagedDrawer />
          </>
        </ManagedUIContext>
      </Hydrate>
    </QueryClientProvider>
  );
};

export default appWithTranslation(CustomApp);
