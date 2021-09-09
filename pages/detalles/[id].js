import React from "react";
import Link from "next/link";
import { connect } from "react-redux";
// import Head from "next/head";
import { NextSeo } from "next-seo";
import fetch from "isomorphic-unfetch";
import { useMyItems } from "../../hooks/useMyItems";
import { useGetStock } from "../../hooks/useGetStock";

//Actions
import {
  setMyCart,
  setPricesToCart,
  setIitemsIliked,
  setDeleteFavorite,
} from "../../actions";

//Components
import { HeartEmpty } from "../../components/IconsSVG/HeartEmpty";
import { HeartFull } from "../../components/IconsSVG/HeartFull";
import PreviewItem from "../../components/Preview-Item/PreviewItem";

// Styles
import styles from "../../styles/components/Main.module.css";

// Styled-Components
import {
  MainInfo,
  ImageContainer,
  LikeContainer,
  Info,
  NameAndPrice,
  Name,
  Price,
  DescriptionH3,
  Paragraph,
  Categories,
  Category,
  Sku,
  Span,
  ButtonStyled,
  NotAvailable,
  RelatedArticles,
  RelatedTitle,
  PreviewItemContainer,
} from "../../styles/detalles/style";

// Genera las rutas de el detalle de todos los productos
// export const getStaticPaths = async () => {
//   const response = await fetch(
//     "https://api-vasquez.herokuapp.com/api/products-list"
//   );
//   const { data } = await response.json();

//   const paths = data.map(({ articulo_id }) => ({
//     context.params: {
//       id: articulo_id.replace(/ /gi, "space").replace(/\//gi, "slash"),
//     },
//   }));

//   return {
//     paths,
//     fallback: false,
//   };
// };

export const getServerSideProps = async ({ params }) => {
  // Solicita los datos del articulo principal
  const responseDetails = await fetch(
    `https://api-vasquez.herokuapp.com/api/detalles/${params.id}`
  );
  const { data: product } = await responseDetails.json();

  // Solicita articulos relacionados por nombre
  const responseRelatedByName = await fetch(
    `https://api-vasquez.herokuapp.com/api/related-by-name/${product[0].name
      .split(" ")[0]
      .replace(/\//gi, "slash")}?first=1&last=6`
  );
  const { data: related } = await responseRelatedByName.json();

  // Solicita articulos relacionados por categoria
  const responseRelatedByCategory = await fetch(
    `https://api-vasquez.herokuapp.com/api/related-by-category/${product[0].category.replace(
      / /gi,
      "-"
    )}?first=1&last=6`
  );
  const { data: relatedCategory } = await responseRelatedByCategory.json();

  return {
    props: {
      product: product[0],
      related: related,
      relatedCategory: relatedCategory,
    },
  };
};

const ProductPage = (props) => {
  const {
    product,
    related = [],
    relatedCategory = [],

    myCart,
    itemsIliked,

    setMyCart,
    setPricesToCart,
    setIitemsIliked,
    setDeleteFavorite,
  } = props;

  // Hook que verifica si el producto esta entre los favoritos
  const [yesItIsMineLike] = useMyItems(product.articulo_id, itemsIliked);
  // Hook que verifica si el producto esta en el carrito
  const [yesItIsMineCart] = useMyItems(product.articulo_id, myCart);
  // Hook que solicita el Stock
  const [stock] = useGetStock(product.articulo_id);

  // Envia al Carrito y a la lista de precios
  const handleSetCart = () => {
    setMyCart({ ...product, initialQuantity: 1 });
    setPricesToCart(product.price);
  };

  // Envia a favoritos
  const handleLike = () => {
    setIitemsIliked({ ...product });
  };

  // Elimina de favoritos
  const handleDeleteFavorite = () => {
    setDeleteFavorite(product.articulo_id);
  };

  // Formatea el precio
  const formatter = new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  return (
    <>
      {/* <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1"
        />
        <meta property="og:type" content="website" />
        <meta
          key="og:title"
          property="og:title"
          content={`${product.name} | Materiales Vasquez Hermanos`}
        />
        <meta
          key="og:url"
          property="og:url"
          content="https://www.materialesvasquezhnos.com.mx/"
        />
        <meta
          property="og:image"
          content="https://res.cloudinary.com/duibtuerj/image/upload/v1630083340/brand/meta-image_rcclee.jpg"
        />
        <meta
          key="og:description"
          property="og:description"
          content={product.description}
        />
        <title>{`${product.name} | Materiales Vasquez Hermanos`}</title>
      </Head> */}
      <NextSeo
        title={`${product.name} | Materiales Vasquez Hermanos`}
        description={product.description}
        canonical="https://www.materialesvasquezhnos.com.mx/"
        openGraph={{
          url: `https://www.materialesvasquezhnos.com.mx/detalles/${product.articulo_id}`,
          title: `${product.name}`,
          description: `${product.description}`,
          images: [
            {
              url: `data:image/jpg;base64,${product.image_url}`,
              width: 200,
              height: 200,
              alt: `Fotografía de ${product.name}`,
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
      <main className={styles.MainHome}>
        <MainInfo>
          <LikeContainer
            type="button"
            onClick={yesItIsMineLike ? handleDeleteFavorite : handleLike}
          >
            {yesItIsMineLike ? <HeartFull /> : <HeartEmpty />}
          </LikeContainer>
          <ImageContainer>
            <img
              src={`data:image/jpg;base64,${product.image_url}`}
              width={300}
              height={300}
              alt={`Fotografía de ${product.name}`}
            />
          </ImageContainer>
          <Info>
            <NameAndPrice>
              {product.name && <Name>{product.name}</Name>}
              {product.price && (
                <Price>${formatter.format(product.price)}</Price>
              )}
            </NameAndPrice>
            {product.description && (
              <>
                <DescriptionH3>Descripción</DescriptionH3>
                <Paragraph>
                  {product.description.length > 99
                    ? product.description
                        .slice(0, 99)
                        .concat("...")
                        .toLowerCase()
                    : product.description.toLowerCase()}
                </Paragraph>
              </>
            )}
            <Paragraph lowStock={stock <= 10 && true}>
              {stock ? (
                <>
                  {stock > 10
                    ? `${stock} disponibles`
                    : `Solo quedan ${stock} disponibles`}
                </>
              ) : (
                <>{stock === 0 ? "Sin existencias" : "Consultando..."}</>
              )}
            </Paragraph>
            <Categories>
              Categoría
              <Link href={`/todos/${product.category}`} passHref>
                <Category>{product.category}</Category>
              </Link>
            </Categories>
            <Sku>
              SKU: <Span>{product.articulo_id}</Span>
            </Sku>
            {stock > 0 ? (
              <>
                {!yesItIsMineCart ? (
                  <ButtonStyled type="button" onClick={handleSetCart}>
                    Añadir al carrito
                  </ButtonStyled>
                ) : (
                  <ButtonStyled type="button" inMyCArt={yesItIsMineCart}>
                    Ya está en tu carrito
                  </ButtonStyled>
                )}
              </>
            ) : (
              <NotAvailable>No disponible</NotAvailable>
            )}
          </Info>
        </MainInfo>
        {related.length > 0 && (
          <RelatedArticles>
            <RelatedTitle>Relacionados</RelatedTitle>
            <PreviewItemContainer>
              <>
                {related.map((article) => (
                  <PreviewItem
                    key={article.articulo_id + article.price}
                    {...article}
                    isRelated={true}
                  />
                ))}
              </>
            </PreviewItemContainer>
          </RelatedArticles>
        )}
        {relatedCategory.length > 0 && (
          <RelatedArticles>
            <RelatedTitle>
              Puede que te interese{" "}
              {/* <span>{product.category.toLowerCase()}</span> */}
            </RelatedTitle>
            <PreviewItemContainer>
              <>
                {relatedCategory.map((article) => (
                  <PreviewItem
                    key={article.articulo_id}
                    {...article}
                    isRelated={true}
                  />
                ))}
              </>
            </PreviewItemContainer>
          </RelatedArticles>
        )}
      </main>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    myCart: state.myCart,
    articles: state.articles,
    itemsIliked: state.itemsIliked,
    carIsEmpty: state.carIsEmpty,
    carIsOpen: state.carIsOpen,
  };
};

const mapDispatchToProps = {
  setMyCart,
  setPricesToCart,
  setIitemsIliked,
  setDeleteFavorite,
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductPage);
