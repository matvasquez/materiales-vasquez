import styled from "styled-components";

export const SectionStyled = styled.section`
  width: 100vw;
  height: 100vh;
  padding: 4rem 1rem 2rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  background-color: var(--background);
  position: fixed;
  top: 0;
  left: ${(props) => (props.open ? "0" : "-100%")};
  z-index: 200000;
  transition: 0.3s ease-in-out all;
  /* @media (min-width: 750px) {
    padding: 5rem;
    justify-content: flex-start;
    background-color: rgb(0 20 76 / 85%);
  }
  @media (min-width: 1200px) {
    grid-column: 1 / span 3;
    grid-row: 2 / span 1;
    position: initial;
    width: 100%;
    height: fit-content;
    padding: 0;
    justify-content: center;
    align-items: center;
    border-radius: 1.5rem;
    z-index: 200;
  } */
`;

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

export const PriceText = styled.p`
  width: 100%;
  margin-top: 1rem;
  font-weight: 500;
  text-align: left;
`;

export const InputRangeContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
`;

export const InputRange = styled.input`
  /* -webkit-appearance: none; */
  width: 100%;
  height: 1.5rem;
  border-radius: 1rem;
  background: transparent;
  border: none;
  outline: none;
  opacity: 0;
  ::-webkit-slider-runnable-track {
    width: 50%;
    height: 1.5rem;
    border-radius: 1rem;
    background: transparent;
    cursor: pointer;
  }
  ::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 1.5rem;
    height: 1.5rem;
    border-radius: 50%;
    background: var(--red);
    cursor: pointer;
  }
`;

export const RangeStyle = styled.div`
  /* width: 100%; */
  height: 0.8rem;
  border-radius: 1rem;
  background-color: var(--blue);
  position: absolute;
  left: 0;
  right: 0;
  z-index: -1;
  /* ${(props) => props.minSlider && `width: ${props.minSlider}%`} */
  ${(props) => (props.slider ? `width: ${props.slider}%` : `width: 0`)}
`;

export const FilterSection = styled.section`
  width: 100%;
  padding: 1rem;
  margin: 1rem auto;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
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

export const BrandsContainer = styled.ul`
  width: 100%;
  max-height: 40vh;
  margin: 1rem auto;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: repeat(${(props) => props.rows && props.rows}, 1fr);
  grid-gap: 2rem;
  justify-items: start;
  align-items: center;
  overflow-y: scroll;
`;

export const BrandsList = styled.li`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const BrandLabel = styled.label`
  width: 50%;
  text-align: left;
  font-size: 1.4rem;
  white-space: nowrap;
  font-weight: 700;
`;

export const BrandInput = styled.input`
  position: absolute;
  visibility: hidden;
`;

export const CheckMarck = styled.div`
  width: 1.4rem;
  height: 1.4rem;
  background: none;
  position: relative;
  &:after {
    content: "\\26AC";
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    font-size: 2.3rem;
    color: var(--blue);
    line-height: 1.4rem;
    text-align: center;
  }
  @media (min-width: 1200px) {
    display: none;
  }
`;

export const ButtonsContainer = styled.section`
  width: 100%;
  padding: 1rem;
  margin: 1rem auto;
  width: 100%;
  padding: 1rem;
  margin: 1rem auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 1rem;
  justify-items: center;
  align-items: center;
`;

export const CategoriesScroll = styled.div`
  width: 100%;
  overflow-x: scroll;
`;

export const CategoriesContainer = styled.ul`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(
    ${(props) => props.columns && props.columns},
    min-content
  );
  grid-gap: 1rem;
  justify-items: center;
  align-items: center;
`;

export const CategoriesList = styled.li`
  padding: 0.4rem 0.6rem;
  background-color: var(--blue);
  border-radius: 0.5rem;
`;

export const CategoriesAnchor = styled.a`
  white-space: nowrap;
  color: var(--background);
`;

export const ApplyFiltersButton = styled.button`
  width: 100%;
  padding: 1rem;
  color: var(--blue);
  font-size: 1.6rem;
  font-weight: 700;
  background-color: var(--yellow);
  border-radius: 1rem;
  border: none;
  outline: none;
  cursor: pointer;
  transition: 0.3s ease-in-out all;
  :disabled {
    color: #91a7e2;
    background-color: #ffe199;
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
  :disabled {
    color: #91a7e2;
    border: 0.1rem solid #91a7e2;
  }
  &:hover {
    border: 0.1rem solid var(--yellow);
    border-radius: 1.5rem;
  }
  @media (min-width: 750px) {
    width: 80%;
  }
  @media (min-width: 1200px) {
    width: 90%;
  }
`;

export const LookingFor = styled.div`
  width: 6rem;
  height: 6rem;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  bottom: 20%;
  left: calc(50% - 2rem);
`;
