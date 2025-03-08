import type { Metadata } from "next";
import { Urbanist } from 'next/font/google';

import "./globals.css";
import { ThemeProvider } from "@/providers/theme-provider";
import QueryClientWrapper from "@/providers/QueryClientWrapper";
import { Toaster } from "@/components/ui/sonner";

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.APP_URL
      ? `${process.env.APP_URL}`
      : process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : `http://localhost:${process.env.PORT || 3000}`
  ),
  title: "SGAI - Sistema de Gestão de Alugueis de Imóveis",
  description:
    "Sistema de Gestão de Alugueis de Imóveis",
  alternates: {
    canonical: "/"
  },
  
};

const urbanist = Urbanist({ subsets: ['latin'], weight: ['400', '700'] });

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={urbanist.className}>
        <QueryClientWrapper>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            {children}
          </ThemeProvider>
          <Toaster position="top-right" />
        </QueryClientWrapper>
      </body>
    </html>
  );
}
