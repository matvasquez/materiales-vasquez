import React, { useState, useEffect } from "react";
import { NextSeo, LocalBusinessJsonLd } from "next-seo";
import fetch from "isomorphic-unfetch";

// Components
import ArticlesSection from "../../components/Articles-Section/index";
import Filter from "../../components/Filters/Filters";
import { AddNewProducts } from "../../components/IconsSVG/AddNewProducts";

// Styles
import styles from "../../styles/components/Main.module.css";
// Styled-Components
import {
  SectionEmpty,
  GoToTopButton,
  TitleSection,
  EmptyContainer,
  TextEmpty,
  ClearFilters,
} from "../../styles/categoria/style";

export const getStaticPaths = async () => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_URL}/api/categories/main-menu`
  );
  const { data } = await response.json();

  const paths = data.map(({ name }) => ({
    params: {
      id: name.replace(/ /gi, "-"),
    },
  }));

  paths.push({
    params: {
      id: "LO-MÁS-VENDIDOS",
    },
  });

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async ({ params }) => {
  const categorie = params.id
    .replace(/á/g, "aacento")
    .replace(/é/g, "eacento")
    .replace(/í/g, "iacento")
    .replace(/ó/g, "oacento")
    .replace(/ú/g, "uacento")
    .replace(/Á/g, "Aacento")
    .replace(/É/g, "Eacento")
    .replace(/Í/g, "Iacento")
    .replace(/Ó/g, "Oacento")
    .replace(/Ú/g, "Uacento")
    .replace(/Ñ/g, "enne");

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_URL}/api/related-by-category/${categorie}?first=1&last=30`
  );
  const { data: products } = await response.json();

  const responseSubcategories = await fetch(
    `${process.env.NEXT_PUBLIC_URL}/api/categories/by-section/${categorie}`
  );
  const { data: subCategories } = await responseSubcategories.json();

  const responseBrands = await fetch(
    `${process.env.NEXT_PUBLIC_URL}/api/brands/${categorie}`
  );
  const { brands } = await responseBrands.json();

  return {
    props: {
      products,
      subCategories,
      brands,

      title: `${params.id.replace(/-/gi, " ")}`,
    }, // se pasarán al componente de la página como props
  };
};

const Categories = (props) => {
  const {
    products = [],
    subCategories = [],
    brands = [],

    title,
  } = props;

  const [openFilters, setOpenFilters] = useState(false);
  const [seeking, setSeeking] = useState(false);
  const [routeWithFilters, setRouteWithFilters] = useState(false);
  const [resultsFilters, setResultsFilters] = useState(false);
  const [itemsLoaded, setItemsLoaded] = useState([]);
  const [showButton, setShowButton] = useState(false);

  const handleOpenFilters = () => {
    setOpenFilters(!openFilters);
  };

  const setResetItemsLoaded = () => {
    setItemsLoaded([]);
  };

  useEffect(() => {
    setItemsLoaded(products);
  }, [products]);

  const applyFilters = async (maxPrice, selectCategories, selectedBrands) => {
    setSeeking(true);

    const categories = selectCategories
      .map((categorie) => `'${categorie}'`)
      .toString();

    const brandsQuery = selectedBrands.map((brand) => `'${brand}'`).toString();

    let queryUrl = `/api/filters/(${brandsQuery})?categorie=(${categories})&first=0&last=${
      maxPrice.replace(/e/gi, "") || 100000
    }`;

    const response = await fetch(queryUrl);
    const { data } = await response.json();

    if (data) {
      setResetItemsLoaded();
      setItemsLoaded(data);
      setSeeking(false);
      handleOpenFilters();
      setRouteWithFilters(true);
    } else {
      setSeeking(false);
      setResultsFilters(true);
      setTimeout(() => {
        setResultsFilters(false);
      }, 2000);
    }
  };

  const beforeFiltering = () => {
    setResetItemsLoaded();
    setItemsLoaded(products);
    setOpenFilters(false);
  };

  // Scroll

  const handleScroll = () => {
    window.scrollY > 8000 && setShowButton(true);
    window.scrollY < 3000 && setShowButton(false);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // :::::::::::::::::::::::::::::::::::::::::::::

  // useEffect(async () => {
  //   const response = await fetch(`/api/categories/main-menu`);
  //   const { data } = await response.json();

  //   data.map(async ({ name }) => {
  //     const categorie = name
  //       .replace(/ /g, "-")
  //       .replace(/á/g, "aacento")
  //       .replace(/é/g, "eacento")
  //       .replace(/í/g, "iacento")
  //       .replace(/ó/g, "oacento")
  //       .replace(/ú/g, "uacento")
  //       .replace(/Á/g, "Aacento")
  //       .replace(/É/g, "Eacento")
  //       .replace(/Í/g, "Iacento")
  //       .replace(/Ó/g, "Oacento")
  //       .replace(/Ú/g, "Uacento")
  //       .replace(/Ñ/g, "enne");

  //     const response = await fetch(
  //       `/api/related-by-category/${categorie}?first=1&last=3`
  //     );
  //     const { data: products } = await response.json();

  //     const responseSubcategories = await fetch(
  //       `/api/categories/by-section/${categorie}`
  //     );
  //     const { data: subCategories } = await responseSubcategories.json();

  //     const responseBrands = await fetch(`/api/brands/${categorie}`);
  //     const { brands } = await responseBrands.json();

  //     console.log("====================================");
  //     console.log({
  //       name,
  //       products,
  //       subCategories,
  //       brands,
  //     });
  //     console.log("====================================");
  //   });
  // }, []);
  // :::::::::::::::::::::::::::::::::::::::::::::

  return (
    <>
      <NextSeo
        title={`${title} | Materiales Vasquez Hermanos`}
        description={`Amplia gama de productos de nuestra categoría ${title}`}
        canonical="https://www.materialesvasquezhnos.com.mx/"
        openGraph={{
          url: `https://www.materialesvasquezhnos.com.mx/${title}`,
          title: `Categoría ${title} | Materiales Vasquez Hermanos`,
          description: `Amplia gama de productos de nuestra categoría ${title}`,
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
      />
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

      {showButton && (
        <GoToTopButton
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        />
      )}
      <main className={styles.MainStyle}>
        <Filter
          categories={subCategories}
          brands={brands}
          isOpen={openFilters}
          handleOpenFilters={handleOpenFilters}
          applyFilters={applyFilters}
          seeking={seeking}
          setRouteWithFilters={setRouteWithFilters}
          beforeFiltering={beforeFiltering}
          resultsFilters={resultsFilters}
        />
        {itemsLoaded.length > 0 ? (
          <ArticlesSection
            title={title}
            products={itemsLoaded}
            route={true}
            showFilters={true}
            routeWithFilters={routeWithFilters}
            handleOpenFilters={handleOpenFilters}
            ruteLoadMore={`/api/related-by-category/${title
              .replace(/ /g, "-")
              .replace(/á/g, "aacento")
              .replace(/é/g, "eacento")
              .replace(/í/g, "iacento")
              .replace(/ó/g, "oacento")
              .replace(/ú/g, "uacento")
              .replace(/Á/g, "Aacento")
              .replace(/É/g, "Eacento")
              .replace(/Í/g, "Iacento")
              .replace(/Ó/g, "Oacento")
              .replace(/Ú/g, "Uacento")
              .replace(/Ñ/g, "enne")}`}
          />
        ) : (
          <SectionEmpty>
            <TitleSection>{title}</TitleSection>
            <EmptyContainer>
              <AddNewProducts />
              <TextEmpty>Pronto tendremos productos aquí</TextEmpty>
            </EmptyContainer>
            {routeWithFilters && (
              <ClearFilters type="button" onClick={() => beforeFiltering()}>
                Quitar filtros
              </ClearFilters>
            )}
          </SectionEmpty>
        )}
      </main>
    </>
  );
};

export default Categories;
