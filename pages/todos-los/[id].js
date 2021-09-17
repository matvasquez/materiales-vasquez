import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import fetch from "isomorphic-unfetch";
import { connect } from "react-redux";

//Actions
import { setItemsLoaded } from "../../actions";

// Components
import ArticlesSection from "../../components/Articles-Section/index";

// Styles
import styles from "../../styles/components/Main.module.css";
import { Conatiner } from "../../components/Loaders/SuspensoryPoints/style";

// Genera las rutas la lista de productos de las secciones de la página principal
// export const getStaticPaths = async () => {
//   return {
//     paths: [{ params: { id: "lámparas" } }, { params: { id: "Menos-de-200" } }],
//     fallback: false,
//   };
// };

// export async function getStaticProps({ params }) {
//   let products;

//   if (params.id === "lámparas") {
//     const responseSection = await fetch(
//       `https://api-vasquez.herokuapp.com/api/products-by-name/LAMPARA?first=1&last=20`
//     );
//     const { data } = await responseSection.json();
//     products = await data;
//   } else if (params.id === "Menos-de-200") {
//     const responseSectionPrice = await fetch(
//       `https://api-vasquez.herokuapp.com/api/products-by-price/200?first=1&last=20`
//     );
//     const { data } = await responseSectionPrice.json();
//     products = await data;
//   }

//   return {
//     props: {
//       products,
//       title: params.id.replace(/-/gi, " "),
//       description:
//         "Amplia gama de productos para obra negra, ferretería, muebles, y artículos para el hogar.",
//       image:
//         "https://res.cloudinary.com/duibtuerj/image/upload/v1630083340/brand/meta-image_rcclee.jpg",
//       ogurl: "https://www.materialesvasquezhnos.com.mx",
//     }, // se pasarán al componente de la página como props
//   };
// }

const AllSections = (props) => {
  const {
    // products,
    // title,
    // description,
    // image,
    // ogurl,
    itemsLoaded,
    setItemsLoaded,
  } = props;
  const router = useRouter();
  const { id } = router.query;
  const [products, setProducts] = useState([]);

  console.log("id: ", id);
  console.log("products: ", products);

  useEffect(async () => {
    if (id) {
      if (id === "lámparas") {
        const responseSection = await fetch(
          `/api/products-by-name/LAMPARA?first=1&last=20`
        );
        const { data } = await responseSection.json();
        setProducts(data);
      } else if (id === "Menos-de-200") {
        const responseSectionPrice = await fetch(
          `/api/products-by-price/200?first=1&last=20`
        );
        const { data } = await responseSectionPrice.json();
        setProducts(data);
      }
    }
  }, [id]);

  useEffect(() => {
    setItemsLoaded(products);
  }, [products]);

  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1"
        />

        {id && (
          <title>{`${id.replace(
            /-/gi,
            " "
          )} | Materiales Vasquez Hermanos`}</title>
        )}
      </Head>

      <main className={styles.MainStyle}>
        {products.length > 0 && (
          <ArticlesSection
            title={id.replace(/-/gi, " ")}
            products={itemsLoaded}
            route={true}
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
};

export default connect(mapStateToProps, mapDispatchToProps)(AllSections);
