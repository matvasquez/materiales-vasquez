// import App from 'next/app'
import { Provider } from "react-redux";
import { createStore } from "redux";
import { initialState } from "../utils/initialState";
import reducer from "../reducers/index";

import { ThemeProvider } from "styled-components";
import { GlobalStyles, theme } from "../styles/GlobalStyles";
import Layout from "../components/Layout";

import { Provider as ProviderNextAuth } from "next-auth/client";

const MyApp = ({ Component, pageProps }) => {
  const store = createStore(reducer, initialState);

  return (
    <>
      <Provider store={store}>
        <ProviderNextAuth session={pageProps.session}>
          <GlobalStyles />
          <ThemeProvider theme={theme}>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </ThemeProvider>
        </ProviderNextAuth>
      </Provider>
    </>
  );
};

export default MyApp;
