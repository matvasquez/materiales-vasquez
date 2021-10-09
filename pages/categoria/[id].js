import React, { useState, useEffect } from "react";
import { NextSeo, LocalBusinessJsonLd } from "next-seo";
import fetch from "isomorphic-unfetch";

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

export async function getServerSideProps({ params }) {
  console.log(":::--------------------------------------------------------:::");
  console.log("params.id: ", params.id.replace(/ /gi, "-"));
  console.log(
    `${process.env.NEXT_PUBLIC_URL}/api/related-by-category/${params.id
      .replace(/ /gi, "-")
      .replace(/Ñ/gi, "enne")}?first=1&last=20`
  );

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_URL}/api/related-by-category/${params.id
      .replace(/ /gi, "-")
      .replace(/Ñ/gi, "enne")}?first=1&last=20`,
    {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json; charset=utf-8",
      },
    }
  );
  const { data: products } = await response.json();

  const responseSubcategories = await fetch(
    `${process.env.NEXT_PUBLIC_URL}/api/categories/by-section/${params.id
      .replace(/ /gi, "-")
      .replace(/Ñ/gi, "enne")}`
  );
  const { data: subCategories } = await responseSubcategories.json();

  const responseBrands = await fetch(
    `${process.env.NEXT_PUBLIC_URL}/api/brands/${params.id
      .replace(/ /gi, "-")
      .replace(/Ñ/gi, "enne")}`
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
}

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

    const brandsQuery = selectedBrands.map((brand) => `'${brand}'`);
    let queryUrl = `/api/filters/(${brandsQuery.toString()})?categorie=${
      selectCategories || "todas"
    }&first=0&last=${maxPrice.replace(/e/gi, "") || 100000}`;

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

  useEffect(async () => {
    if (title === "BAÑOS") {
      const response = await fetch(
        `/api/related-by-category/BAenneOS?first=1&last=20`
      );
      const { data: products } = await response.json();
      console.log("products: ", products);

      const responseSubcategories = await fetch(
        `/api/categories/by-section/BAenneOS`
      );
      const { data: subCategories } = await responseSubcategories.json();
      console.log("subCategories: ", subCategories);

      const responseBrands = await fetch(`/api/brands/BAenneOS`);
      const { brands } = await responseBrands.json();
      console.log("brands: ", brands);
    }
  }, [title]);

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
          />
        ) : (
          <SectionEmpty>
            <TitleSection>{title}</TitleSection>
            <EmptyContainer>
              <TextEmpty>Sección Vacía</TextEmpty>
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
