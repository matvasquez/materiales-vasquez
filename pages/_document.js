// import Document, { Html, Head, Main, NextScript } from "next/document";

// class MyDocument extends Document {
//   static async getInitialProps(ctx) {
//     const initialProps = await Document.getInitialProps(ctx);
//     return { ...initialProps };
//   }

//   render() {
//     return (
//       <Html>
//         <Head />
//         <body>
//           <Main />
//           <NextScript />
//         </body>
//       </Html>
//     );
//   }
// }

export default MyDocument;

// /* eslint-disable @next/next/no-sync-scripts */
// // https://gitmemory.com/issue/zeit/next.js/9794/567911944
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
  //       <Head>
  //         <meta httpEquiv="X-UA-Compatible" content="IE=edge" />

  //         <link rel="preconnect" href="https://fonts.googleapis.com" />
  //         <link rel="preconnect" href="https://fonts.gstatic.com" />
  //         <link
  //           href="https://fonts.googleapis.com/css2?family=Roboto:wght@100;300;400;500;700;900&display=swap"
  //           rel="stylesheet"
  //         />
  //         <link
  //           href="https://fonts.googleapis.com/css2?family=Archivo+Narrow&display=swap"
  //           rel="stylesheet"
  //         />
  //         <link
  //           href="https://fonts.googleapis.com/css2?family=Share+Tech+Mono&display=swap"
  //           rel="stylesheet"
  //         />
  //         <link
  //           rel="icon"
  //           href="https://res.cloudinary.com/duibtuerj/image/upload/v1630083407/brand/favicon_aowz1n.png"
  //           type="image/x-icon"
  //         ></link>

  //         <meta property="og:type" content="website" />
  //         <meta
  //           key="og:title"
  //           property="og:title"
  //           content="Home Center | Materiales Vasquez Hermanos"
  //         />
  //         <meta
  //           key="og:url"
  //           property="og:url"
  //           content="https://www.materialesvasquezhnos.com.mx/"
  //         />
  //         <meta
  //           property="og:image"
  //           content="https://res.cloudinary.com/duibtuerj/image/upload/v1630083340/brand/meta-image_rcclee.jpg"
  //         />
  //         <meta
  //           key="og:description"
  //           property="og:description"
  //           content="Amplia gama de productos para obra negra, ferretería, muebles, y artículos para el hogar"
  //         />
  //         <meta name="twitter:card" content="summary" />
  //         <meta
  //           key="twitter:title"
  //           name="twitter:title"
  //           content="Home Center | Materiales Vasquez Hermanos"
  //         />
  //         <meta name="twitter:site" content="@MaterialesVH" />
  //         <meta
  //           key="twitter:description"
  //           name="twitter:description"
  //           content="Amplia gama de productos para obra negra, ferretería, muebles, y artículos para el hogar"
  //         />
  //         <meta
  //           name="twitter:image"
  //           content="https://res.cloudinary.com/duibtuerj/image/upload/v1630083340/brand/meta-image_rcclee.jpg"
  //         />
  //         <meta
  //           name="twitter:image:alt"
  //           content="Logotipo de Materiales Vasquez Hermanos"
  //         />
  //       </Head>
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
