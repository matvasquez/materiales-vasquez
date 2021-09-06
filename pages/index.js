import React from "react";
import Head from "next/head";
import { NextSeo, LocalBusinessJsonLd } from "next-seo";
import fetch from "isomorphic-unfetch";
import { connect } from "react-redux";

// Components
import Slider from "../components/Slider/Slider";
import ArticlesLiked from "../components/Articles-Liked/ArticlesLiked";
import ArticlesSection from "../components/Articles-Section/index";
import Brands from "../components/Brands/Brands";

// Styles
import styles from "../styles/components/Main.module.css";

// Globales
const first_section = "LAMPARA";
const second_section = "200";

export async function getStaticProps() {
  const response = await fetch(
    `https://api-vasquez.herokuapp.com/api/new-products`
  );
  const { data: newProducts } = await response.json();

  const responseSection = await fetch(
    `https://api-vasquez.herokuapp.com/api/products-by-name/${first_section}?first=1&last=8`
  );
  const { data: productsByName } = await responseSection.json();

  const responseSectionPrice = await fetch(
    `https://api-vasquez.herokuapp.com/api/products-by-price/${second_section}?first=1&last=8`
  );
  const { data: productsByPrice } = await responseSectionPrice.json();

  return {
    props: {
      newProducts,
      productsByName,
      productsByPrice,
    }, // se pasarán al componente de la página como props
  };
}

const HomePage = (props) => {
  const {
    newProducts,
    productsByName,
    productsByPrice,

    itemsIliked,
  } = props;

  return (
    <>
      <Head>
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Roboto:wght@100;300;400;500;700;900&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Archivo+Narrow&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Share+Tech+Mono&display=swap"
          rel="stylesheet"
        />
        <link
          rel="icon"
          href="https://res.cloudinary.com/duibtuerj/image/upload/v1630083407/brand/favicon_aowz1n.png"
          type="image/x-icon"
        ></link>

        <meta property="og:type" content="website" />
        <meta
          property="og:title"
          content="Home Center | Materiales Vasquez Hermanos"
        />
        <meta
          property="og:url"
          content="https://www.materialesvasquezhnos.com.mx/"
        />
        <meta
          property="og:image"
          content="https://res.cloudinary.com/duibtuerj/image/upload/v1630083340/brand/meta-image_rcclee.jpg"
        />
        <meta
          property="og:description"
          content="Amplia gama de productos para obra negra, ferretería, muebles, y artículos para el hogar"
        />
        <meta name="twitter:card" content="summary" />
        <meta
          name="twitter:title"
          content="Home Center | Materiales Vasquez Hermanos"
        />
        <meta name="twitter:site" content="@MaterialesVH" />
        <meta
          name="twitter:description"
          content="Amplia gama de productos para obra negra, ferretería, muebles, y artículos para el hogar"
        />
        <meta
          name="twitter:image"
          content="https://res.cloudinary.com/duibtuerj/image/upload/v1630083340/brand/meta-image_rcclee.jpg"
        />
        <meta
          name="twitter:image:alt"
          content="Logotipo de Materiales Vasquez Hermanos"
        />
      </Head>

      {/* <NextSeo
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
      /> */}
      <LocalBusinessJsonLd
        type="HomeGoodsStore"
        name="Materiales Vasquez Hermanos"
        description="Amplia gama de productos para obra negra, ferretería, muebles, y artículos para el hogar"
        url="https://www.materialesvasquezhnos.com.mx/"
        telephone="+522288401919"
        address={{
          streetAddress: "Lázaro Cárdenas 274",
          addressLocality: "Xalapa",
          addressRegion: "MEX",
          postalCode: "91180",
          addressCountry: "MX",
        }}
      />

      <main className={styles.MainHome}>
        <Slider />
        {itemsIliked.length > 0 && (
          <ArticlesLiked
            key={"Productos que te gustan"}
            title="Productos que te gustan"
            articles={itemsIliked}
          />
        )}
        {newProducts && (
          <ArticlesSection title="Productos Nuevos" products={newProducts} />
        )}
        {productsByName && (
          <ArticlesSection title={`lámparas`} products={productsByName} />
        )}
        {productsByPrice && (
          <ArticlesSection
            title={`Menos de ${second_section.toLowerCase()}`}
            products={productsByPrice}
          />
        )}
        <Brands />
      </main>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    itemsIliked: state.itemsIliked,
    itemsLoaded: state.itemsLoaded,
  };
};

export default connect(mapStateToProps, null)(HomePage);
