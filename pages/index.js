import React from "react";
import Head from "next/head";
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

export async function getServerSideProps() {
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
        <meta
          name="viewport"
          content="initial-scale=1.0, width=device-width user-scalable=no"
        />

        <meta
          name="description"
          content="Amplia gama de productos para obra negra, ferretería, muebles, y artículos para el hogar"
          key="descriptionIndex"
        />

        {/* Facebook */}
        <meta property="og:type" content="business.business" />
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
        <meta
          property="business:contact_data:street_address"
          content="Lázaro Cárdenas"
        />
        <meta property="business:contact_data:locality" content="Xalapa" />
        <meta property="business:contact_data:region" content="Veracruz" />
        <meta property="business:contact_data:postal_code" content="91180" />
        <meta property="business:contact_data:country_name" content="Mexico" />

        {/* twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Home Center | Materiales Vasquez Hermanos"
        />
        <meta
          name="twitter:description"
          content="Amplia gama de productos para obra negra, ferretería, muebles, y artículos para el hogar"
        />
        <meta
          name="twitter:image"
          content="https://res.cloudinary.com/duibtuerj/image/upload/v1630083340/brand/meta-image_rcclee.jpg"
        />

        {/* <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "HomeGoodsStore",
              address: {
                "@type": "PostalAddress",
                addressLocality: "Xalapa, Veracruz, México",
                addressRegion: "MEX",
                postalCode: "91180",
                streetAddress: "Lázaro Cárdenas 274",
              },
              aggregateRating: {
                "@type": "AggregateRating",
                ratingValue: "4",
                reviewCount: "250",
              },
              name: "Materiales Vasquez Hermanos",
              description:
                "Amplia gama de productos para obra negra, ferretería, muebles, y artículos para el hogar.",
              openingHours: ["Mo-Sa 08:00-19:30", "Sa 08:00-15:00"],
              priceRange: "$1, $15000",
              currenciesAccepted: "MXN",
              paymentAccepted: "Cash, Credit Card",
              telephone: "(228) 840-1919",
              email: "mailto:ventas.sucursal@grupovasquez.com.mx",
              url: "https://www.materialesvasquezhnos.com.mx/",
            }),
          }}
        /> */}

        <title>Home Center | Materiales Vasquez Hermanos</title>
      </Head>

      <main className={styles.MainStyle}>
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
