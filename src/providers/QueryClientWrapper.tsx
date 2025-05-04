// QueryClientWrapper.tsx
"use client"; // Isso garante que o componente seja tratado como um componente cliente

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ReactNode } from "react";

const queryClient = new QueryClient();

export default function QueryClientWrapper({ children }: { children: ReactNode }) {

  const isDev = process.env.NODE_ENV === 'development' && !process.env.CI;
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      {/* {isDev && <ReactQueryDevtools initialIsOpen={false} />} */}
     
    </QueryClientProvider>
  );
}
