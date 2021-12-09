import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useGetProductos } from "../../hooks/useGetProductos";
import { NextSeo, LocalBusinessJsonLd } from "next-seo";

// Data
// import { articulos } from "../../database/articulos";

// Components
// import CategorySection from "../../components/Category-Section/CategorySection";
import FavoritesItem from "../../components/Favorites-Item/FavoritesItem";
import { AddNewProducts } from "../../components/IconsSVG/AddNewProducts";
import { SuspensoryPoints } from "../../components/Loaders/SuspensoryPoints";

// Styles
import {
  MainStyled,
  Title,
  SectionEmpty,
  TextEmpty,
} from "../../styles/categoria/style";
import { ItemsContainer } from "../../components/Home-Sections/style";

const Category = () => {
  const router = useRouter();
  const id = router.query.id;
  const [articles] = useGetProductos();

  const [products, setProducts] = useState([]);

  useEffect(() => {
    if (articles.length > 0 && id) {
      const data = articles.filter((item) =>
        item.description.includes(id.toUpperCase())
      );
      setProducts(data.slice(0, 42));
    }
  }, [id, articles]);

  return (
    <>
      <NextSeo
        title={`${
          id ? id.replace(/-/g, " ") : "Categoría"
        } | Materiales Vasquez Hermanos`}
        description={`Amplia gama de productos ${
          id && `de nuestra categoría ${id.replace(/-/g, " ")}`
        }`}
        canonical="https://www.materialesvasquezhnos.com.mx/"
        openGraph={{
          url: `https://www.materialesvasquezhnos.com.mx/`,
          title: `Categoría ${
            id && id.replace(/-/g, " ")
          } | Materiales Vasquez Hermanos`,
          description: `Amplia gama de productos ${
            id && `de nuestra categoría ${id.replace(/-/g, " ")}`
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
        {id && <Title>{id.replace(/-/g, " ").toLowerCase()}</Title>}
        {products.length > 0 ? (
          <ItemsContainer>
            {products.map((article, i) => (
              <FavoritesItem key={article.articulo_id} {...article} />
            ))}
          </ItemsContainer>
        ) : (
          <SectionEmpty>
            <SuspensoryPoints />
          </SectionEmpty>
        )}
      </MainStyled>
    </>
  );
};

export default Category;
