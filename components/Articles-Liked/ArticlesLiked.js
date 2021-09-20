import React from "react";

// Components
import PreviewItem from "../Preview-Item/PreviewItem";

// Styled-Components
import {
  SectionStyled,
  TitleSection,
  ItemsContainer,
  ItemsScroll,
} from "./style";

const ArticlesLiked = ({ articles }) => {
  return (
    <>
      <SectionStyled>
        <TitleSection>Productos que te gustan</TitleSection>
        <ItemsContainer>
          <ItemsScroll rows={articles.length > 3 ? articles.length : 3}>
            {articles &&
              articles.map((article) => (
                <PreviewItem
                  key={article.articulo_id + article.price}
                  {...article}
                />
              ))}
          </ItemsScroll>
        </ItemsContainer>
      </SectionStyled>
    </>
  );
};

export default ArticlesLiked;
