import React, { useState, useEffect } from "react";
import { NextSeo, LocalBusinessJsonLd } from "next-seo";
import fetch from "isomorphic-unfetch";
import Link from "next/link";

// Components
import ArticlesSection from "../../../components/Articles-Section/index";
import Filter from "../../../components/Filters/Filters";
import { AddNewProducts } from "../../../components/IconsSVG/AddNewProducts";

// Styles
import styles from "../../../styles/components/Main.module.css";
// Styled-Components
import {
  SectionEmpty,
  GoToTopButton,
  TitleSection,
  EmptyContainer,
  TextEmpty,
  ClearFilters,
  LinkMainCategorie,
} from "../../../styles/categoria/style";

const mainCategories = [
  {
    name: "MATERIALES PARA CONSTRUCCION",
    category_id: "1000",
  },
  {
    name: "ACABADOS",
    category_id: "2000",
  },
  {
    name: "BAÑOS",
    category_id: "3000",
  },
  {
    name: "FERRETERIA",
    category_id: "4000",
  },
  {
    name: "HOGAR",
    category_id: "5000",
  },
  {
    name: "COCINA",
    category_id: "6000",
  },
];
export const getStaticPaths = async () => {
  // Este código comentado es necesario para extraer la lista completa de params
  // Solo se ejecuta en desarrollo previo a hacer deploy con actualizaciones
  // ⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇⬇

  // mainCategories.map(async ({ category_id, name }) => {
  //   const response = await fetch(
  //     `${process.env.NEXT_PUBLIC_URL}/api/categories/sub-categories/${category_id}`
  //   );
  //   const { data } = await response.json();

  //   console.log(
  //     data.map(({ name: sub }) => ({
  //       params: {
  //         id: name.replace(/ /gi, "-"),
  //         cat: sub.replace(/ /gi, "-"),
  //       },
  //     }))
  //   );
  // });

  return {
    paths: [
      { params: { id: "ACABADOS", cat: "IMPERMEABILIZANTES" } },
      { params: { id: "ACABADOS", cat: "ACELERANTES" } },
      { params: { id: "ACABADOS", cat: "ADHESIVOS-Y-BOQUILLAS" } },
      { params: { id: "ACABADOS", cat: "FILTROS" } },
      { params: { id: "ACABADOS", cat: "MALLAS-Y-CENAFAS" } },
      { params: { id: "ACABADOS", cat: "MOLDURAS" } },
      { params: { id: "ACABADOS", cat: "MUROS-Y-FACHADAS" } },
      { params: { id: "ACABADOS", cat: "PERFILES" } },
      { params: { id: "ACABADOS", cat: "PIEDRAS-DECORATIVAS" } },
      { params: { id: "ACABADOS", cat: "PISOS-CERAMICOS" } },
      { params: { id: "ACABADOS", cat: "PISOS-PORCELANATOS" } },
      { params: { id: "ACABADOS", cat: "VITROBLOCK" } },
      { params: { id: "MATERIALES-PARA-CONSTRUCCION", cat: "ACERO" } },
      { params: { id: "MATERIALES-PARA-CONSTRUCCION", cat: "AGREGADOS" } },
      {
        params: {
          id: "MATERIALES-PARA-CONSTRUCCION",
          cat: "IMPERMEABILIZANTES",
        },
      },
      { params: { id: "MATERIALES-PARA-CONSTRUCCION", cat: "LAMINAS" } },
      { params: { id: "MATERIALES-PARA-CONSTRUCCION", cat: "POLVOS" } },
      { params: { id: "MATERIALES-PARA-CONSTRUCCION", cat: "SELLADORES" } },
      { params: { id: "COCINA", cat: "CAMPANA" } },
      { params: { id: "COCINA", cat: "CUBIERTAS" } },
      { params: { id: "COCINA", cat: "FREGADERO" } },
      { params: { id: "COCINA", cat: "HIELERAS" } },
      { params: { id: "COCINA", cat: "HORNO" } },
      { params: { id: "COCINA", cat: "MANTELES" } },
      { params: { id: "COCINA", cat: "MEZCLADORA" } },
      { params: { id: "COCINA", cat: "PARRILLA" } },
      { params: { id: "COCINA", cat: "PLÁSTICOS" } },
      { params: { id: "COCINA", cat: "SARTENES" } },
      { params: { id: "COCINA", cat: "TARJAS" } },
      { params: { id: "COCINA", cat: "UTENSILIOS" } },
      { params: { id: "COCINA", cat: "VAJILLAS" } },
      { params: { id: "BAÑOS", cat: "ACCESORIOS-PARA-BAÑOS" } },
      { params: { id: "BAÑOS", cat: "CALENTADORES" } },
      { params: { id: "BAÑOS", cat: "CANCELES-Y-CABINAS" } },
      { params: { id: "BAÑOS", cat: "MUEBLES-PARA-BAÑOS" } },
      { params: { id: "BAÑOS", cat: "TINAS-E-HIDROMASAJES" } },
      { params: { id: "BAÑOS", cat: "LAVABOS-Y-OVALINES" } },
      { params: { id: "BAÑOS", cat: "REGADERAS" } },
      { params: { id: "BAÑOS", cat: "SANITARIOS" } },
      { params: { id: "FERRETERIA", cat: "MOLDURAS" } },
      { params: { id: "FERRETERIA", cat: "ADHESIVOS-Y-CINTAS" } },
      { params: { id: "FERRETERIA", cat: "ALBAÑILERIA" } },
      { params: { id: "FERRETERIA", cat: "ANUNCIOS" } },
      {
        params: { id: "FERRETERIA", cat: "APAGADORES,-CONECTORES-Y-PLACAS" },
      },
      { params: { id: "FERRETERIA", cat: "BOMBAS-Y-PRESURIZADORAS" } },
      { params: { id: "FERRETERIA", cat: "BROCAS" } },
      { params: { id: "FERRETERIA", cat: "CABLES-ELÉCTRICOS" } },
      { params: { id: "FERRETERIA", cat: "CADENAS" } },
      { params: { id: "FERRETERIA", cat: "CANALETAS" } },
      { params: { id: "FERRETERIA", cat: "CARGADORES" } },
      { params: { id: "FERRETERIA", cat: "CARPINTERÍA" } },
      {
        params: { id: "FERRETERIA", cat: "CENTRO-DE-CARGA-E-INTERRUPTORES" },
      },
      { params: { id: "FERRETERIA", cat: "CERRAJERIA" } },
      { params: { id: "FERRETERIA", cat: "CUERDAS" } },
      { params: { id: "FERRETERIA", cat: "DADOS" } },
      { params: { id: "FERRETERIA", cat: "DEL-HOGAR" } },
      { params: { id: "FERRETERIA", cat: "DESARMADORES" } },
      { params: { id: "FERRETERIA", cat: "DISCOS" } },
      { params: { id: "FERRETERIA", cat: "ELECTRICO" } },
      { params: { id: "FERRETERIA", cat: "ELÉCTRONICA" } },
      { params: { id: "FERRETERIA", cat: "ESCALERAS" } },
      { params: { id: "FERRETERIA", cat: "EXTENSIONES-Y-MULTICONTACTOS" } },
      { params: { id: "FERRETERIA", cat: "EXTRACTORES" } },
      { params: { id: "FERRETERIA", cat: "FERRETERÍA-GENERAL" } },
      { params: { id: "FERRETERIA", cat: "FLEXOMETROS" } },
      { params: { id: "FERRETERIA", cat: "FONTANERIA" } },
      { params: { id: "FERRETERIA", cat: "GUANTES" } },
      { params: { id: "FERRETERIA", cat: "LIJAS" } },
      { params: { id: "FERRETERIA", cat: "LLANAS-Y-CUCHARAS" } },
      { params: { id: "FERRETERIA", cat: "LLAVES-Y-ACCESORIOS" } },
      { params: { id: "FERRETERIA", cat: "LONAS" } },
      { params: { id: "FERRETERIA", cat: "MANGUERAS" } },
      { params: { id: "FERRETERIA", cat: "MANUALES" } },
      { params: { id: "FERRETERIA", cat: "MECANICA" } },
      { params: { id: "FERRETERIA", cat: "MENSULAS" } },
      { params: { id: "FERRETERIA", cat: "PINZAS" } },
      { params: { id: "FERRETERIA", cat: "PROTECTORES" } },
      { params: { id: "FERRETERIA", cat: "RIELES" } },
      { params: { id: "FERRETERIA", cat: "SEGURIDAD" } },
      { params: { id: "FERRETERIA", cat: "TORNILLERIA" } },
      { params: { id: "FERRETERIA", cat: "SOPORTES" } },
      { params: { id: "FERRETERIA", cat: "TINACOS-Y-CISTERNAS" } },
      { params: { id: "FERRETERIA", cat: "TUBERÍA" } },
      { params: { id: "HOGAR", cat: "HOGAR" } },
      { params: { id: "HOGAR", cat: "ALBERCAS" } },
      { params: { id: "HOGAR", cat: "BASCULAS" } },
      { params: { id: "HOGAR", cat: "CAMARAS-DE-SEGURIDAD" } },
      { params: { id: "HOGAR", cat: "DECORACION" } },
      { params: { id: "HOGAR", cat: "ILUMINACION" } },
      { params: { id: "HOGAR", cat: "JARDINERIA" } },
      { params: { id: "HOGAR", cat: "LAVADORAS-Y-SECADORAS" } },
      { params: { id: "HOGAR", cat: "LAVANDERIA" } },
      { params: { id: "HOGAR", cat: "LIMPIEZA" } },
      { params: { id: "HOGAR", cat: "LINEA-BLANCA" } },
      { params: { id: "HOGAR", cat: "MASCOTAS" } },
      { params: { id: "HOGAR", cat: "MUEBLES" } },
      { params: { id: "HOGAR", cat: "ORGANIZADORES" } },
      { params: { id: "HOGAR", cat: "PUERTAS-Y-VENTANAS" } },
      { params: { id: "HOGAR", cat: "VENTILACION-Y-CALEFACCIÓN" } },
    ],
    fallback: false,
  };
};

export async function getStaticProps({ params }) {
  const categorie = params.cat
    .replace(/á/g, "aacento")
    .replace(/é/g, "eacento")
    .replace(/í/g, "iacento")
    .replace(/ó/g, "oacento")
    .replace(/ú/g, "uacento")
    .replace(/Á/g, "Aacento")
    .replace(/É/g, "Eacento")
    .replace(/Í/g, "Iacento")
    .replace(/Ó/g, "Oacento")
    .replace(/Ú/g, "Uacento")
    .replace(/Ñ/g, "enne");

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_URL}/api/related-by-subcategory/${categorie}?first=1&last=20`
  );
  const { data: products } = await response.json();

  const responseBrands = await fetch(
    `${process.env.NEXT_PUBLIC_URL}/api/brands-sub-categories/${categorie}`
  );
  const { brands } = await responseBrands.json();

  return {
    props: {
      products,
      brands,

      title: `${params.cat.replace(/-/gi, " ")}`,
      mainCategorie: params.id,
    }, // se pasarán al componente de la página como props
  };
}

const Categories = (props) => {
  const {
    products = [],
    brands = [],

    title,
    mainCategorie,
  } = props;

  const [openFilters, setOpenFilters] = useState(false);
  const [seeking, setSeeking] = useState(false);
  const [routeWithFilters, setRouteWithFilters] = useState(false);
  const [resultsFilters, setResultsFilters] = useState(false);
  const [itemsLoaded, setItemsLoaded] = useState([]);
  const [showButton, setShowButton] = useState(false);

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

    const categories = selectCategories
      .map((categorie) => `'${categorie}'`)
      .toString();

    const brandsQuery = selectedBrands.map((brand) => `'${brand}'`).toString();

    let queryUrl = `/api/filters/(${brandsQuery})?categorie=(${categories})&first=0&last=${
      maxPrice.replace(/e/gi, "") || 100000
    }`;

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

  // Scroll

  const handleScroll = () => {
    window.scrollY > 8000 && setShowButton(true);
    window.scrollY < 3000 && setShowButton(false);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // :::::::::::::::::::::::::::::::::::::::::::::

  // useEffect(async () => {
  //   mainCategories.map(async ({ category_id }) => {
  //     const response = await fetch(
  //       `/api/categories/sub-categories/${category_id}`
  //     );
  //     const { data } = await response.json();
  //     // console.log(name, data);

  //     if (data) {
  //       data.map(async ({ name }) => {
  //         const categorie = name
  //           .replace(/á/g, "aacento")
  //           .replace(/é/g, "eacento")
  //           .replace(/í/g, "iacento")
  //           .replace(/ó/g, "oacento")
  //           .replace(/ú/g, "uacento")
  //           .replace(/Á/g, "Aacento")
  //           .replace(/É/g, "Eacento")
  //           .replace(/Í/g, "Iacento")
  //           .replace(/Ó/g, "Oacento")
  //           .replace(/Ú/g, "Uacento")
  //           .replace(/Ñ/gi, "enne");
  //         const response = await fetch(
  //           `/api/related-by-subcategory/${categorie}?first=1&last=3`
  //         );
  //         const { data: products } = await response.json();

  //         const responseBrands = await fetch(
  //           `/api/brands-sub-categories/${categorie}`
  //         );
  //         const { brands } = await responseBrands.json();

  //         console.log("====================================");
  //         console.log({
  //           name,
  //           products,
  //           brands,
  //         });
  //         console.log("====================================");
  //       });
  //     }
  //   });
  // }, []);

  // :::::::::::::::::::::::::::::::::::::::::::::

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

      {showButton && (
        <GoToTopButton
          type="button"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        />
      )}

      <main className={styles.MainStyle}>
        <Filter
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
            ruteLoadMore={`/api/related-by-subcategory/${title
              .replace(/ /g, "-")
              .replace(/á/g, "aacento")
              .replace(/é/g, "eacento")
              .replace(/í/g, "iacento")
              .replace(/ó/g, "oacento")
              .replace(/ú/g, "uacento")
              .replace(/Á/g, "Aacento")
              .replace(/É/g, "Eacento")
              .replace(/Í/g, "Iacento")
              .replace(/Ó/g, "Oacento")
              .replace(/Ú/g, "Uacento")
              .replace(/Ñ/g, "enne")}`}
          />
        ) : (
          <SectionEmpty>
            <TitleSection>{title}</TitleSection>
            <EmptyContainer>
              <AddNewProducts />
              <TextEmpty>Pronto tendremos productos aquí</TextEmpty>
            </EmptyContainer>
            {routeWithFilters && (
              <ClearFilters type="button" onClick={() => beforeFiltering()}>
                Quitar filtros
              </ClearFilters>
            )}
          </SectionEmpty>
        )}
        <Link href={`/categoria/${mainCategorie}`}>
          <LinkMainCategorie>
            Ver categoría <br /> {mainCategorie.replace(/-/g, " ")}
          </LinkMainCategorie>
        </Link>
      </main>
    </>
  );
};

export default Categories;
