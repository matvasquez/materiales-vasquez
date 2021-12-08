import { useState, useEffect } from "react";
import Fetch from "isomorphic-unfetch";
import { useRouter } from "next/router";
import { NextSeo, LocalBusinessJsonLd } from "next-seo";

// Data
// import { articulos } from "../../database/articulos";

// Components
import CategorySection from "../../components/Category-Section/CategorySection";
import { AddNewProducts } from "../../components/IconsSVG/AddNewProducts";
import { SuspensoryPoints } from "../../components/Loaders/SuspensoryPoints";

// Styles
import {
  MainStyled,
  Title,
  SectionEmpty,
  TextEmpty,
  LoadMoreButton,
} from "../../styles/categoria/style";

const Category = ({ initialProducts }) => {
  const router = useRouter();
  const id = router.query.id;

  const [products, setProducts] = useState([]);
  const [showButton, setShowButton] = useState(false);
  const [loadingProducts, setLoadingProducts] = useState(false);

  useEffect(() => {
    setProducts(initialProducts);
  }, [initialProducts]);

  useEffect(() => {
    products.length > 23 ? setShowButton(true) : setShowButton(false);
  }, [products]);

  const more = async () => {
    setLoadingProducts(true);
    const getProducts = await Fetch(
      `/api/related-by-category/${id.replace(/Ñ/gi, "enne")}?first=${
        products.length + 1
      }&last=${products.length + 24}`
    );
    const { data: news } = await getProducts.json();
    console.log("news: ", news.length);

    if (news.length > 0) {
      setProducts(products.concat(news));
      setLoadingProducts(false);
      news.length < 24 ? setShowButton(false) : setShowButton(true);
    }
  };

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
          url: `https://www.materialesvasquezhnos.com.mx`,
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
            {showButton && (
              <LoadMoreButton type="button" onClick={more}>
                {loadingProducts ? (
                  <SuspensoryPoints />
                ) : (
                  `Cargar más productos`
                )}
              </LoadMoreButton>
            )}
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
  const { data: initialProducts } = await getProducts.json();

  return {
    props: {
      initialProducts,
    },
    revalidate: 10,
  };
};
