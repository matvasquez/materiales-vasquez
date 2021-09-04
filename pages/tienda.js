import React, { useState, useEffect } from "react";
import Head from "next/head";
import fetch from "isomorphic-unfetch";
import { connect } from "react-redux";

//Actions
import { setItemsLoaded, setResetItemsLoaded } from "../actions";

// Components
import ArticlesSection from "../components/Articles-Section/index";
import Filter from "../components/Filters/Filters";

// Styles
import styles from "../styles/components/Main.module.css";

// Styled-Components
import { ClearFilters } from "../styles/tiendas/style";

export async function getServerSideProps(context) {
  const responseSection = await fetch(
    `https://api-vasquez.herokuapp.com/api/new-products?first=1&last=20`
  );
  const { data: newProducts } = await responseSection.json();

  const responseBrands = await fetch(
    `https://api-vasquez.herokuapp.com/api/brands-tienda`
  );
  const { brands } = await responseBrands.json();

  const responseCategories = await fetch(
    `https://api-vasquez.herokuapp.com/api/categories/all-categories`
  );
  const { data: categories } = await responseCategories.json();

  return {
    props: {
      newProducts,
      brands,
      categories,
    }, // se pasarán al componente de la página como props
  };
}

const Store = (props) => {
  const {
    newProducts,
    brands,
    categories,
    itemsLoaded,
    setItemsLoaded,
    setResetItemsLoaded,
  } = props;

  const [openFilters, setOpenFilters] = useState(false);
  const [seeking, setSeeking] = useState(false);
  const [routeWithFilters, setRouteWithFilters] = useState(false);

  const handleOpenFilters = () => {
    setOpenFilters(!openFilters);
  };

  useEffect(() => {
    setItemsLoaded(newProducts);
  }, [newProducts]);

  const applyFilters = async (minPrice, maxPrice, selectedBrands) => {
    setSeeking(true);
    const brandsQuery = selectedBrands.map((brand) => `'${brand}'`);

    const response = await fetch(
      `https://api-vasquez.herokuapp.com//api/filters/(${brandsQuery.toString()})?categorie=todas&first=${minPrice}&last=${maxPrice}`
    );

    const { data } = await response.json();

    if (data) {
      console.log("setResetItemsLoaded");
      setResetItemsLoaded();
      setItemsLoaded(data);
      setSeeking(false);
      handleOpenFilters();
      setRouteWithFilters(true);
    }
  };

  const beforeFiltering = () => {
    setResetItemsLoaded();
    setItemsLoaded(newProducts);
    setOpenFilters(false);
  };

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

        <title>Tienda | Materiales Vasquez Hermanos</title>
      </Head>

      <main className={styles.MainStyle}>
        <Filter
          brands={brands}
          categories={categories}
          isOpen={openFilters}
          handleOpenFilters={handleOpenFilters}
          applyFilters={applyFilters}
          seeking={seeking}
          setRouteWithFilters={setRouteWithFilters}
          beforeFiltering={beforeFiltering}
        />
        {itemsLoaded.length > 0 && (
          <ArticlesSection
            title="Tienda"
            products={itemsLoaded}
            route={true}
            routeWithFilters={routeWithFilters}
            handleOpenFilters={handleOpenFilters}
          />
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
  setResetItemsLoaded,
};

export default connect(mapStateToProps, mapDispatchToProps)(Store);
