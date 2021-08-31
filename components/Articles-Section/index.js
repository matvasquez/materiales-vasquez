import React from "react";
import Link from "next/link";

// Components
import PreviewItem from "../Preview-Item/PreviewItem";

// Styled-Components
import {
  SectionStyled,
  TitleSection,
  ItemsContainer,
  ButtonMore,
  LoadMoreButton,
} from "./style";

const ArticlesSection = ({ title, products, route }) => {
  return (
    <SectionStyled>
      <TitleSection>{title}</TitleSection>
      <ItemsContainer>
        {products &&
          products.map((product, i) => (
            <PreviewItem key={product.articulo_id} {...product} index={i} />
          ))}
      </ItemsContainer>
      {route ? (
        <LoadMoreButton
          type="button"
          onClick={() => console.log("Cargar mas...")}
        >
          Cargar mas
        </LoadMoreButton>
      ) : (
        <Link
          href={
            title === "Productos Nuevos"
              ? "tienda"
              : `/todos-los/${title.replace(/ /gi, "-")}`
          }
          passHref
        >
          <ButtonMore>Ver todos</ButtonMore>
        </Link>
      )}
    </SectionStyled>
  );
};

export default ArticlesSection;
