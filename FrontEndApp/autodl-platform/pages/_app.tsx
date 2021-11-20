import React from 'react';
import Head from 'next/head';
import { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import { ThemeProvider, Theme, StyledEngineProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

import theme from 'styles/theme';
import { store } from 'app/store';


declare module '@mui/styles/defaultTheme' {
  // eslint-disable-next-line
  interface DefaultTheme extends Theme {}
}


export default function MyApp(props: AppProps) {
  const { Component, pageProps } = props;

  return (
    <Provider store={store}>
      <React.Fragment>
        <Head>
          <title>AutoDL</title>
          <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
        </Head>
        <StyledEngineProvider injectFirst>
          <ThemeProvider theme={theme}>
            {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
            <CssBaseline />
            <Component {...pageProps} />
          </ThemeProvider>
        </StyledEngineProvider>
      </React.Fragment>
    </Provider>
  );
}
