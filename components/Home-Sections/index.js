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

const HomeSection = ({ title, products, link, first }) => {
  // const HomeSection = ({ title, first }) => {
  //   const [products, setProducts] = useState([]);

  //   useEffect(async () => {
  //     const response = await fetch(
  //       `${process.env.NEXT_PUBLIC_URL}/api/related-by-subcategory/${title
  //         .replace(/-/gi, " ")
  //         .replace(/Ñ/gi, "enne")}?first=1&last=8`
  //     );
  //     const { data } = await response.json();

  //     setProducts(data);
  //   }, [title]);

  return (
    <>
      {products.length > 0 ? (
        <SectionStyled>
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
          {products.length >= 8 && (
            <Link href={link} passHref>
              <ButtonMore>Ver todos</ButtonMore>
            </Link>
          )}
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
