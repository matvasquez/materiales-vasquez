import { useState, useEffect } from "react";
import { NextSeo, LocalBusinessJsonLd } from "next-seo";
import Fetch from "isomorphic-unfetch";

//Components
import Slider from "@/components/Slider";
import HomeSection from "@/components/Home-Sections";
import HomeFavorites from "@/components/Home-Favorites";

// CSS
import {
  homeMain,
  productSection,
  titleSection,
} from "@/styles/pages/HomePage.module.css";

const HomePage = ({
  bestSellers,
  lightingItems,
  ferrItems,
  doorsItems,
  ventilationItems,
}) => {
  const [slidersItems, setSlidersItems] = useState([]);

  // Solicita los sliders
  const getData = async () => {
    const response = await fetch(`/api/slider`);
    const { data } = await response.json();

    setSlidersItems(data);
  };

  useEffect(() => {
    getData();
  }, []);

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
      <main className={homeMain}>
        {slidersItems.length > 0 && <Slider sliderItems={slidersItems} />}

        <HomeFavorites />

        {bestSellers && (
          <section className={productSection}>
            <h2 className={titleSection}>PRODUCTOS MÁS VENDIDOS</h2>
            <HomeSection data={bestSellers} />
          </section>
        )}

        {lightingItems && (
          <section className={productSection}>
            <h2 className={titleSection}>ILUMINACIÓN</h2>
            <HomeSection data={lightingItems} />
          </section>
        )}

        {ferrItems && (
          <section className={productSection}>
            <h2 className={titleSection}>FERRETERIA</h2>
            <HomeSection data={ferrItems} />
          </section>
        )}

        {doorsItems && (
          <section className={productSection}>
            <h2 className={titleSection}>PUERTAS Y VENTANAS</h2>
            <HomeSection data={doorsItems} />
          </section>
        )}

        {ventilationItems && (
          <section className={productSection}>
            <h2 className={titleSection}>VENTILACIÓN Y CALEFACCIÓN</h2>
            <HomeSection data={ventilationItems} />
          </section>
        )}
      </main>
    </>
  );
};

export default HomePage;

export const getStaticProps = async () => {
  // const getSlidersItems = await Fetch(
  //   `${process.env.NEXT_PUBLIC_URL}/api/slider`
  // );
  // const { data: slidersItems } = await getSlidersItems.json();

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
      // slidersItems,
      bestSellers,
      lightingItems,
      ferrItems,
      doorsItems,
      ventilationItems,
    },
    revalidate: 10,
  };
};
