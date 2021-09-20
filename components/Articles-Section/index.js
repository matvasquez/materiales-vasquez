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
  routeWithFilters,
  handleOpenFilters,
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
  }, []);

  // Determina a que ruta de la API hacer la consulta
  const searchTitle = {
    lámparas: "products-by-name/LAMPARA",
    "Menos de 200": "products-by-price/200",
    Tienda: "new-products",
  };
  // Valor por defecto para hacer la consulta (Son las categorias)
  const queryDefault = `related-by-category/${title.replace(/ /gi, "-")}`;
  const query = searchTitle[title] || queryDefault;

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
          <OpenFilters onClick={() => handleOpenFilters()}>
            <FiltersIcons />
          </OpenFilters>
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
                <LoadMoreButton
                  type="button"
                  onClick={() => {
                    uploadMoreItems(
                      query,
                      products.length + 1,
                      products.length + 20,
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
