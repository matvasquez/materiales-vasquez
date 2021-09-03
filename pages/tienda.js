import React, { useState, useEffect } from "react";
import Head from "next/head";
import fetch from "isomorphic-unfetch";
import { connect } from "react-redux";

//Actions
import { setItemsLoaded } from "../actions";

// Components
import ArticlesSection from "../components/Articles-Section/index";

// Styles
import styles from "../styles/components/Main.module.css";

export async function getStaticProps() {
  const responseSection = await fetch(
    `https://api-vasquez.herokuapp.com/api/new-products?first=1&last=20`
  );
  const { data: newProducts } = await responseSection.json();

  return {
    props: {
      newProducts,
      title: "Tienda | Materiales Vasquez Hermanos",
      description:
        "Amplia gama de productos para obra negra, ferretería, muebles, y artículos para el hogar.",
      image:
        "https://res.cloudinary.com/duibtuerj/image/upload/v1630083340/brand/meta-image_rcclee.jpg",
      ogurl: "https://www.materialesvasquezhnos.com.mx",
    }, // se pasarán al componente de la página como props
  };
}

const HomePage = (props) => {
  const {
    newProducts,
    title,
    description,
    image,
    ogurl,
    itemsLoaded,
    setItemsLoaded,
  } = props;

  useEffect(() => {
    setItemsLoaded(newProducts);
  }, [newProducts]);

  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="initial-scale=1.0, width=device-width user-scalable=no"
        />

        <meta name="description" content={description} key="descriptionIndex" />

        {/* Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content={title} key="og:titleIndex" />
        <meta
          property="og:description"
          content={description}
          key="og:descriptionIndex"
        />
        <meta property="og:image" content={image} key="og:imageIndex" />
        <meta property="og:url" content={ogurl} key="og:urlIndex" />

        {/* twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} key="twitter:titleIndex" />
        <meta
          name="twitter:description"
          content={description}
          key="twitter:descriptionIndex"
        />
        <meta name="twitter:image" content={image} index="twitter:imageIndex" />

        <script
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
        />

        <title>{title}</title>
      </Head>

      <main className={styles.MainStyle}>
        {newProducts && (
          <ArticlesSection title="Tienda" products={itemsLoaded} route={true} />
        )}
      </main>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    itemsLoaded: state.itemsLoaded,
  };
};

const mapDispatchToProps = {
  setItemsLoaded,
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
