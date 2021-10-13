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

// export async function getServerSideProps() {
//   // const responseSlider = await fetch(`http://localhost:3000/api/slider`);
//   // const { data: sliderItems } = await responseSlider.json();

//   // const getMainSections = await fetch(
//   //   `http://localhost:3000/api/main-sections`
//   // );
//   // const { sections } = await getMainSections.json();

//   return {
//     props: {
//       sliderItems,
//       sections,
//       products: [],
//     }, // se pasarán al componente de la página como props
//   };
// }

const HomePage = (props) => {
  const {
    // sliderItems,
    // sections,
    products,

    itemsIliked,
  } = props;
  const [thereAreItemsThatIlike, setThereAreItemsThatIlike] = useState(false);

  useEffect(() => {
    itemsIliked.length > 0
      ? setThereAreItemsThatIlike(true)
      : setThereAreItemsThatIlike(false);
  }, [itemsIliked]);

  // :::::::::::::::::::::::::::::::::::::::::::
  const [sliderItems, setSliderItems] = useState([]);
  const [sections, setSections] = useState([]);

  useEffect(async () => {
    const responseSlider = await fetch(`/api/slider`);
    const { data: sliderItems } = await responseSlider.json();
    setSliderItems(sliderItems);

    const getMainSections = await fetch(`/api/main-sections`);
    const { sections: data } = await getMainSections.json();
    setSections(data);
  }, []);

  useEffect(() => {
    if (sections.length > 0) {
      sections.forEach(async (section) => {
        console.log(section.title);
        const response = await fetch(
          `/api/related-by-subcategory/${section.title
            .replace(/-/gi, " ")
            .replace(/Ñ/gi, "enne")}?first=1&last=8`
        );
        const { data } = await response.json();
        console.log(section.title, data);
      });
    }
  }, [sections]);

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
          <HomeSection key={section.title} title={section.title} first={i} />
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
