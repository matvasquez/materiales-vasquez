// import App from 'next/app'
import { Provider } from "react-redux";
import { createStore } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { PersistGate } from "redux-persist/integration/react";
import { initialState } from "../utils/initialState";
import reducer from "../reducers/index";

import { ThemeProvider } from "styled-components";
import { GlobalStyles, theme } from "../styles/GlobalStyles";
import Layout from "../components/Layout/index";

import { Provider as ProviderNextAuth } from "next-auth/client";

const MyApp = ({ Component, pageProps }) => {
  // Configuracion de persistReducer, el que guardará en local storage
  const persistConfig = {
    key: "root",
    storage,
    blacklist: ["itemsLoaded"], // No guarda itemsLoaded
  };
  const persistedReducer = persistReducer(persistConfig, reducer);

  const store = createStore(persistedReducer, initialState);

  const persistor = persistStore(store);

  return (
    <>
      <Provider store={store}>
        <ProviderNextAuth session={pageProps.session}>
          <PersistGate loading={null} persistor={persistor}>
            <GlobalStyles />
            <ThemeProvider theme={theme}>
              <Layout>
                <Component {...pageProps} />
              </Layout>
            </ThemeProvider>
          </PersistGate>
        </ProviderNextAuth>
      </Provider>
    </>
  );
};

export default MyApp;
