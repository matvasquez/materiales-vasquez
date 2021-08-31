import styled from "styled-components";

export const FiltersContainer = styled.section`
  width: 100vw;
  height: 100vh;
  padding: 5rem 2rem;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  background-color: var(--white);
  position: fixed;
  top: 0;
  left: -100%;
  z-index: 20001;
  overflow-y: scroll;
  transition: 0.3s ease-in-out all;
  ${(props) =>
    props.isOpen &&
    `
    left: 0;
  `}
  @media (min-width: 1200px) {
    width: 100%;
    height: auto;
    padding: 2rem 1rem;
    border-radius: 1.5rem;
    position: initial;
    z-index: 1;
    overflow-y: auto;
  }
`;

// --------- Close Button

export const CloseButton = styled.div`
  width: 2.5rem;
  height: 2.5rem;
  border: 0.1rem solid var(--blue);
  border-radius: 0.5rem;
  background: none;
  outline: none;
  cursor: pointer;
  position: absolute;
  top: 2rem;
  right: 2rem;
  &:after {
    content: "\\2715";
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    font-size: 2.3rem;
    color: var(--blue);
    line-height: 2.5rem;
    text-align: center;
  }
  @media (min-width: 1200px) {
    display: none;
  }
`;

export const FilterCategories = styled.div`
  width: 100%;
  padding: 1rem;
  margin: 1rem auto;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  border: 0.1rem solid var(--blue);
  border-radius: 1rem;
  @media (min-width: 750px) {
    width: 80%;
  }
  @media (min-width: 1200px) {
    width: 95%;
    margin: 1.5rem auto;
  }
`;

export const SectionName = styled.p`
  font-size: 1.8rem;
  font-weight: 700;
  margin: 1rem auto;
`;

export const CategoriesContainer = styled.div`
  width: 100%;
  display: flex;
  flex-flow: row wrap;
`;

export const CategoriesDIV = styled.div`
  flex: auto;
  min-width: 10rem;
  height: 4rem;
  margin: 0.5rem;
`;

export const Categories = styled.a`
  width: 100%;
  height: 100%;
  padding: 1.5rem 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  white-space: nowrap;
  font-size: 1.3rem;
  font-weight: 500;
  color: var(--blue);
  background: none;
  border: 0.1rem solid var(--blue);
  border-radius: 1rem;
  cursor: pointer;
  outline: none;
  transition: 0.3s ease-in-out all;
  :hover {
    border: 0.1rem solid var(--yellow);
  }
`;

//--------

export const FilterPrice = styled(FilterCategories)``;

export const PriceContainer = styled.div`
  width: 90%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 1rem;
`;

export const Price = styled.input`
  width: 100%;
  padding: 0.5rem;
  border: 0.1rem solid var(--blue);
  border-radius: 0.5rem;
  outline: none;
`;

//-----------

export const FilterBrand = styled(FilterCategories)``;

export const CleanFilters = styled.button`
  width: 100%;
  padding: 1rem;
  margin: 1rem auto;
  font-size: 1.6rem;
  background: none;
  border: 0.1rem solid var(--blue);
  border-radius: 1rem;
  outline: none;
  cursor: pointer;
  transition: 0.3s ease-in-out all;
  &:hover {
    background-color: var(--yellow);
    border: 0.1rem solid var(--yellow);
    border-radius: 2rem;
  }
  @media (min-width: 750px) {
    width: 80%;
  }
  @media (min-width: 1200px) {
    width: 90%;
  }
`;

export const BrandsContainer = styled.div`
  width: 100%;

  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: flex-start;

  /* display: grid;
  grid-template-columns: repeat(auto-fit, minmax(33%, 1fr));
  grid-gap: 2rem 1rem;
  justify-items: center; */
`;

export const BrandLabel = styled.label`
  text-align: center;
  font-size: 1.2rem;
  white-space: nowrap;
  font-weight: 700;
`;

export const BrandInput = styled.input`
  position: absolute;
  visibility: hidden;
`;

export const Brand = styled.div`
  width: fit-content;
  padding: 0.5rem;
  margin: 0.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  background: none;
  border: 0.1rem solid var(--blue);
  border-radius: 0.8rem;
  cursor: pointer;
  transition: 0.3s ease-in-out all;
  position: relative;
  ${(props) =>
    props.isChecked &&
    `
      background-color: var(--blue);
      ${BrandLabel} {
        color: var(--yellow);
      }
  `}
  &:hover {
    background-color: var(--yellow);
    border: 0.1rem solid var(--yellow);
  }
`;

export const ApplyFiltersButton = styled.button`
  width: 90%;
  padding: 1rem;
  color: var(--blue);
  font-size: 1.6rem;
  font-weight: 700;
  background-color: var(--yellow);
  border-radius: 2rem;
  border: none;
  outline: none;
  cursor: pointer;
  position: fixed;
  bottom: 2rem;
  transition: 0.3s ease-in-out all;
  :disabled {
    color: #3a4a77;
    background-color: #ffd87a;
  }
  &:hover {
    background-color: #ffcc51;
  }
  @media (min-width: 750px) {
    width: 80%;
    bottom: 6rem;
  }
  @media (min-width: 1200px) {
    width: 90%;
    position: initial;
    margin: 5rem auto;
  }
`;
