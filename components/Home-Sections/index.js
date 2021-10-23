import React, { useState, useEffect } from "react";
import Link from "next/link";

// Components
import PreviewItem from "../Preview-Item/PreviewItem";
import { SuspensoryPoints } from "../Loaders/SuspensoryPoints";

// Styled-Components
import {
  SectionStyled,
  TitleSection,
  ItemsContainer,
  ButtonMore,
  SectionEmpty,
  TextEmptyContainer,
} from "./style";

const HomeSection = ({ title, products, first }) => {
  return (
    <>
      {products.length > 0 ? (
        <SectionStyled id={title.replace(/ /g, "-").replace(/Ñ/g, "enne")}>
          <TitleSection>{title}</TitleSection>
          <ItemsContainer>
            {products.map((product, i) => (
              <PreviewItem
                key={product.articulo_id + product.price}
                {...product}
                index={i}
              />
            ))}
          </ItemsContainer>
        </SectionStyled>
      ) : (
        <>
          {first === 0 && (
            <SectionEmpty>
              <TextEmptyContainer>
                <p>Envío gratis dentro de Xalapa a partir de $200</p>
              </TextEmptyContainer>
              <SuspensoryPoints />
            </SectionEmpty>
          )}
        </>
      )}
    </>
  );
};

export default HomeSection;
