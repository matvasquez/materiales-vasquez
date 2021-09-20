import { DefaultSeo } from "next-seo";
import { Provider } from "react-redux";
import { createStore } from "redux";
// import { persistStore, persistReducer } from "redux-persist";
// import storage from "redux-persist/lib/storage";
// import { PersistGate } from "redux-persist/integration/react";
import { initialState } from "../utils/initialState";
import reducer from "../reducers/index";

import { loadState, saveState } from "../utils/saveLocalStorage";

import Layout from "../components/Layout/index";
import "../styles/GlobalStyles.css";

import { Provider as ProviderNextAuth } from "next-auth/client";

const MyApp = ({ Component, pageProps }) => {
  const initialData = loadState() || initialState;

  const store = createStore(reducer, initialData);
  store.subscribe(() => saveState(store.getState()));

  return (
    <>
      <Provider store={store}>
        <ProviderNextAuth session={pageProps.session}>
          {/* <PersistGate loading={null} persistor={persistor}> */}
          <DefaultSeo
            title="Home Center | Materiales Vasquez Hermanos"
            description="Amplia gama de productos para obra negra, ferretería, muebles, y artículos para el hogar"
            canonical="https://www.materialesvasquezhnos.com.mx/"
            openGraph={{
              url: "https://www.materialesvasquezhnos.com.mx/",
              title: "Home Center | Materiales Vasquez Hermanos",
              description:
                "Amplia gama de productos para obra negra, ferretería, muebles, y artículos para el hogar",
              images: [
                {
                  url: "https://res.cloudinary.com/duibtuerj/image/upload/v1630083340/brand/meta-image_rcclee.jpg",
                  width: 200,
                  height: 200,
                  alt: "Logotipo de Materiales Vasquez Hermanos",
                },
              ],
              site_name: "Materiales Vasquez Hermanos",
            }}
            twitter={{
              handle: "@MaterialesVH",
              site: "@MaterialesVH",
              cardType: "summary",
            }}
            additionalLinkTags={[
              {
                rel: "icon",
                href: "https://res.cloudinary.com/duibtuerj/image/upload/v1630083407/brand/favicon_aowz1n.png",
              },
            ]}
          />
          <Layout>
            <Component {...pageProps} />
          </Layout>
          {/* </PersistGate> */}
        </ProviderNextAuth>
      </Provider>
    </>
  );
};

export default MyApp;
