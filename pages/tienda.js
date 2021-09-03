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
