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
  SectionEmpty,
} from "./style";

const ArticlesSection = ({ title, products }) => {
  return (
    <SectionStyled>
      <TitleSection>{title}</TitleSection>
      <ItemsContainer>
        {products &&
          products.map((product, i) => (
            <PreviewItem key={product.articulo_id} {...product} index={i} />
          ))}
      </ItemsContainer>
      <Link href={`/todos/${title.replace(/ /gi, "-")}`} passHref>
        <ButtonMore>Ver todos</ButtonMore>
      </Link>
    </SectionStyled>
  );
};

export default ArticlesSection;
