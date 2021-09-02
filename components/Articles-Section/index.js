import React, { useState } from "react";
import Link from "next/link";
import { uploadMoreItems } from "../../utils/uploadMoreItems";
import { connect } from "react-redux";

//Actions
import { setItemsLoaded } from "../../actions";

// Components
import PreviewItem from "../Preview-Item/PreviewItem";
import { SuspensoryPoints } from "../Loaders/SuspensoryPoints";

// Styled-Components
import {
  SectionStyled,
  TitleSection,
  ItemsContainer,
  ButtonMore,
  LoadMoreButton,
  NoMoreText,
} from "./style";

const ArticlesSection = ({ title, products, route, setItemsLoaded }) => {
  const [load, setLoad] = useState(false);
  const [noMore, setNoMore] = useState(false);

  const handleClick = () => {
    setLoad(true);
    let time = setTimeout(() => {
      setLoad(false);
    }, 1500);
  };

  return (
    <SectionStyled>
      <TitleSection>{title}</TitleSection>
      <ItemsContainer>
        {products &&
          products.map((product, i) => (
            <PreviewItem
              key={product.articulo_id + product.price}
              {...product}
              index={i}
            />
          ))}
      </ItemsContainer>
      {route ? (
        <>
          {noMore ? (
            <NoMoreText>Son todos los productos</NoMoreText>
          ) : (
            <LoadMoreButton
              type="button"
              onClick={() => {
                uploadMoreItems(
                  title.replace(/ /gi, "-"),
                  products.length + 1,
                  products.length + 20,
                  setItemsLoaded,
                  setNoMore
                );
                handleClick();
              }}
            >
              {load ? <SuspensoryPoints /> : "Cargar mas"}
            </LoadMoreButton>
          )}
        </>
      ) : (
        <Link
          href={
            title === "Productos Nuevos"
              ? "/tienda"
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

const mapDispatchToProps = {
  setItemsLoaded,
};

export default connect(null, mapDispatchToProps)(ArticlesSection);
