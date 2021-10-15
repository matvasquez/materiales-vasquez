import React, { useEffect, useState } from "react";

// Components
import { Seeking } from "../Loaders/Seeking";

// Styled-Components
import {
  SectionStyled,
  Conatiner,
  CloseButton,
  InputPriceContainer,
  InputRangePrice,
  BoxMinmax,
  InputPrice,
  Max,
  FilterSection,
  SectionName,
  CategoriesScroll,
  CategoriesContainer,
  CategoriesList,
  CheckInput,
  CategoriesName,
  ButtonsContainer,
  ApplyFiltersButton,
  CleanFilters,
  LookingFor,
} from "./style";

const formatter = new Intl.NumberFormat("en-US", {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

const Filter = ({
  brands,
  categories,
  isOpen,
  handleOpenFilters,
  applyFilters,
  seeking,
  setRouteWithFilters,
  beforeFiltering,
  resultsFilters,
}) => {
  const [maxPrice, setMaxPrice] = useState("");
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectCategories, setSelectCategories] = useState([]);
  const [disabled, setDisabled] = useState(true);

  const handleChangeMaxPrice = (value) => {
    setMaxPrice(value);
  };

  const handleChangeBrand = (brand) => {
    if (selectedBrands.includes(brand)) {
      setSelectedBrands(selectedBrands.filter((item) => item !== brand));
    } else {
      setSelectedBrands((selectedBrands) => [...selectedBrands, brand]);
    }
  };

  const handleSelectCategorie = (categorie) => {
    if (selectCategories.includes(categorie)) {
      setSelectCategories(
        selectCategories.filter((item) => item !== categorie)
      );
    } else {
      setSelectCategories((selectCategories) => [
        ...selectCategories,
        categorie,
      ]);
    }
  };

  const clearFilters = () => {
    setMaxPrice("");
    setSelectedBrands([]);
    setSelectCategories([]);
  };

  useEffect(() => {
    if (
      maxPrice === "" &&
      selectedBrands.length === 0 &&
      selectCategories.length === 0
    ) {
      setDisabled(true);
    } else {
      setDisabled(false);
    }
  }, [maxPrice, selectedBrands, selectCategories]);

  return (
    <SectionStyled open={isOpen}>
      <CloseButton onClick={() => handleOpenFilters()} />
      <Conatiner>
        {categories && (
          <FilterSection>
            <SectionName>Ver por categoria</SectionName>
            {categories && (
              <CategoriesScroll>
                <CategoriesContainer columns={categories.length}>
                  {categories.map((category) => (
                    <CategoriesList
                      key={category.sub_category}
                      onClick={() =>
                        handleSelectCategorie(
                          category.sub_category.replace(/ /gi, "-")
                        )
                      }
                      text={category.sub_category.length > 27 ? true : false}
                    >
                      <CheckInput
                        show={
                          selectCategories.includes(
                            category.sub_category.replace(/ /gi, "-")
                          )
                            ? true
                            : false
                        }
                      />
                      <CategoriesName
                        text={category.sub_category.length > 27 ? true : false}
                      >
                        {category.sub_category}
                      </CategoriesName>
                    </CategoriesList>
                  ))}
                </CategoriesContainer>
              </CategoriesScroll>
            )}
          </FilterSection>
        )}

        <SectionName>Precio</SectionName>
        <InputPriceContainer>
          <BoxMinmax>
            <InputPrice>${formatter.format(maxPrice)}</InputPrice>
            <Max>max</Max>
          </BoxMinmax>
          <InputRangePrice
            type="range"
            id="maximumPrice"
            name="maximumPrice"
            min="0"
            max="10000"
            step="100"
            onChange={(e) => handleChangeMaxPrice(e.target.value)}
          />
        </InputPriceContainer>

        {brands && (
          <FilterSection>
            <SectionName>Filtrar por marca</SectionName>
            {brands && (
              <CategoriesContainer rows={brands.length}>
                {brands.map((brand) => (
                  <CategoriesList
                    key={brand.marca}
                    onClick={() => handleChangeBrand(brand.marca)}
                  >
                    <CheckInput
                      show={
                        selectedBrands.includes(brand.marca.replace(/ /gi, "-"))
                          ? true
                          : false
                      }
                    />
                    <CategoriesName>{brand.marca}</CategoriesName>
                  </CategoriesList>
                ))}
              </CategoriesContainer>
            )}
          </FilterSection>
        )}
        <ButtonsContainer>
          {!seeking && (
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
          )}
          <ApplyFiltersButton
            type="button"
            disabled={disabled}
            onClick={() =>
              applyFilters(maxPrice, selectCategories, selectedBrands)
            }
            search={seeking}
            resultsFilters={resultsFilters}
          >
            {seeking ? (
              <LookingFor>
                <Seeking />
              </LookingFor>
            ) : (
              <>{resultsFilters ? "Sin resultados" : "Aplicar filtros"}</>
            )}
          </ApplyFiltersButton>
        </ButtonsContainer>
      </Conatiner>
    </SectionStyled>
  );
};

export default Filter;
