import React, { useState } from "react";
import Link from "next/link";
import { connect } from "react-redux";
import { useMyItems } from "../../hooks/useMyItems";

//Actions
import {
  setMyCart,
  setPricesToCart,
  setIitemsIliked,
  setDeleteFavorite,
  setOpenCart,
} from "../../actions";

//Components
import { HeartEmpty } from "../IconsSVG/HeartEmpty";
import { HeartFull } from "../IconsSVG/HeartFull";

// Styled-Components
import {
  ArticleStyled,
  AnchorStyled,
  Name,
  Price,
  ButtonsContainer,
  ButtonLike,
  ButtonAdd,
} from "./style";

// Formatear precio
const formatter = new Intl.NumberFormat("en-US", {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

const PreviewItem = (props) => {
  const {
    articulo_id,
    image_url,
    name,
    price,
    index,
    itemsIliked,
    myCart,
    setIitemsIliked,
    setDeleteFavorite,
    setMyCart,
    setPricesToCart,
    setOpenCart,
  } = props;

  // Hook que verifica si el producto esta entre los favoritos
  const [yesItIsMineLike] = useMyItems(articulo_id, itemsIliked);
  // Hook que verifica si el producto esta en el carrito
  const [yesItIsMineCart] = useMyItems(articulo_id, myCart);

  // Envia al Carrito y a la lista de precios
  const handleSetCart = () => {
    setMyCart({ articulo_id, image_url, name, price, initialQuantity: 1 });
    setPricesToCart(price);
  };

  // Envia a favoritos
  const handleLike = () => {
    setIitemsIliked({ articulo_id, image_url, name, price });
  };

  // Elimina de favoritos
  const handleDeleteFavorite = () => {
    setDeleteFavorite(articulo_id);
  };

  return (
    <ArticleStyled different={index}>
      <Link
        href={`/detalles/${articulo_id
          .replace(/ /gi, "space")
          .replace(/\//gi, "slash")}`}
        passHref
      >
        <AnchorStyled aria-label={`Ver detalles de ${name}`}>
          <img
            src={`data:image/jpg;base64,${image_url}`}
            width={300}
            height={300}
            alt={`Fotografía de ${name}`}
          />
        </AnchorStyled>
      </Link>
      <Name>{name.toLowerCase()}</Name>
      <Price>${formatter.format(price)}</Price>
      <ButtonsContainer>
        <ButtonLike
          type="button"
          onClick={yesItIsMineLike ? handleDeleteFavorite : handleLike}
        >
          <>{yesItIsMineLike ? <HeartFull /> : <HeartEmpty />}</>
        </ButtonLike>
        <ButtonAdd
          type="button"
          inMyCArt={yesItIsMineCart}
          onClick={yesItIsMineCart ? () => setOpenCart() : handleSetCart}
        >
          {yesItIsMineCart ? "Ver el carrito" : "Añadir al carrito"}
        </ButtonAdd>
      </ButtonsContainer>
    </ArticleStyled>
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
  setOpenCart,
};

export default connect(mapStateToProps, mapDispatchToProps)(PreviewItem);
