import type { QueryClientConfig } from "react-query";
import type { ConfigProviderProps } from "antd/es/config-provider";
import itIt from "antd/lib/locale/it_IT";

export const queryClientConfig: QueryClientConfig = {
  defaultOptions: {
    queries: {
      retry: false,
      staleTime: 10 * 1000 * 60,
      cacheTime: 10 * 1000 * 60,
      suspense: false,
      refetchOnMount: false,
      retryOnMount: false,
      refetchOnWindowFocus: false,
      refetchOnReconnect: true,
    },
  },
};

export const antGlobalConfig: ConfigProviderProps = {
  componentSize: "middle",
  locale: itIt,
};
