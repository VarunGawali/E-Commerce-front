'use client'

import { Inter } from "next/font/google";
import GlobalStyles from "./globalStyles";
import { ThemeProvider } from "styled-components";
import theme from "./theme";
import { CartContextProvider } from "@/components/CartContext";
import ErrorBoundary from "@/components/ErrorBoundary";

const inter = Inter({ subsets: ["latin"] });


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ErrorBoundary>
        <ThemeProvider theme={theme}>
          <GlobalStyles />
          <CartContextProvider>
          {children}
          </CartContextProvider>
        </ThemeProvider>
        </ErrorBoundary>
      </body>
    </html>
  );
}
