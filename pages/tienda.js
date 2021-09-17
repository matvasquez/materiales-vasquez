import React, { useState, useEffect } from "react";
import { NextSeo, LocalBusinessJsonLd } from "next-seo";
import fetch from "isomorphic-unfetch";
import { connect } from "react-redux";

//Actions
import { setItemsLoaded, setResetItemsLoaded } from "../actions";

// Components
import ArticlesSection from "../components/Articles-Section/index";
import Filter from "../components/Filters/Filters";

// Styles
import styles from "../styles/components/Main.module.css";

export async function getServerSideProps(context) {
  const responseSection = await fetch(
    `${process.env.NEXT_PUBLIC_URL}/api/new-products?first=1&last=20`
  );
  const { data: newProducts } = await responseSection.json();

  const responseBrands = await fetch(
    `${process.env.NEXT_PUBLIC_URL}/api/brands-tienda`
  );
  const { brands } = await responseBrands.json();

  const responseCategories = await fetch(
    `${process.env.NEXT_PUBLIC_URL}/api/categories/all-categories`
  );
  const { data: categories } = await responseCategories.json();

  return {
    props: {
      newProducts,
      brands,
      categories,
    }, // se pasarán al componente de la página como props
  };
}

const Store = (props) => {
  const {
    newProducts,
    brands,
    categories,
    itemsLoaded,
    setItemsLoaded,
    setResetItemsLoaded,
  } = props;

  const [openFilters, setOpenFilters] = useState(false);
  const [seeking, setSeeking] = useState(false);
  const [routeWithFilters, setRouteWithFilters] = useState(false);

  // const [newProducts, setNewProducts] = useState([]);
  // const [brands, setBrands] = useState([]);
  // const [categories, setCategories] = useState([]);

  // useEffect(async () => {
  //   const response = await fetch(`/api/new-products?first=1&last=20`);
  //   const { data: dataNewProducts } = await response.json();
  //   setNewProducts(dataNewProducts);

  //   const responseBrands = await fetch(`/api/brands-tienda`);
  //   const { brands: dataBrands } = await responseBrands.json();
  //   setBrands(dataBrands);

  //   const responseCategories = await fetch(`/api/categories/all-categories`);
  //   const { data: dataCategories } = await responseCategories.json();
  //   setCategories(dataCategories);
  // }, []);

  const handleOpenFilters = () => {
    setOpenFilters(!openFilters);
  };

  useEffect(() => {
    setItemsLoaded(newProducts);
  }, [newProducts]);

  const applyFilters = async (minPrice, maxPrice, selectedBrands) => {
    setSeeking(true);
    const brandsQuery = selectedBrands.map((brand) => `'${brand}'`);

    const response = await fetch(
      `${
        process.env.NEXT_PUBLIC_URL
      }/api/filters/(${brandsQuery.toString()})?categorie=todas&first=${
        minPrice.replace(/e/gi, "") || 0
      }&last=${maxPrice.replace(/e/gi, "") || 100000}`
    );

    const { data } = await response.json();

    if (data) {
      setResetItemsLoaded();
      setItemsLoaded(data);
      setSeeking(false);
      handleOpenFilters();
      setRouteWithFilters(true);
    }
  };

  const beforeFiltering = () => {
    setResetItemsLoaded();
    setItemsLoaded(newProducts);
    setOpenFilters(false);
  };

  return (
    <>
      <NextSeo
        title={`Tienda | Materiales Vasquez Hermanos`}
        description={`Encuentra los mejores productos en nuestra tienda`}
        canonical="https://www.materialesvasquezhnos.com.mx/"
        openGraph={{
          url: `https://www.materialesvasquezhnos.com.mx/tienda`,
          title: `Nuestra Tienda | Materiales Vasquez Hermanos`,
          description: `Encuentra los mejores productos en nuestra tienda`,
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
        name="Tienda | Materiales Vasquez Hermanos"
        description="Encuentra los mejores productos en nuestra tienda"
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

      <main className={styles.MainStyle}>
        <Filter
          brands={brands}
          categories={categories}
          isOpen={openFilters}
          handleOpenFilters={handleOpenFilters}
          applyFilters={applyFilters}
          seeking={seeking}
          setRouteWithFilters={setRouteWithFilters}
          beforeFiltering={beforeFiltering}
        />
        {itemsLoaded.length > 0 && (
          <ArticlesSection
            title="Tienda"
            products={itemsLoaded}
            route={true}
            routeWithFilters={routeWithFilters}
            handleOpenFilters={handleOpenFilters}
          />
        )}
      </main>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    itemsLoaded: state.itemsLoaded,
  };
};

const mapDispatchToProps = {
  setItemsLoaded,
  setResetItemsLoaded,
};

export default connect(mapStateToProps, mapDispatchToProps)(Store);
