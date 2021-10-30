import React, { useState, useEffect } from "react";
const CosmosClient = require("@azure/cosmos").CosmosClient;
import config from "../lib/config-cosmos";
import Image from "next/image";
import { NextSeo, LocalBusinessJsonLd } from "next-seo";
import fetch from "isomorphic-unfetch";
import { connect } from "react-redux";

// Components
import Slider from "../components/Slider/Slider";
import HomeSection from "../components/Home-Sections/index";

// Styles
import {
  MainStyled,
  FirstSection,
  Total,
  Section,
  TitleSection,
} from "../styles/Inicio/style";

// g.DESGIR = 'LO MÁS VENDIDOS'
// g2.DESC_GIR2 = 'ILUMINACION'
// g.DESGIR = 'FERRETERIA'
// g2.DESC_GIR2 = 'PUERTAS Y VENTANAS'
// g2.DESC_GIR2 = 'VENTILACION Y CALEFACCIÓN'

export const getServerSideProps = async () => {
  const { endpoint, key } = config;

  const client = new CosmosClient({ endpoint, key });
  const databaseID = client.database("articulos");
  const containerID = databaseID.container("articulos_mv");
  const slidersID = databaseID.container("sliders");

  if (endpoint) {
    const { resources: sliders } = await slidersID.items
      .query(`SELECT * FROM c`)
      .fetchAll();

    const { resources: items } = await containerID.items
      .query(`SELECT TOP 8 * FROM c WHERE c.best_seller = "TRUE"`)
      .fetchAll();

    const { resources: lighting } = await containerID.items
      .query(`SELECT TOP 8 * FROM c WHERE c.main_category = "ILUMINACION"`)
      .fetchAll();

    const { resources: ferr } = await containerID.items
      .query(`SELECT TOP 8 * FROM c WHERE c.category = "FERRETERIA"`)
      .fetchAll();

    const { resources: doors } = await containerID.items
      .query(
        `SELECT TOP 8 * FROM c WHERE c.main_category = "PUERTAS Y VENTANAS"`
      )
      .fetchAll();

    // const { resources: ventilation } = await containerID.items
    //   .query(
    //     `SELECT TOP 8 * FROM c WHERE c.main_category = "VENTILACION Y CALEFACCIÓN"`
    //   )
    //   .fetchAll();

    return {
      props: {
        SlidersItems: sliders,
        BestSellers: items,
        LightingItems: lighting,
        FerrItems: ferr,
        DoorsItems: doors,
        // VentilationItems: ventilation,
      },
    };
  }
};

export default function HomePage({
  SlidersItems,
  BestSellers,
  LightingItems,
  DoorsItems,
  FerrItems,
  // VentilationItems,
}) {
  return (
    <MainStyled>
      {SlidersItems.length > 0 && <Slider sliderItems={SlidersItems} />}
      {BestSellers.length > 0 && (
        <Section>
          <TitleSection>LO MÁS VENDIDO</TitleSection>
          <HomeSection items={BestSellers} />
        </Section>
      )}
      {LightingItems.length > 0 && (
        <Section>
          <TitleSection>ILUMINACIÓN</TitleSection>
          <HomeSection items={LightingItems} />
        </Section>
      )}
      {FerrItems.length > 0 && (
        <Section>
          <TitleSection>FERRETERIA</TitleSection>
          <HomeSection items={FerrItems} />
        </Section>
      )}
      {DoorsItems.length > 0 && (
        <Section>
          <TitleSection>PUERTAS Y VENTANAS</TitleSection>
          <HomeSection items={DoorsItems} />
        </Section>
      )}
      {/* {VentilationItems.length > 0 && (
        <Section>
          <TitleSection>VENTILACIÓN Y CALEFACCIÓN</TitleSection>
          <HomeSection items={VentilationItems} />
        </Section>
      )} */}
    </MainStyled>
  );
}

// export async function getStaticProps() {
//   const responseSlider = await fetch(
//     `${process.env.NEXT_PUBLIC_URL}/api/slider`
//   );
//   const { data: sliderItems } = await responseSlider.json();

//   // const responsebestsellers = await fetch(
//   //   `${process.env.NEXT_PUBLIC_URL}/api/related-by-category/LO-MAacentoS-VENDIDOS?first=1&last=20`
//   // );
//   // const { data: bestsellers } = await responsebestsellers.json();

//   const responseMATERIALES = await fetch(
//     `${process.env.NEXT_PUBLIC_URL}/api/related-by-category/MATERIALES-PARA-CONSTRUCCION?first=1&last=8`
//   );
//   const { data: materiales } = await responseMATERIALES.json();

//   const responseACABADOS = await fetch(
//     `${process.env.NEXT_PUBLIC_URL}/api/related-by-category/ACABADOS?first=1&last=8`
//   );
//   const { data: acavados } = await responseACABADOS.json(); // Oacento

//   const responseBAÑOS = await fetch(
//     `${process.env.NEXT_PUBLIC_URL}/api/related-by-category/BAenneOS?first=1&last=8`
//   );
//   const { data: bannos } = await responseBAÑOS.json();

//   const responsehardware = await fetch(
//     `${process.env.NEXT_PUBLIC_URL}/api/related-by-category/FERRETERIA?first=1&last=8`
//   );
//   const { data: hardware } = await responsehardware.json();

//   const responsehome = await fetch(
//     `${process.env.NEXT_PUBLIC_URL}/api/related-by-category/HOGAR?first=1&last=8`
//   );
//   const { data: home } = await responsehome.json();

//   const responseKITCHEN = await fetch(
//     `${process.env.NEXT_PUBLIC_URL}/api/related-by-category/COCINA?first=1&last=8`
//   );
//   const { data: kitchen } = await responseKITCHEN.json();

//   const sections = [
//     {
//       title: "MATERIALES PARA CONSTRUCCION",
//       products: materiales,
//     },
//     {
//       title: "ACABADOS",
//       products: acavados,
//     },
//     {
//       title: "BAÑOS",
//       products: bannos,
//     },
//     {
//       title: "FERRETERIA",
//       products: hardware,
//     },
//     {
//       title: "HOGAR",
//       products: home,
//     },
//     {
//       title: "COCINA",
//       products: kitchen,
//     },
//   ];

//   return {
//     props: {
//       sliderItems,
//       sections,
//     },
//   };
// }

// const HomePage = (props) => {
//   const {
//     sliderItems,
//     sections,

//     itemsIliked,
//   } = props;
//   const [thereAreItemsThatIlike, setThereAreItemsThatIlike] = useState(false);
//   const [showButton, setShowButton] = useState(false);

//   useEffect(() => {
//     itemsIliked.length > 0
//       ? setThereAreItemsThatIlike(true)
//       : setThereAreItemsThatIlike(false);
//   }, [itemsIliked]);

//   // Scroll

//   const handleScroll = () => {
//     window.scrollY > 5000 && setShowButton(true);
//     window.scrollY < 3000 && setShowButton(false);
//   };

//   useEffect(() => {
//     window.addEventListener("scroll", handleScroll);

//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   return (
//     <>
//       <NextSeo
//         title="Home Center | Materiales Vasquez Hermanos"
//         description="Amplia gama de productos para obra negra, ferretería, muebles, y artículos para el hogar"
//         canonical="https://www.materialesvasquezhnos.com.mx/"
//         openGraph={{
//           url: "https://www.materialesvasquezhnos.com.mx/",
//           title: "Home Center | Materiales Vasquez Hermanos",
//           description:
//             "Amplia gama de productos para obra negra, ferretería, muebles, y artículos para el hogar",
//           images: [
//             {
//               url: "https://res.cloudinary.com/duibtuerj/image/upload/v1630083340/brand/meta-image_rcclee.jpg",
//               width: 200,
//               height: 200,
//               alt: "Logotipo de Materiales Vasquez Hermanos",
//             },
//           ],
//           site_name: "Materiales Vasquez Hermanos",
//         }}
//         twitter={{
//           handle: "@MaterialesVH",
//           site: "@MaterialesVH",
//           cardType: "summary",
//         }}
//       />
//       <LocalBusinessJsonLd
//         type="HomeGoodsStore"
//         name="Materiales Vasquez Hermanos"
//         description="Amplia gama de productos para obra negra, ferretería, muebles, y artículos para el hogar"
//         url="https://www.materialesvasquezhnos.com.mx/"
//         telephone="+522288401919"
//         address={{
//           streetAddress: "Lázaro Cárdenas 274",
//           addressLocality: "Xalapa",
//           addressRegion: "MEX",
//           postalCode: "91180",
//           addressCountry: "MX",
//         }}
//       />

//       {showButton && (
//         <GoToTopButton
//           type="button"
//           onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
//         />
//       )}
//       <main className={styles.MainHome}>
//         <Slider sliderItems={sliderItems} />
//         {thereAreItemsThatIlike && (
//           <>
//             {itemsIliked.length > 0 && (
//               <div className={styles.ItemsIlikedSection}>
//                 <ArticlesLiked articles={itemsIliked} />
//               </div>
//             )}
//           </>
//         )}
//         {sections.map((section, i) => (
//           <HomeSection key={section.title} {...section} first={i} />
//         ))}
//         <Brands />
//       </main>
//     </>
//   );
// };

// const mapStateToProps = (state) => {
//   return {
//     itemsIliked: state.itemsIliked,
//   };
// };

// export default connect(mapStateToProps, null)(HomePage);
