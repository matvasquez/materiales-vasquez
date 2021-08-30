import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { connect } from "react-redux";
import Head from "next/head";
import fetch from "isomorphic-unfetch";
import { useMyItems } from "../../hooks/useMyItems";

//Actions
import {
  setMyCart,
  setPricesToCart,
  setIitemsIliked,
  setDeleteFavorite,
  setCloseCart,
} from "../../actions";

//Components
import { HeartEmpty } from "../../components/IconsSVG/HeartEmpty";
import { HeartFull } from "../../components/IconsSVG/HeartFull";

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
  MainEmpty,
} from "../../styles/detalles/style";

export const getStaticPaths = async () => {
  const response = await fetch(
    "https://api-vasquez.herokuapp.com/api/products-list"
  );
  const { data } = await response.json();

  const paths = data.map(({ articulo_id }) => ({
    params: {
      id: articulo_id.replace(/ /gi, "space").replace(/\//gi, "slash"),
    },
  }));

  // console.log("paths: ", paths);

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async ({ params }) => {
  console.log("params id:", params.id);
  const response = await fetch(
    `https://api-vasquez.herokuapp.com/api/detalles/${params.id}`
    // `http://localhost:3015/api/detalles/${params.id}`
  );
  const { data } = await response.json();

  return {
    props: {
      product: data[0],
    },
  };
};

const ProductPage = ({
  product,

  myCart,
  articles,
  itemsIliked,
  carIsEmpty,
  carIsOpen,

  setMyCart,
  setPricesToCart,
  setIitemsIliked,
  setDeleteFavorite,
  setCloseCart,
}) => {
  const [yesItIsMineLike] = useMyItems(product.articulo_id, itemsIliked);
  const [yesItIsMineCart] = useMyItems(product.articulo_id, myCart);
  const [stock, setStock] = useState("");

  useEffect(async () => {
    window
      .fetch(
        `https://pruebas-next-sql.vercel.app/api/stock/${product.articulo_id}`
      )
      .then((response) => response.json())
      .then(({ data }) => {
        setStock(data[0].stock);
      })
      .catch((error) => {
        console.log("Error: ", error);
      });
  }, []);

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

  const formatter = new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="initial-scale=1.0, width=device-width user-scalable=no"
        />

        <meta
          name="description"
          content={product.description}
          key="descriptionIndex"
        />

        {/* Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content={product.name} key="og:titleIndex" />
        <meta
          property="og:description"
          content={product.description}
          key="og:descriptionIndex"
        />
        <meta
          property="og:image"
          content={product.image_url}
          key="og:imageIndex"
        />
        <meta
          property="og:url"
          content={`https://www.materialesvasquezhnos.com.mx/detalles/${product.name}`}
          key="og:urlIndex"
        />

        {/* twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content={product.name}
          key="twitter:titleIndex"
        />
        <meta
          name="twitter:description"
          content={product.description}
          key="twitter:descriptionIndex"
        />
        <meta
          name="twitter:image"
          content={product.image_url}
          index="twitter:imageIndex"
        />
        <title>{`${product.name} | Materiales Vasquez Hermanos`}</title>
      </Head>
      <main className={styles.MainStyle}>
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
              <Name>{product.name}</Name>
              <Price>${formatter.format(product.price)}</Price>
            </NameAndPrice>
            <DescriptionH3>Descripción</DescriptionH3>
            <Paragraph>
              {product.description.length > 99
                ? product.description.slice(0, 99).concat("...").toLowerCase()
                : product.description.toLowerCase()}
            </Paragraph>
            <Paragraph lowStock={stock < 10 && true}>
              {stock > 10 ? (
                `${stock} disponibles`
              ) : (
                <>
                  {stock
                    ? `Solo quedan ${stock} disponibles`
                    : "Sin existencias"}
                </>
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
  setCloseCart,
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductPage);
