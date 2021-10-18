import React, { useState, useEffect } from "react";
import Link from "next/link";
import { uploadMoreItems } from "../../utils/uploadMoreItems";

// Components
import PreviewItem from "../Preview-Item/PreviewItem";
import { SuspensoryPoints } from "../Loaders/SuspensoryPoints";
import { FiltersIcons } from "../IconsSVG/FiltersIcons";

// Styled-Components
import {
  SectionStyled,
  TitleSection,
  OpenFilters,
  ItemsContainer,
  ButtonMore,
  LoadMoreButton,
  NoMoreText,
} from "./style";

const ArticlesSection = ({
  title,
  products,
  route,
  showFilters,
  routeWithFilters,
  handleOpenFilters,
  ruteLoadMore,
}) => {
  // Activa la animación de carga en el botón de Cargar más
  const [load, setLoad] = useState(false);
  // Reemplaza el botón de Cargar más por Son todos los productos
  const [noMore, setNoMore] = useState(false);
  const [itemsLoaded, setItemsLoaded] = useState([]);

  const updateItems = (items) => {
    setItemsLoaded(itemsLoaded.concat(items));
  };

  useEffect(() => {
    setItemsLoaded(products);
  }, [products]);

  const handleClick = () => {
    setLoad(true);
  };

  return (
    <SectionStyled>
      <TitleSection>
        {title}
        {route && (
          <>
            {showFilters && (
              <OpenFilters onClick={() => handleOpenFilters()}>
                <FiltersIcons />
              </OpenFilters>
            )}
          </>
        )}
      </TitleSection>
      <ItemsContainer>
        {products &&
          itemsLoaded.map((product, i) => (
            <PreviewItem
              key={product.articulo_id + product.price}
              {...product}
              index={i}
            />
          ))}
      </ItemsContainer>
      {route ? (
        <>
          {!routeWithFilters && (
            <>
              {noMore ? (
                <NoMoreText>Son todos los productos</NoMoreText>
              ) : (
                <>
                  {products.length >= 20 && (
                    <LoadMoreButton
                      type="button"
                      onClick={() => {
                        uploadMoreItems(
                          `${ruteLoadMore}/?first=${
                            itemsLoaded.length + 1
                          }&last=${itemsLoaded.length + 20}`,
                          updateItems,
                          setNoMore,
                          setLoad
                        );
                        handleClick();
                      }}
                    >
                      {load ? <SuspensoryPoints /> : "Cargar más"}
                    </LoadMoreButton>
                  )}
                </>
              )}
            </>
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

export default ArticlesSection;
