import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

// Components
import { SuspensoryPoints } from "../Loaders/SuspensoryPoints";

// Styled-Components
import {
  ItemsContainer,
  Item,
  ImageContainer,
  ItemInfo,
  ItemText,
  ItemPrice,
  Categoryes,
  Categorie,
} from "./style";

// Loader para componente Image
const loader = ({ src, width, quality }) => {
  return `${src}?w=${width}&q=${quality || 75}`;
};

// Formatear precio
const formatter = new Intl.NumberFormat("en-US", {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

const HomeSection = ({ items }) => {
  return (
    <ItemsContainer>
      {items.map(
        ({
          id,
          articulo_id,
          name,
          category,
          main_category,
          description,
          price,
          image_url,
        }) => (
          <Link key={id} href={`/detalles/${articulo_id}`} passHref>
            <Item aria-label={`Ver detalles de ${name}`}>
              <ImageContainer>
                <Image
                  loader={loader}
                  src={`data:image/jpg;base64,${image_url}`}
                  width={300}
                  height={300}
                  alt={`Fotografía de ${name}`}
                />
              </ImageContainer>
              <ItemInfo>
                <ItemText>{name.toLocaleLowerCase()}</ItemText>
                <ItemPrice>${formatter.format(price)}</ItemPrice>
                <Categoryes>
                  {category && (
                    <Categorie>{category.toLocaleLowerCase()}</Categorie>
                  )}
                  {main_category && (
                    <Categorie>{main_category.toLocaleLowerCase()}</Categorie>
                  )}
                </Categoryes>
              </ItemInfo>
            </Item>
          </Link>
        )
      )}
    </ItemsContainer>
  );

  // return (
  //   <>
  //     {products.length > 0 ? (
  //       <SectionStyled id={title.replace(/ /g, "-").replace(/Ñ/g, "enne")}>
  //         <TitleSection>{title}</TitleSection>
  //         <ItemsContainer>
  //           {products.map((product, i) => (
  //             <PreviewItem
  //               key={product.articulo_id + product.price}
  //               {...product}
  //               index={i}
  //             />
  //           ))}
  //         </ItemsContainer>
  //       </SectionStyled>
  //     ) : (
  //       <>
  //         {first === 0 && (
  //           <SectionEmpty>
  //             <TextEmptyContainer>
  //               <p>Envío gratis dentro de Xalapa a partir de $200</p>
  //             </TextEmptyContainer>
  //             <SuspensoryPoints />
  //           </SectionEmpty>
  //         )}
  //       </>
  //     )}
  //   </>
  // );
};

export default HomeSection;
