/* eslint-disable @next/next/no-sync-scripts */
// https://gitmemory.com/issue/zeit/next.js/9794/567911944
import Document, { Html, Head, Main, NextScript } from "next/document";
import { ServerStyleSheet } from "styled-components";

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const sheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App) => (props) =>
            sheet.collectStyles(<App {...props} />),
        });

      const initialProps = await Document.getInitialProps(ctx);

      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        ),
      };
    } finally {
      sheet.seal();
    }
  }

  // render() {
  //   return (
  //     <Html lang="es">
  //       <Head />
  //       <body>
  //         <Main />
  //         <NextScript />
  //         {/* for the search only version */}
  //         <script src="https://cdn.jsdelivr.net/npm/algoliasearch@4.5.1/dist/algoliasearch-lite.umd.js"></script>
  //         {/* for the default version */}
  //         <script src="https://cdn.jsdelivr.net/npm/algoliasearch@4.5.1/dist/algoliasearch.umd.js"></script>
  //       </body>
  //     </Html>
  //   );
  // }
}

export default MyDocument;
