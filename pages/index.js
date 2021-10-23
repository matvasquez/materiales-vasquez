import React, { useState, useEffect } from "react";
import { NextSeo, LocalBusinessJsonLd } from "next-seo";
import fetch from "isomorphic-unfetch";
import { connect } from "react-redux";

// Components
import Slider from "../components/Slider/Slider";
import ArticlesLiked from "../components/Articles-Liked/ArticlesLiked";
import HomeSection from "../components/Home-Sections/index";
import Brands from "../components/Brands/Brands";

// Styles
import styles from "../styles/components/Main.module.css";
import { GoToTopButton } from "../styles/Inicio/style";

// g.DESGIR = 'LO MÁS VENDIDOS'
// g2.DESC_GIR2 = 'ILUMINACION'
// g.DESGIR = 'FERRETERIA'
// g2.DESC_GIR2 = 'PUERTAS Y VENTANAS'
// g2.DESC_GIR2 = 'VENTILACION Y CALEFACCIÓN'

export async function getStaticProps() {
  const responseSlider = await fetch(
    `${process.env.NEXT_PUBLIC_URL}/api/slider`
  );
  const { data: sliderItems } = await responseSlider.json();

  // const responsebestsellers = await fetch(
  //   `${process.env.NEXT_PUBLIC_URL}/api/related-by-category/LO-MAacentoS-VENDIDOS?first=1&last=20`
  // );
  // const { data: bestsellers } = await responsebestsellers.json();

  const responseMATERIALES = await fetch(
    `${process.env.NEXT_PUBLIC_URL}/api/related-by-category/MATERIALES-PARA-CONSTRUCCION?first=1&last=16`
  );
  const { data: materiales } = await responseMATERIALES.json();

  const responseACABADOS = await fetch(
    `${process.env.NEXT_PUBLIC_URL}/api/related-by-category/ACABADOS?first=1&last=16`
  );
  const { data: acavados } = await responseACABADOS.json(); // Oacento

  const responseBAÑOS = await fetch(
    `${process.env.NEXT_PUBLIC_URL}/api/related-by-category/BAenneOS?first=1&last=16`
  );
  const { data: bannos } = await responseBAÑOS.json();

  const responsehardware = await fetch(
    `${process.env.NEXT_PUBLIC_URL}/api/related-by-category/FERRETERIA?first=1&last=16`
  );
  const { data: hardware } = await responsehardware.json();

  // const responsehome = await fetch(
  //   `${process.env.NEXT_PUBLIC_URL}/api/related-by-category/HOGAR?first=1&last=16`
  // );
  // const { data: home } = await responsehome.json();

  // const responseKITCHEN = await fetch(
  //   `${process.env.NEXT_PUBLIC_URL}/api/related-by-category/COCINA?first=1&last=16`
  // );
  // const { data: kitchen } = await responseKITCHEN.json();

  const sections = [
    {
      title: "MATERIALES PARA CONSTRUCCION",
      products: materiales,
    },
    {
      title: "ACABADOS",
      products: acavados,
    },
    {
      title: "BAÑOS",
      products: bannos,
    },
    {
      title: "FERRETERIA",
      products: hardware,
    },
    // {
    //   title: "HOGAR",
    //   products: home,
    // },
    // {
    //   title: "COCINA",
    //   products: kitchen,
    // },
  ];

  return {
    props: {
      sliderItems,
      sections,
    },
  };
}

const HomePage = (props) => {
  const {
    sliderItems,
    sections,

    itemsIliked,
  } = props;
  const [thereAreItemsThatIlike, setThereAreItemsThatIlike] = useState(false);
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    itemsIliked.length > 0
      ? setThereAreItemsThatIlike(true)
      : setThereAreItemsThatIlike(false);
  }, [itemsIliked]);

  // Scroll

  const handleScroll = () => {
    window.scrollY > 5000 && setShowButton(true);
    window.scrollY < 3000 && setShowButton(false);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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

      {showButton && (
        <GoToTopButton
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        />
      )}
      <main className={styles.MainHome}>
        <Slider sliderItems={sliderItems} />
        {thereAreItemsThatIlike && (
          <>
            {itemsIliked.length > 0 && (
              <div className={styles.ItemsIlikedSection}>
                <ArticlesLiked articles={itemsIliked} />
              </div>
            )}
          </>
        )}
        {sections.map((section, i) => (
          <HomeSection key={section.title} {...section} first={i} />
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
