import React from "react";
import Link from "next/link";

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

const PreviewItem = ({ row_id, articulo_id, image_url, name, price }) => {
  return (
    <ArticleStyled>
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
        <ButtonLike type="button">
          <HeartEmpty />
        </ButtonLike>
        <ButtonAdd type="button">Add to cart</ButtonAdd>
      </ButtonsContainer>
    </ArticleStyled>
  );
};

export default PreviewItem;
