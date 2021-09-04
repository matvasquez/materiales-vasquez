import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
//import Link from "next/link";

// Styled-Components
import {
  SectionStyled,
  CloseButton,
  PriceText,
  InputRange,
  FilterSection,
  SectionName,
  BrandsContainer,
  BrandsList,
  BrandLabel,
  BrandInput,
  CheckMarck,
  ButtonsContainer,
  ApplyFiltersButton,
  CleanFilters,
} from "./style";

const Filter = ({ brands, isOpen, handleOpenFilters, applyFilters }) => {
  const formatter = new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  // const [isOpen, setIsOpen] = useState(false);
  const minimumPriceRef = useRef(null);
  const maximumPriceRef = useRef(null);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(10000);
  const [selectedBrands, setSelectedBrands] = useState([]);

  const handleChangeMinPrice = () => {
    setMinPrice(minimumPriceRef.current.value);
  };
  const handleChangeMaxPrice = () => {
    setMaxPrice(maximumPriceRef.current.value);
  };

  const handleChangeBrand = (brand) => {
    if (selectedBrands.includes(brand)) {
      setSelectedBrands(selectedBrands.filter((item) => item !== brand));
    } else {
      setSelectedBrands((selectedBrands) => [...selectedBrands, brand]);
    }
  };

  return (
    <SectionStyled open={isOpen}>
      <CloseButton onClick={() => handleOpenFilters()} />
      <FilterSection>
        <SectionName>Rango de precio</SectionName>
        <PriceText style={{ textAlign: "left" }}>
          ${formatter.format(minPrice)}
        </PriceText>
        <InputRange
          type="range"
          name="min-price"
          min="0"
          max="100"
          step="10"
          ref={minimumPriceRef}
          value={minPrice}
          onChange={() => handleChangeMinPrice()}
          slider={minPrice}
        />
        <PriceText style={{ textAlign: "right" }}>
          ${formatter.format(maxPrice)}
        </PriceText>
        <InputRange
          type="range"
          name="max-price"
          min="100"
          max="10000"
          step="100"
          ref={maximumPriceRef}
          value={maxPrice}
          onChange={() => handleChangeMaxPrice()}
          slider={maxPrice}
        />
      </FilterSection>
      {brands && (
        <FilterSection>
          <SectionName>Filtrar por marca</SectionName>
          {brands && (
            <BrandsContainer rows={brands.length}>
              {brands.map((brand) => (
                <BrandsList key={brand.marca}>
                  <BrandLabel htmlFor={brand.marca}>{brand.marca}</BrandLabel>
                  <BrandInput
                    type="checkbox"
                    id={brand.marca}
                    onChange={() => handleChangeBrand(brand.marca)}
                  />
                  <CheckMarck
                    style={
                      selectedBrands.includes(brand.marca)
                        ? { display: "block" }
                        : { display: "none" }
                    }
                  />
                </BrandsList>
              ))}
            </BrandsContainer>
          )}
        </FilterSection>
      )}
      <ButtonsContainer>
        <CleanFilters type="button">Limpiar filtros</CleanFilters>
        <ApplyFiltersButton
          type="button"
          onClick={() => {
            applyFilters(minPrice, maxPrice, selectedBrands);
            handleOpenFilters();
          }}
        >
          Aplicar filtros
        </ApplyFiltersButton>
      </ButtonsContainer>
    </SectionStyled>
  );
};

export default Filter;
