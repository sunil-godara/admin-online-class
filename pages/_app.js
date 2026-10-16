import React from "react";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import NextProgress from "nextjs-progressbar";
import theme from "@/theme";
import { SessionProvider } from "next-auth/react";
import ToastNotification from "@/components/common/ToastNotification";
import "@/styles/globals.css";

const App = ({ Component, pageProps }) => {
  return (
    <ThemeProvider theme={theme}>
      <SessionProvider session={pageProps.session} refetchInterval={5 * 60}>
        <CssBaseline />
        <NextProgress
          color="#974826"
          startPosition={0.3}
          stopDelayMs={200}
          height={5}
          showOnShallow={true}
        />
        <ToastNotification />
        <Component {...pageProps} />
      </SessionProvider>
    </ThemeProvider>
  );
};

export default App;
