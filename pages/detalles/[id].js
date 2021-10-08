import React, { useEffect, useState } from "react";
import Link from "next/link";
import { connect } from "react-redux";
import { NextSeo, ProductJsonLd } from "next-seo";
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
import { Whatsapp } from "../../components/IconsSVG/Whatsapp";
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
  LinkIcon,
} from "../../styles/detalles/style";

export const getServerSideProps = async ({ params }) => {
  // Solicita los datos del articulo principal
  const responseDetails = await fetch(
    `${process.env.NEXT_PUBLIC_URL}/api/detalles/${params.id}`
  );
  const { data: product } = await responseDetails.json();
  // Solicita articulos relacionados por nombre

  const responseRelatedByName = await fetch(
    `${process.env.NEXT_PUBLIC_URL}/api/related-by-name/${product[0].name
      .split(" ")[0]
      .replace(/\//gi, "slash")}?first=1&last=6`
  );
  const { data: related } = await responseRelatedByName.json();

  // Solicita articulos relacionados por categoria
  const responseRelatedByCategory = await fetch(
    `${
      process.env.NEXT_PUBLIC_URL
    }/api/related-by-category/${product[0].category.replace(
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
  const [currentUrl, setCurrentUrl] = useState("");

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

  useEffect(async () => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_URL}/api/detalles/${product.articulo_id}`
    );
    const { data } = await response.json();

    console.log("data: ", data[0]);
  }, []);

  useEffect(() => {
    if (window) {
      console.log(window.location);
      setCurrentUrl(window.location);
    }
  }, []);

  return (
    <>
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
              url: `https://res.cloudinary.com/duibtuerj/image/upload/v1630083340/brand/meta-image_rcclee.jpg`,
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

      <ProductJsonLd
        productName={`${product.name}`}
        images={[
          `https://res.cloudinary.com/duibtuerj/image/upload/v1630083340/brand/meta-image_rcclee.jpg`,
        ]}
        description={product.description}
        //brand={product.name}
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
              Categorías
              <Link
                href={`/categoria/${product.category.replace(/ /gi, "-")}`}
                passHref
              >
                <Category>{product.category}</Category>
              </Link>{" "}
              {product.main_category && (
                <Link
                  href={`/categoria/${product.category.replace(
                    / /gi,
                    "-"
                  )}/${product.main_category.replace(/ /gi, "-")}`}
                  passHref
                >
                  <Category>{product.main_category}</Category>
                </Link>
              )}
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
        {currentUrl !== "" && (
          <LinkIcon
            href={`https://api.whatsapp.com/send?phone=522288366283&text=Hola,%20quisiera%20obtener%20m%C3%A1s%20informaci%C3%B3n%20sobre%20este%20art%C3%ADculo%20:%20${currentUrl}`}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Enlace a Twitter"
            bg="#25d366"
          >
            <Whatsapp width="3rem" />
            Pregunta por este artículo
          </LinkIcon>
        )}
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
