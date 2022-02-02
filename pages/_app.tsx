import "../styles/globals.css";

import { useRef } from "react";
import { QueryClient, QueryClientProvider, Hydrate } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { ConfigProvider } from "antd";
import { Provider as JotaiProvider } from "jotai";

import { isDev } from "utils/env";
import { queryClientConfig, antGlobalConfig } from "config";

import type { AppProps } from "next/app";

interface Props {
  dehydratedState: InstanceType<typeof QueryClient>;
}

function App({ Component, pageProps }: AppProps<Props>) {
  const queryClient = useRef<InstanceType<typeof QueryClient>>(
    new QueryClient(queryClientConfig)
  );

  return (
    <JotaiProvider>
      <QueryClientProvider client={queryClient.current}>
        <Hydrate state={pageProps.dehydratedState}>
          <ConfigProvider {...antGlobalConfig}>
            <div>
              <Component {...pageProps} />
            </div>
          </ConfigProvider>
        </Hydrate>
        {isDev && <ReactQueryDevtools initialIsOpen={false} />}
      </QueryClientProvider>
    </JotaiProvider>
  );
}

export default App;
