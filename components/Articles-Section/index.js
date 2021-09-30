import React, { useState, useEffect } from "react";
import Link from "next/link";
import { uploadMoreItems } from "../../utils/uploadMoreItems";
import { useRouter } from "next/router";

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
}) => {
  // Activa la animación de carga en el botón de Cargar más
  const [load, setLoad] = useState(false);
  // Reemplaza el botón de Cargar más por Son todos los productos
  const [noMore, setNoMore] = useState(false);
  const [itemsLoaded, setItemsLoaded] = useState([]);
  const router = useRouter();

  const updateItems = (items) => {
    setItemsLoaded(itemsLoaded.concat(items));
    // setItemsLoaded((itemsLoaded) => [...itemsLoaded, items]);
  };

  useEffect(() => {
    setItemsLoaded(products);
  }, [products]);

  // Determina a que ruta de la API hacer la consulta
  const searchTitle = () => {
    if (router.pathname.slice(0, 11) === "/todos-los/") {
      if (router.query.id === "Menos-de-200") {
        return "products-by-price/200";
      } else {
        return `products-by-name/${router.query.id}`;
      }
    } else if (router.pathname.slice(0, 11) === "/tienda") {
      return "new-products";
    } else {
      return `related-by-category/${title.replace(/ /gi, "-")}`;
    }
  };

  const handleClick = () => {
    setLoad(true);
    setTimeout(() => {
      setLoad(false);
    }, 3000);
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
              {noMore || products.length < 20 ? (
                <NoMoreText>Son todos los productos</NoMoreText>
              ) : (
                <LoadMoreButton
                  type="button"
                  onClick={() => {
                    uploadMoreItems(
                      searchTitle(),
                      itemsLoaded.length + 1,
                      itemsLoaded.length + 20,
                      updateItems,
                      setNoMore
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
