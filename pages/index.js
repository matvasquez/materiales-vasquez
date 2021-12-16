import React, { useState, useEffect } from "react";
import Fetch from "isomorphic-unfetch";
import { NextSeo, LocalBusinessJsonLd } from "next-seo";

// Data
// import { articulos } from "../database/articulos";

// Components
import Slider from "../components/Slider/Slider";
import HomeSection from "../components/Home-Sections/index";

import HomeFavorites from "../components/Home-Favorites/HomeFavorites";

// Styles
import { MainStyled, Section, TitleSection } from "../styles/Inicio/style";

// g.DESGIR = 'LO MÁS VENDIDOS'
// g2.DESC_GIR2 = 'ILUMINACION'
// g.DESGIR = 'FERRETERIA'
// g2.DESC_GIR2 = 'PUERTAS Y VENTANAS'
// g2.DESC_GIR2 = 'VENTILACION Y CALEFACCIÓN'

const HomePage = ({
  slidersItems,
  bestSellers,
  lightingItems,
  ferrItems,
  doorsItems,
  ventilationItems,
}) => {
  // const [slidersItems, setSlidersItems] = useState([]);
  // const [bestSellers, setBestSellers] = useState([]);
  // const [lightingItems, setLightingItems] = useState([]);
  // const [doorsItems, setDoorsItems] = useState([]);
  // const [ferrItems, setFerrItems] = useState([]);
  // const [ventilationItems, setVentilationItems] = useState([]);

  // useEffect(async () => {
  //   // Solicita los sliders
  //   const response = await fetch(`/api/slider`);
  //   const { data } = await response.json();

  //   setSlidersItems(data);
  // }, []);

  // useEffect(() => {
  //   if (articulos.length > 0) {
  //     // const items = articulos.filter((item) => item.best_seller);
  //     const items = articulos.filter(
  //       (item) => item.category === "LO MÁS VENDIDOS"
  //     );

  //     const lightingArticles = articulos.filter(
  //       (item) => item.main_category === "ILUMINACION"
  //     );
  //     const ferr = articulos.filter((item) => item.category === "FERRETERIA");

  //     const doorsItems = articulos.filter(
  //       (item) => item.main_category === "PUERTAS Y VENTANAS"
  //     );

  //     const ventilationItems = articulos.filter(
  //       (item) => item.main_category === "VENTILACION Y CALEFACCIÓN"
  //     );

  //     setBestSellers(items);
  //     setLightingItems(lightingArticles);
  //     setDoorsItems(doorsItems);
  //     setFerrItems(ferr);
  //     setVentilationItems(ventilationItems);
  //   }
  // }, [articulos]);

  return (
    <>
      <NextSeo
        title="Home Center | Materiales Vasquez Hermanos"
        description="Amplia gama de productos para obra negra, ferretería, muebles, y artículos para el hogar"
        canonical="https://www.materialesvasquezhnos.com.mx/"
        openGraph={{
          url: `https://www.materialesvasquezhnos.com.mx/`,
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
      <MainStyled>
        {slidersItems && <Slider sliderItems={slidersItems} />}

        <HomeFavorites />
        {bestSellers && (
          <Section>
            <TitleSection>PRODUCTOS MÁS VENDIDOS</TitleSection>
            <HomeSection data={bestSellers} />
          </Section>
        )}
        {lightingItems && (
          <Section>
            <TitleSection>ILUMINACIÓN</TitleSection>
            <HomeSection data={lightingItems} />
          </Section>
        )}
        {ferrItems && (
          <Section>
            <TitleSection>FERRETERIA</TitleSection>
            <HomeSection data={ferrItems} />
          </Section>
        )}
        {doorsItems && (
          <Section>
            <TitleSection>PUERTAS Y VENTANAS</TitleSection>
            <HomeSection data={doorsItems} />
          </Section>
        )}
        {ventilationItems && (
          <Section>
            <TitleSection>VENTILACIÓN Y CALEFACCIÓN</TitleSection>
            <HomeSection data={ventilationItems} />
          </Section>
        )}
      </MainStyled>
    </>
  );
};

export default HomePage;

export const getStaticProps = async () => {
  const getSlidersItems = await Fetch(
    `${process.env.NEXT_PUBLIC_URL}/api/slider`
  );
  const { data: slidersItems } = await getSlidersItems.json();

  const getBestSellers = await Fetch(
    `${process.env.NEXT_PUBLIC_URL}/api/related-by-category/LO-MAacentoS-VENDIDOS?first=1&last=12`
  );
  const { data: bestSellers } = await getBestSellers.json();

  const getLighting = await Fetch(
    `${process.env.NEXT_PUBLIC_URL}/api/related-by-subcategory/ILUMINACION?first=1&last=12`
  );
  const { data: lightingItems } = await getLighting.json();

  const getHardware = await Fetch(
    `${process.env.NEXT_PUBLIC_URL}/api/related-by-category/FERRETERIA?first=1&last=12`
  );
  const { data: ferrItems } = await getHardware.json();

  const getDoorsAndWindows = await Fetch(
    `${process.env.NEXT_PUBLIC_URL}/api/related-by-subcategory/PUERTAS-Y-VENTANAS?first=1&last=12`
  );
  const { data: doorsItems } = await getDoorsAndWindows.json();

  const getVentilationAndHeating = await Fetch(
    `${process.env.NEXT_PUBLIC_URL}/api/related-by-subcategory/VENTILACION-Y-CALEFACCIOacentoN?first=1&last=12`
  );
  const { data: ventilationItems } = await getVentilationAndHeating.json();

  return {
    props: {
      slidersItems,
      bestSellers,
      lightingItems,
      ferrItems,
      doorsItems,
      ventilationItems,
    },
    revalidate: 10,
  };
};
