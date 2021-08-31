import React, { useState, useEffect } from "react";
import Link from "next/link";

// Styled-Components
import {
  FiltersContainer,
  CloseButton,
  FilterCategories,
  SectionName,
  CategoriesContainer,
  CategoriesDIV,
  Categories,
  FilterPrice,
  PriceContainer,
  Price,
  FilterBrand,
  CleanFilters,
  BrandsContainer,
  Brand,
  BrandLabel,
  BrandInput,
  ApplyFiltersButton,
} from "./style";

const MoreFilters = ({
  brands,
  categories,
  handleClick,
  isOpen,
  filters,
  minimumPriceRef,
  maximumPriceRef,
}) => {
  const formatter = new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  const [minimumPrice, setMinimumPrice] = useState("");
  const [maximumPrice, setMaximumPrice] = useState("");
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [disabled, setDisabled] = useState(true);

  useEffect(() => {
    if (
      minimumPrice === "" &&
      maximumPrice === "" &&
      selectedBrands.length === 0
    ) {
      setDisabled(true);
    } else {
      setDisabled(false);
    }
  }, [minimumPrice, maximumPrice, selectedBrands]);

  const handleChange = (brand) => {
    if (selectedBrands.includes(brand)) {
      setSelectedBrands(selectedBrands.filter((item) => item !== brand));
    } else {
      setSelectedBrands((selectedBrands) => [...selectedBrands, brand]);
    }
  };

  return (
    <FiltersContainer isOpen={isOpen}>
      <CloseButton
        onClick={() => handleClick()}
        aria-label="Botón cerrar filtros"
      />
      <FilterPrice>
        <SectionName>Filtrar por precio</SectionName>
        <PriceContainer>
          <Price
            ref={minimumPriceRef}
            type="text"
            name="minimumPrice"
            inputMode="numeric"
            placeholder={`$${formatter.format(0)}`}
            maxLength="5"
            value={minimumPrice}
            onChange={(e) =>
              setMinimumPrice(e.target.value.replace(/\D/g, "").trim())
            }
          />
          <Price
            ref={maximumPriceRef}
            type="text"
            name="maximumPrice"
            inputMode="numeric"
            placeholder={`$${formatter.format(1000)}`}
            maxLength="5"
            value={maximumPrice}
            onChange={(e) =>
              setMaximumPrice(e.target.value.replace(/\D/g, "").trim())
            }
          />
        </PriceContainer>
      </FilterPrice>
      <FilterBrand>
        <SectionName>Filtrar por marca</SectionName>
        {brands && (
          <BrandsContainer>
            {brands.map((brand) => (
              <Brand
                key={brand}
                isChecked={selectedBrands.includes(brand) ? true : false}
              >
                <BrandLabel htmlFor={brand}>{brand}</BrandLabel>
                <BrandInput
                  type="checkbox"
                  id={brand}
                  onChange={() => handleChange(brand)}
                />
              </Brand>
            ))}
          </BrandsContainer>
        )}
      </FilterBrand>
      <CleanFilters
        type="button"
        onClick={() => {
          filters();
          setMinimumPrice("");
          setMaximumPrice("");
          setSelectedBrands([]);
        }}
      >
        Limpiar filtros
      </CleanFilters>
      <ApplyFiltersButton
        type="button"
        disabled={disabled}
        onClick={() => {
          handleClick();
          filters(selectedBrands);
        }}
      >
        Aplicar filtros
      </ApplyFiltersButton>
      <FilterCategories>
        <SectionName>Ver mas categorías</SectionName>
        <CategoriesContainer>
          {categories && (
            <>
              {categories.map((category) => (
                <CategoriesDIV key={category} onClick={() => handleClick()}>
                  <Link href={`/todos/${category}`} passHref>
                    <Categories>{category}</Categories>
                  </Link>
                </CategoriesDIV>
              ))}
            </>
          )}
        </CategoriesContainer>
      </FilterCategories>
    </FiltersContainer>
  );
};

export default MoreFilters;
