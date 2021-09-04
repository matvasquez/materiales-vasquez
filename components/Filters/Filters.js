import React, { useEffect, useState, useRef } from "react";
import Link from "next/link";

// Components
import { Seeking } from "../Loaders/Seeking";

// Styled-Components
import {
  SectionStyled,
  CloseButton,
  PriceText,
  InputRangeContainer,
  InputRange,
  RangeStyle,
  FilterSection,
  SectionName,
  BrandsContainer,
  CategoriesScroll,
  CategoriesContainer,
  BrandsList,
  CategoriesList,
  CategoriesAnchor,
  BrandLabel,
  BrandInput,
  CheckMarck,
  ButtonsContainer,
  ApplyFiltersButton,
  CleanFilters,
  LookingFor,
} from "./style";

const Filter = ({
  brands,
  categories,
  isOpen,
  handleOpenFilters,
  applyFilters,
  seeking,
  setRouteWithFilters,
  beforeFiltering,
}) => {
  const formatter = new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  // const [isOpen, setIsOpen] = useState(false);
  const minimumPriceRef = useRef(null);
  const maximumPriceRef = useRef(null);
  const [minPrice, setMinPrice] = useState(1);
  const [maxPrice, setMaxPrice] = useState(10000);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [disabled, setDisabled] = useState(true);

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

  const clearFilters = () => {
    setMinPrice(1);
    setMaxPrice(10000);
    setSelectedBrands([]);
  };

  useEffect(() => {
    if (minPrice <= 1 && maxPrice == 10000 && selectedBrands.length === 0) {
      setDisabled(true);
    } else {
      setDisabled(false);
    }
  }, [minPrice, maxPrice, selectedBrands]);

  return (
    <SectionStyled open={isOpen}>
      <CloseButton onClick={() => handleOpenFilters()} />
      <FilterSection>
        <SectionName>Rango de precio</SectionName>
        <PriceText>${formatter.format(minPrice)}</PriceText>
        <InputRangeContainer>
          <InputRange
            type="range"
            name="min-price"
            min="0"
            max="100"
            step="10"
            ref={minimumPriceRef}
            value={minPrice}
            onChange={() => handleChangeMinPrice()}
          />
          <RangeStyle slider={minPrice} />
        </InputRangeContainer>
        <PriceText>${formatter.format(maxPrice)}</PriceText>
        <InputRangeContainer>
          <InputRange
            type="range"
            name="max-price"
            min="100"
            max="10000"
            step="100"
            ref={maximumPriceRef}
            value={maxPrice}
            onChange={() => handleChangeMaxPrice()}
          />
          <RangeStyle slider={maxPrice / 100} />
        </InputRangeContainer>
      </FilterSection>

      {categories && (
        <FilterSection>
          <SectionName>Ver por categoria</SectionName>
          {categories && (
            <CategoriesScroll>
              <CategoriesContainer columns={categories.length}>
                {categories.map((category) => (
                  <CategoriesList
                    key={category.category}
                    onClick={() => handleOpenFilters()}
                  >
                    <Link
                      href={`/categoria/${category.category.replace(
                        / /gi,
                        "-"
                      )}`}
                      passHref
                    >
                      <CategoriesAnchor>{category.category}</CategoriesAnchor>
                    </Link>
                  </CategoriesList>
                ))}
              </CategoriesContainer>
            </CategoriesScroll>
          )}
        </FilterSection>
      )}

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

      {seeking && (
        <LookingFor>
          <Seeking />
        </LookingFor>
      )}
      <ButtonsContainer>
        <CleanFilters
          type="button"
          disabled={disabled}
          onClick={() => {
            clearFilters();
            setRouteWithFilters(false);
            beforeFiltering();
          }}
        >
          Limpiar filtros
        </CleanFilters>
        <ApplyFiltersButton
          type="button"
          disabled={disabled}
          onClick={() => applyFilters(minPrice, maxPrice, selectedBrands)}
        >
          Aplicar filtros
        </ApplyFiltersButton>
      </ButtonsContainer>
    </SectionStyled>
  );
};

export default Filter;
