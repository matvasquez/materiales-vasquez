import React from "react";
import Link from "next/link";

// Styled-Components
import {
  SearchResult,
  ImageContainer,
  InfoContainer,
  Name,
  Category,
  Price,
  NotFound,
} from "./style";

export const Results = ({
  articulo_id,
  name,
  image_url,
  category,
  price,
  clear,
}) => {
  return (
    <SearchResult onClick={() => clear([])}>
      <Link
        href={`/detalles/${articulo_id
          .replace(/ /gi, "space")
          .replace(/\//gi, "slash")}`}
        passHref
      >
        <a aria-label={`Ver detalles de ${name}`}>
          <ImageContainer>
            <img
              src={`data:image/jpg;base64,${image_url}`}
              width={300}
              height={300}
              alt={`Fotografía de ${name}`}
            />
          </ImageContainer>
          <InfoContainer>
            <Name>{name.toLowerCase()}</Name>
            <Category>{category.toLowerCase()}</Category>
            <Price>${price}</Price>
          </InfoContainer>
        </a>
      </Link>
    </SearchResult>
  );
};
