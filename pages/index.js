import React, { useState, useEffect } from "react";
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

export async function getServerSideProps() {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_URL}/api/new-products`
  );
  const { data: newProducts } = await response.json();

  const responseSection = await fetch(
    `${process.env.NEXT_PUBLIC_URL}/api/products-by-name/${first_section}?first=1&last=8`
  );
  const { data: productsByName } = await responseSection.json();

  const responseSectionPrice = await fetch(
    `${process.env.NEXT_PUBLIC_URL}/api/products-by-price/${second_section}?first=1&last=8`
  );
  const { data: productsByPrice } = await responseSectionPrice.json();

  return {
    props: {
      products: [
        {
          title: "Productos Nuevos",
          productlist: newProducts,
        },
        {
          title: "lámparas",
          productlist: productsByName,
        },
        {
          title: `Menos de ${second_section.toLowerCase()}`,
          productlist: productsByPrice,
        },
      ],
    }, // se pasarán al componente de la página como props
  };
}

const HomePage = (props) => {
  const {
    products,

    itemsIliked,
  } = props;
  const [thereAreItemsThatIlike, setThereAreItemsThatIlike] = useState(false);

  useEffect(() => {
    itemsIliked.length > 0
      ? setThereAreItemsThatIlike(true)
      : setThereAreItemsThatIlike(false);
  }, [itemsIliked]);

  return (
    <>
      <NextSeo
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
        <Slider />
        {thereAreItemsThatIlike && (
          <>
            {itemsIliked.length > 0 && (
              <div className={styles.ItemsIlikedSection}>
                <ArticlesLiked articles={itemsIliked} />
              </div>
            )}
          </>
        )}
        {products.map((section) => (
          <ArticlesSection
            key={section.title}
            title={section.title}
            products={section.productlist}
          />
        ))}
        <Brands />
      </main>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    itemsIliked: state.itemsIliked,
  };
};

export default connect(mapStateToProps, null)(HomePage);
