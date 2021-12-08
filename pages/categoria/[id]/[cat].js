import { useState, useEffect } from "react";
import Fetch from "isomorphic-unfetch";
import { useRouter } from "next/router";
import { NextSeo, LocalBusinessJsonLd } from "next-seo";

// Data
// import { articulos } from "../../../database/articulos";

// Components
import CategorySection from "../../../components/Category-Section/CategorySection";
import { AddNewProducts } from "../../../components/IconsSVG/AddNewProducts";
import { SuspensoryPoints } from "../../../components/Loaders/SuspensoryPoints";

// Styles
import {
  MainStyled,
  Title,
  SectionEmpty,
  TextEmpty,
  LoadMoreButton,
} from "../../../styles/categoria/style";

const Category = ({ initialProducts }) => {
  const router = useRouter();
  const cat = router.query.cat || "";

  const [products, setProducts] = useState([]);
  const [showButton, setShowButton] = useState(false);
  const [loadingProducts, setLoadingProducts] = useState(false);

  useEffect(() => {
    setProducts(initialProducts);
  }, [initialProducts]);

  useEffect(() => {
    products.length > 17 ? setShowButton(true) : setShowButton(false);
  }, [products]);

  const more = async () => {
    setLoadingProducts(true);
    const categorie = cat
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

    const getProducts = await Fetch(
      `/api/related-by-subcategory/${categorie}?first=${
        products.length + 1
      }&last=${products.length + 18}`
    );
    const { data: news } = await getProducts.json();

    if (news.length > 0) {
      setProducts(products.concat(news));
      setLoadingProducts(false);
      news.length < 18 ? setShowButton(false) : setShowButton(true);
    }
  };

  return (
    <>
      <NextSeo
        title={`${
          cat ? cat.replace(/-/g, " ") : "Categoría"
        } | Materiales Vasquez Hermanos`}
        description={`Amplia gama de productos ${
          cat && `de nuestra categoría ${cat.replace(/-/g, " ")}`
        }`}
        canonical="https://www.materialesvasquezhnos.com.mx/"
        openGraph={{
          url: `https://www.materialesvasquezhnos.com.mx`,
          title: `Categoría ${
            cat && cat.replace(/-/g, " ")
          } | Materiales Vasquez Hermanos`,
          description: `Amplia gama de productos ${
            cat && `de nuestra categoría ${cat.replace(/-/g, " ")}`
          }`,
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
        {cat && <Title>{cat.replace(/-/g, " ").toLowerCase()}</Title>}
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
    `${process.env.NEXT_PUBLIC_URL}/api/categories/all-categories`
  );
  const { data } = await getPaths.json();

  // Obtener las rutas que queremos pre-renderizar
  const paths = data.map(({ categorie, subcategorie }) => ({
    params: {
      id: categorie.replace(/ /g, "-").replace(/Ñ/gi, "enne"),
      cat: subcategorie.replace(/ /g, "-"),
    },
  }));

  return { paths, fallback: true };
};

export const getStaticProps = async ({ params }) => {
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

  const url = `${process.env.NEXT_PUBLIC_URL}/api/related-by-subcategory/${categorie}?first=1&last=18`;

  const getProducts = await Fetch(url);
  const { data: initialProducts } = await getProducts.json();

  return {
    props: {
      initialProducts,
    },
    revalidate: 10,
  };
};
