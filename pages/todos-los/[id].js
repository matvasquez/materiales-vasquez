import React from "react";
import { NextSeo, LocalBusinessJsonLd } from "next-seo";
import fetch from "isomorphic-unfetch";

// Components
import ArticlesSection from "../../components/Articles-Section/index";

// Styles
import styles from "../../styles/components/Main.module.css";

export async function getServerSideProps({ params }) {
  let products;

  if (params.id === "lámparas") {
    const responseSection = await fetch(
      `${process.env.NEXT_PUBLIC_URL}/api/products-by-name/LAMPARA?first=1&last=20`
    );
    const { data } = await responseSection.json();
    products = await data;
  } else if (params.id === "Menos-de-200") {
    const responseSectionPrice = await fetch(
      `${process.env.NEXT_PUBLIC_URL}/api/products-by-price/200?first=1&last=20`
    );
    const { data } = await responseSectionPrice.json();
    products = await data;
  }

  return {
    props: {
      products,
      title: params.id.replace(/-/gi, " "),
      description:
        params.id === "lámparas"
          ? "Nuestra selección de lámparas"
          : "Artículos que cuestan menos de $200 MXN",
    }, // se pasarán al componente de la página como props
  };
}

const AllSections = (props) => {
  const { products, title, description } = props;

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
        {products.length > 0 && (
          <ArticlesSection
            title={title.replace(/-/gi, " ")}
            products={products}
            route={true}
          />
        )}
      </main>
    </>
  );
};

export default AllSections;
