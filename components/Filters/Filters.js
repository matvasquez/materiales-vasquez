import React, { useEffect, useState, useRef } from "react";
//import Link from "next/link";

// Components
import MoreFilters from "../More-Filters";

// Styled-Components
import {
  SectionStyled,
  CategoriesContainer,
  ButtonCategory,
  MoreContainer,
  ButtonMore,
} from "./style";

const Filter = ({ brands, categories, setDefaultFilters, applyFilters }) => {
  const [isOpen, setIsOpen] = useState(false);
  const minimumPriceRef = useRef(null);
  const maximumPriceRef = useRef(null);

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  const handleFilters = (selectedBrands) => {
    let userFilters = "";
    if (selectedBrands) {
      let firtsBrand =
        selectedBrands.length > 0
          ? `AND (DESC_MARCA:'${selectedBrands[0]}'`
          : "";
      let moreBrands =
        selectedBrands.length >= 1
          ? selectedBrands
              .slice(1)
              .map((brand) => `OR DESC_MARCA:'${brand}'`)
              .join("")
          : "";

      userFilters = `price > ${
        minimumPriceRef.current.value == "" ? 0 : minimumPriceRef.current.value
      } AND price < ${
        maximumPriceRef.current.value == ""
          ? 100000
          : maximumPriceRef.current.value
      } ${selectedBrands.length === 1 ? `${firtsBrand})` : ``} ${
        selectedBrands.length > 1 ? `${firtsBrand} ${moreBrands})` : ``
      }`;
    }

    setDefaultFilters(userFilters);
    applyFilters(userFilters);
  };

  return (
    <SectionStyled>
      {brands && (
        <>
          <CategoriesContainer numColumns={brands.length}>
            {brands.map((brand) => (
              <ButtonCategory
                key={brand}
                onClick={() => handleFilters([brand])}
              >
                {brand}
              </ButtonCategory>
            ))}
          </CategoriesContainer>
          <MoreContainer>
            <ButtonMore type="button" onClick={handleClick}>
              Más
            </ButtonMore>
          </MoreContainer>
          <MoreFilters
            brands={brands}
            categories={categories}
            handleClick={handleClick}
            isOpen={isOpen}
            filters={(selectedBrands) => handleFilters(selectedBrands)}
            minimumPriceRef={minimumPriceRef}
            maximumPriceRef={maximumPriceRef}
          />
        </>
      )}
    </SectionStyled>
  );
};

export default Filter;
