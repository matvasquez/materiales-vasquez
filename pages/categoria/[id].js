import { useState, useEffect } from "react";
import Fetch from "isomorphic-unfetch";
import { useRouter } from "next/router";
import { NextSeo, LocalBusinessJsonLd } from "next-seo";

// Data
// import { articulos } from "../../database/articulos";

// Components
import CategorySection from "../../components/Category-Section/CategorySection";
import { AddNewProducts } from "../../components/IconsSVG/AddNewProducts";

// Styles
import {
  MainStyled,
  Title,
  SectionEmpty,
  TextEmpty,
  LoadMoreButton,
} from "../../styles/categoria/style";

const Category = ({ products }) => {
  const router = useRouter();
  const id = router.query.id;

  // const [products, setProducts] = useState([]);
  const [showButton, setShowButton] = useState(false);

  // useEffect(() => {
  //   if (articulos.length > 0 && id) {
  //     const data = articulos.filter(
  //       (item) => item.category === id.replace(/-/g, " ")
  //     );
  //     if (data) {
  //       setProducts(data.slice(0, 24));
  //       if (data.length >= 24) {
  //         setShowButton(true);
  //       } else {
  //         setShowButton(false);
  //       }
  //     }
  //   }
  // }, [id, articulos]);

  // const more = () => {
  //   // console.log("Mas");
  //   const data = articulos.filter(
  //     (item) => item.category === id.replace(/-/g, " ")
  //   );
  //   if (data) {
  //     let news = data.slice(products.length + 1, products.length + 25);
  //     setProducts(products.concat(news));
  //     if (news.length === 24) {
  //       setShowButton(true);
  //     } else {
  //       setShowButton(false);
  //     }
  //   }
  // };

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <NextSeo
        title={`${id.replace(/-/g, " ")} | Materiales Vasquez Hermanos`}
        description={`Amplia gama de productos de nuestra categoría ${id.replace(
          /-/g,
          " "
        )}`}
        canonical="https://www.materialesvasquezhnos.com.mx/"
        openGraph={{
          url: `https://www.materialesvasquezhnos.com.mx/`,
          title: `${id.replace(/-/g, " ")} | Materiales Vasquez Hermanos`,
          description: `Amplia gama de productos de nuestra categoría ${id.replace(
            /-/g,
            " "
          )}`,
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
        {id && <Title>{id.replace(/-/g, " ").toLowerCase()}</Title>}
        {products.length > 0 ? (
          <>
            <CategorySection data={products} />
            {/* {showButton && (
              <LoadMoreButton type="button" onClick={more}>
                Cargar más productos 
              </LoadMoreButton>
            )} */}
          </>
        ) : (
          <SectionEmpty>
            <AddNewProducts />
            <TextEmpty>Pronto tendremos productos aquí</TextEmpty>
          </SectionEmpty>
        )}
      </MainStyled>
    </>
  );
};

export default Category;

export const getStaticPaths = async () => {
  const getPaths = await Fetch(
    `${process.env.NEXT_PUBLIC_URL}/api/categories/main-menu`
  );
  const { data } = await getPaths.json();

  // Obtener las rutas que queremos pre-renderizar
  const paths = data.map((category) => ({
    params: { id: category.name },
  }));

  return { paths, fallback: true };
};

export const getStaticProps = async ({ params }) => {
  const getProducts = await Fetch(
    `${process.env.NEXT_PUBLIC_URL}/api/related-by-category/${params.id.replace(
      /Ñ/gi,
      "enne"
    )}?first=1&last=24`
  );
  const { data: products } = await getProducts.json();

  console.log("====================================");
  console.log(params);
  console.log(products.length);
  console.log("====================================");

  return {
    props: {
      products,
    },
    revalidate: 10,
  };
};
