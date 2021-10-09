import React, { useState, useEffect } from "react";
import { NextSeo, LocalBusinessJsonLd } from "next-seo";
import fetch from "isomorphic-unfetch";

// Components
import ArticlesSection from "../../components/Articles-Section/index";
import Filter from "../../components/Filters/Filters";

// Styles
import styles from "../../styles/components/Main.module.css";

export async function getServerSideProps({ params }) {
  let products;

  if (params.id === "Menos-de-200") {
    const responseSectionPrice = await fetch(
      `${process.env.NEXT_PUBLIC_URL}/api/products-by-price/200?first=1&last=20`
    );
    const { data } = await responseSectionPrice.json();
    products = await data;
  } else {
    console.log(
      `${process.env.NEXT_PUBLIC_URL}/api/products-by-name/${params.id
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/s$/g, "")
        .toUpperCase()}?first=1&last=20`
    );
    const responseSection = await fetch(
      `${process.env.NEXT_PUBLIC_URL}/api/products-by-name/${params.id
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/s$/g, "")
        .toUpperCase()}?first=1&last=20`
    );
    const { data } = await responseSection.json();
    products = await data;
  }

  // const responseBrands = await fetch(
  //   `${process.env.NEXT_PUBLIC_URL}/api/brands/${products[0].category}`
  // );
  // const { brands } = await responseBrands.json();

  return {
    props: {
      products,
      title: params.id.replace(/-/gi, " "),
      description:
        params.id === "Menos-de-200"
          ? "Artículos que cuestan menos de $200 MXN"
          : `Nuestra selección de ${params.id
              .replace(/-/gi, " ")
              .toLowerCase()}`,
    }, // se pasarán al componente de la página como props
  };
}

const AllSections = (props) => {
  const { products, title, description } = props;
  // const [openFilters, setOpenFilters] = useState(false);
  // const [seeking, setSeeking] = useState(false);
  // const [routeWithFilters, setRouteWithFilters] = useState(false);
  // const [itemsLoaded, setItemsLoaded] = useState([]);

  // useEffect(() => {
  //   setItemsLoaded(products);
  // }, []);

  // const handleOpenFilters = () => {
  //   setOpenFilters(!openFilters);
  // };

  // const setResetItemsLoaded = () => {
  //   setItemsLoaded([]);
  // };

  // useEffect(() => {
  //   setItemsLoaded(products);
  // }, [products]);

  // const applyFilters = async (minPrice, maxPrice, selectedBrands) => {
  //   setSeeking(true);
  //   const brandsQuery = selectedBrands.map((brand) => `'${brand}'`);

  //   const response = await fetch(
  //     `${
  //       process.env.NEXT_PUBLIC_URL
  //     }/api/filters/(${brandsQuery.toString()})?categorie=${title.replace(
  //       / /gi,
  //       "-"
  //     )}&first=${minPrice.replace(/e/gi, "") || 0}&last=${
  //       maxPrice.replace(/e/gi, "") || 100000
  //     }`
  //   );
  //   const { data } = await response.json();

  //   if (data) {
  //     setResetItemsLoaded();
  //     setItemsLoaded(data);
  //     setSeeking(false);
  //     handleOpenFilters();
  //     setRouteWithFilters(true);
  //   }
  // };

  // const beforeFiltering = () => {
  //   setResetItemsLoaded();
  //   setItemsLoaded(products);
  //   setOpenFilters(false);
  // };

  return (
    <>
      <NextSeo
        title={`${title} | Materiales Vasquez Hermanos`}
        description={description}
        canonical={`https://www.materialesvasquezhnos.com.mx/todos-los/${title}`}
        openGraph={{
          url: `https://www.materialesvasquezhnos.com.mx/todos-los/${title}`,
          title: `${description} | Materiales Vasquez Hermanos`,
          description: { description },
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

      <main className={styles.MainHome}>
        {/* <Filter
          brands={brands}
          isOpen={openFilters}
          handleOpenFilters={handleOpenFilters}
          applyFilters={applyFilters}
          seeking={seeking}
          setRouteWithFilters={setRouteWithFilters}
          beforeFiltering={beforeFiltering}
        /> */}
        {products.length > 0 && (
          <ArticlesSection
            title={title.replace(/-/gi, " ")}
            products={products}
            route={true}
            showFilters={false}
            // handleOpenFilters={handleOpenFilters}
          />
        )}
      </main>
    </>
  );
};

export default AllSections;
