import React, { useState, useEffect } from "react";
import Head from "next/head";
import fetch from "isomorphic-unfetch";
import { connect } from "react-redux";

//Actions
import { setItemsLoaded, setResetItemsLoaded } from "../../actions";

// Components
import ArticlesSection from "../../components/Articles-Section/index";
import Filter from "../../components/Filters/Filters";

// Styles
import styles from "../../styles/components/Main.module.css";
// Styled-Components
import {
  SectionEmpty,
  TitleSection,
  EmptyContainer,
  TextEmpty,
  ClearFilters,
} from "../../styles/categoria/style";

// Genera las rutas de el detalle de todas las categorias
// export const getStaticPaths = async () => {
//   const response = await fetch(
//     "https://api-vasquez.herokuapp.com/api/categories/all-categories"
//   );
//   const { data } = await response.json();

//   const paths = data.map(({ category }) => ({
//     params: {
//       id: category.replace(/ /gi, "-"),
//     },
//   }));

//   return {
//     paths,
//     fallback: false,
//   };
// };

// export async function getStaticProps({ params }) {
export async function getServerSideProps({ params }) {
  const response = await fetch(
    `https://api-vasquez.herokuapp.com/api/related-by-category/${params.id}?first=1&last=20`
  );
  const { data: products } = await response.json();

  const responseBrands = await fetch(
    `https://api-vasquez.herokuapp.com/api/brands/${params.id}`
  );
  const { brands } = await responseBrands.json();

  return {
    props: {
      products,
      brands,

      title: `${params.id.replace(/-/gi, " ")}`,
      description:
        "Amplia gama de productos para obra negra, ferretería, muebles, y artículos para el hogar.",
      image:
        "https://res.cloudinary.com/duibtuerj/image/upload/v1630083340/brand/meta-image_rcclee.jpg",
      ogurl: "https://www.materialesvasquezhnos.com.mx",
    }, // se pasarán al componente de la página como props
  };
}

const Categories = (props) => {
  const {
    products = [],
    brands = [],

    title,
    description,
    image,
    ogurl,

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
    setItemsLoaded(products);
  }, [products]);

  const applyFilters = async (minPrice, maxPrice, selectedBrands) => {
    setSeeking(true);
    const brandsQuery = selectedBrands.map((brand) => `'${brand}'`);

    const response = await fetch(
      `https://api-vasquez.herokuapp.com/api/filters/(${brandsQuery.toString()})?categorie=${title.replace(
        / /gi,
        "-"
      )}&first=${minPrice}&last=${maxPrice}`
    );
    const { data } = await response.json();

    if (data) {
      setResetItemsLoaded();
      setItemsLoaded(data);
      setSeeking(false);
      handleOpenFilters();
      setRouteWithFilters(true);
    }
  };

  const beforeFiltering = () => {
    setResetItemsLoaded();
    setItemsLoaded(products);
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
        <title>{title} | Materiales Vasquez Hermanos</title>
      </Head>

      <main className={styles.MainStyle}>
        <Filter
          brands={brands}
          isOpen={openFilters}
          handleOpenFilters={handleOpenFilters}
          applyFilters={applyFilters}
          seeking={seeking}
          setRouteWithFilters={setRouteWithFilters}
          beforeFiltering={beforeFiltering}
        />
        {itemsLoaded.length > 0 ? (
          <ArticlesSection
            title={title}
            products={itemsLoaded}
            route={true}
            routeWithFilters={routeWithFilters}
            handleOpenFilters={handleOpenFilters}
          />
        ) : (
          <SectionEmpty>
            <TitleSection>{title}</TitleSection>
            <EmptyContainer>
              <TextEmpty>Sección Vacía</TextEmpty>
            </EmptyContainer>
            {routeWithFilters && (
              <ClearFilters type="button" onClick={() => beforeFiltering()}>
                Ver productos sin filtros
              </ClearFilters>
            )}
          </SectionEmpty>
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

export default connect(mapStateToProps, mapDispatchToProps)(Categories);
