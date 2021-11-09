import React, { useState, useEffect } from "react";
const CosmosClient = require("@azure/cosmos").CosmosClient;
import config from "../lib/config-cosmos";
import Image from "next/image";
import Link from "next/link";

// Components
import { HeartEmpty } from "../components/IconsSVG/HeartEmpty";
import { HeartFull } from "../components/IconsSVG/HeartFull";

// Styled-Components
import {
  MainStyled,
  ItemsContainer,
  Item,
  ItemLink,
  ImageContainer,
  ItemInfo,
  ItemText,
  CategoryAndIconContainer,
  ItemPrice,
  IconContainer,
  Categoryes,
  Categorie,
} from "../styles/cosmos/style";

// Loader para componente Image
const loader = ({ src, width, quality }) => {
  return `${src}?w=${width}&q=${quality || 75}`;
};

// Formatear precio
const formatter = new Intl.NumberFormat("en-US", {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

export const getServerSideProps = async () => {
  const { endpoint, key } = config;

  const client = new CosmosClient({ endpoint, key });
  const databaseID = client.database("articulos");
  const containerID = databaseID.container("articulos_mv");

  if (endpoint) {
    const { resources: items } = await containerID.items
      .query(
        `SELECT * FROM c WHERE c.articulo_id IN("101389991",
        "102846980",
        "103737566",
        "103807018",
        "104272570",
        "104273564",
        "46507",
        "100053134",
        "100431561",
        "CPPM",
        "100456873",
        "100545358",
        "100545462",
        "000142",
        "14138",
        "3102715",
        "CST2",
        "17371",
        "MOLDU002",
        "PAMV"
        )`
      )
      .fetchAll();

    return {
      props: {
        products: items,
      },
    };
  }
};

const Cosmos = ({ products }) => {
  return (
    <MainStyled>
      <h1>From Cosmos DB</h1>
      <ItemsContainer>
        {products.map(
          ({
            id,
            articulo_id,
            name,
            description,
            price,
            category,
            main_category,
            image_url,
          }) => (
            <Item key={id}>
              <Link href={`/detalles/${articulo_id}`} passHref>
                <ItemLink aria-label={`Ver detalles de ${name}`}>
                  <ImageContainer>
                    <Image
                      loader={loader}
                      src={image_url}
                      width={300}
                      height={300}
                      alt={`Fotografía de ${name}`}
                    />
                  </ImageContainer>
                  <ItemInfo>
                    <ItemText>{name.toLocaleLowerCase()}</ItemText>
                    <ItemPrice>${formatter.format(price)}</ItemPrice>
                  </ItemInfo>
                </ItemLink>
              </Link>
              <CategoryAndIconContainer>
                {main_category && (
                  <Categorie>{main_category.toLocaleLowerCase()}</Categorie>
                )}
                <IconContainer>
                  <HeartEmpty />
                </IconContainer>
              </CategoryAndIconContainer>
            </Item>
          )
        )}
      </ItemsContainer>
    </MainStyled>
  );
};

export default Cosmos;

// "101389991",
// "102846980",
// "103737566",
// "103807018",
// "104272570",
// "104273564",
// "46507",
// "100053134",
// "100431561",
// "100456873",
// "100545358",
// "100545462"
// "14138"
// "3102715"
