import React, { useState, useEffect } from "react";
import { NextSeo, LocalBusinessJsonLd } from "next-seo";
import fetch from "isomorphic-unfetch";
import { connect } from "react-redux";

// Components
import MainMenu from "../components/Main-Menu/MainMenu";
import Slider from "../components/Slider/Slider";
import ArticlesLiked from "../components/Articles-Liked/ArticlesLiked";
import HomeSection from "../components/Home-Sections/index";
import Brands from "../components/Brands/Brands";

// Styles
import styles from "../styles/components/Main.module.css";

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

  // const responseCategories = await fetch(
  //   `http://localhost:3000/api/categories/all-categories`
  // );
  // const { data: menuCategories } = await responseCategories.json();

  const responsebestsellers = await fetch(
    `${process.env.NEXT_PUBLIC_URL}/api/related-by-category/LO-MAacentoS-VENDIDOS?first=1&last=16`
  );
  const { data: bestsellers } = await responsebestsellers.json();

  const responselighting = await fetch(
    `${process.env.NEXT_PUBLIC_URL}/api/related-by-subcategory/ILUMINACION?first=1&last=8`
  );
  const { data: lighting } = await responselighting.json();

  const responsehardware = await fetch(
    `${process.env.NEXT_PUBLIC_URL}/api/related-by-category/FERRETERIA?first=1&last=8`
  );
  const { data: hardware } = await responsehardware.json();

  const responsedoors = await fetch(
    `${process.env.NEXT_PUBLIC_URL}/api/related-by-subcategory/PUERTAS-Y-VENTANAS?first=1&last=8`
  );
  const { data: doors } = await responsedoors.json();

  const responseventilation = await fetch(
    `${process.env.NEXT_PUBLIC_URL}/api/related-by-subcategory/VENTILACION Y CALEFACCIOacentoN?first=1&last=8`
  );
  const { data: ventilation } = await responseventilation.json();

  const sections = [
    {
      title: "LO MÁS VENDIDO",
      products: bestsellers,
      link: "/categoria/LO-MÁS-VENDIDOS",
    },
    {
      title: "ILUMINACIÓN",
      products: lighting,
      link: "/categoria/HOGAR/ILUMINACION",
    },
    {
      title: "FERRETERIA",
      products: hardware,
      link: "/categoria/FERRETERIA",
    },
    {
      title: "PUERTAS Y VENTANAS",
      products: doors,
      link: "/categoria/HOGAR/PUERTAS-Y-VENTANAS",
    },
    {
      title: "VENTILACIÓN",
      products: ventilation,
      link: "/categoria/HOGAR/VENTILACION-Y-CALEFACCIÓN",
    },
  ];

  return {
    props: {
      sliderItems,
      sections,
    }, // se pasarán al componente de la página como props
  };
}

const HomePage = (props) => {
  const {
    sliderItems,
    sections,

    itemsIliked,
  } = props;
  const [thereAreItemsThatIlike, setThereAreItemsThatIlike] = useState(false);

  useEffect(() => {
    itemsIliked.length > 0
      ? setThereAreItemsThatIlike(true)
      : setThereAreItemsThatIlike(false);
  }, [itemsIliked]);

  // :::::::::::::::::::::::::::::::::::::::::::::

  // useEffect(async () => {
  //   const responseSlider = await fetch(`/api/slider`);
  //   const { data: sliderItems } = await responseSlider.json();

  //   const responsebestsellers = await fetch(
  //     `/api/related-by-category/LO-MAacentoS-VENDIDOS?first=1&last=16`
  //   );
  //   const { data: bestsellers } = await responsebestsellers.json();

  //   const responselighting = await fetch(
  //     `/api/related-by-subcategory/ILUMINACION?first=1&last=8`
  //   );
  //   const { data: lighting } = await responselighting.json();

  //   const responsehardware = await fetch(
  //     `/api/related-by-category/FERRETERIA?first=1&last=8`
  //   );
  //   const { data: hardware } = await responsehardware.json();

  //   const responsedoors = await fetch(
  //     `/api/related-by-subcategory/PUERTAS-Y-VENTANAS?first=1&last=8`
  //   );
  //   const { data: doors } = await responsedoors.json();

  //   const responseventilation = await fetch(
  //     `/api/related-by-subcategory/VENTILACION Y CALEFACCIOacentoN?first=1&last=8`
  //   );
  //   const { data: ventilation } = await responseventilation.json();

  //   const useEffectSections = [
  //     {
  //       title: "LO MÁS VENDIDO",
  //       products: bestsellers,
  //       link: "/categoria/LO-MÁS-VENDIDO",
  //     },
  //     {
  //       title: "ILUMINACIÓN",
  //       products: lighting,
  //       link: "/categoria/HOGAR/ILUMINACION",
  //     },
  //     {
  //       title: "FERRETERIA",
  //       products: hardware,
  //       link: "/categoria/FERRETERIA",
  //     },
  //     {
  //       title: "PUERTAS Y VENTANAS",
  //       products: doors,
  //       link: "/categoria/HOGAR/PUERTAS-Y-VENTANAS",
  //     },
  //     {
  //       title: "VENTILACIÓN",
  //       products: ventilation,
  //       link: "/categoria/HOGAR/VENTILACION-Y-CALEFACCIÓN",
  //     },
  //   ];

  //   console.log("useEffectSections: ", useEffectSections);
  // }, []);

  // :::::::::::::::::::::::::::::::::::::::::::::

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
          <HomeSection
            key={section.title}
            title={section.title}
            {...section}
            first={i}
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
