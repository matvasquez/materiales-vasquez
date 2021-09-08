import styled from "styled-components";

export const SectionStyled = styled.section`
  width: 100vw;
  height: 100vh;
  padding: 1rem 1rem 2rem 1rem;
  background-color: var(--background);
  position: fixed;
  top: 0;
  left: ${(props) => (props.open ? "0" : "-100%")};
  overflow-y: scroll;
  z-index: 200000;
  transition: 0.3s ease-in-out all;
  @media (min-width: 1200px) {
    grid-column: 1 / span 1;
    position: initial;
    width: 100%;
    padding: 0;
    height: fit-content;
    justify-content: center;
    align-items: center;
    border-radius: 1.5rem;
    z-index: 200;
    overflow: hidden;
  }
`;

export const Conatiner = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  position: relative;
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
  z-index: 3;
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

export const InputPriceContainer = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 1rem;
  justify-items: center;
  align-items: center;
  color: var(--blue);
  ::placeholder {
    color: var(--blue);
  }
`;

export const InputPrice = styled.input`
  width: 100%;
  padding: 0.5rem;
  border-radius: 1rem;
  background: transparent;
  border: 0.1rem solid var(--blue);
  outline: none;
  @media (min-width: 750px) {
    width: 80%;
    margin: 0 auto;
  }
`;

export const FilterSection = styled.section`
  width: 100%;
  padding: 0 1rem;
  margin: 1rem auto;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  border-radius: 1rem;
  @media (min-width: 750px) {
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
  margin: 1rem auto;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: repeat(${(props) => props.rows && props.rows}, 1fr);
  grid-gap: 1.5rem;
  justify-items: start;
  align-items: center;
  @media (min-width: 750px) {
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows: auto;
  }
  @media (min-width: 1200px) {
    grid-template-columns: 1fr;
    grid-template-rows: repeat(${(props) => props.rows && props.rows}, 1fr);
  }
`;

export const BrandsList = styled.li`
  width: 80%;
  padding: 0.2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  @media (min-width: 750px) {
    width: 100%;
  }
`;

export const BrandLabel = styled.label`
  width: 50%;
  text-align: left;
  font-size: 1.4rem;
  white-space: nowrap;
  font-weight: 700;
  border-bottom: 0.1rem solid var(--blue);
  border-radius: 0;
`;

export const BrandInput = styled.input`
  position: absolute;
  visibility: hidden;
`;

export const CheckMarck = styled.div`
  width: 1.5rem;
  height: 1.5rem;
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
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 1rem;
  justify-items: center;
  align-items: start;
  @media (min-width: 1200px) {
    padding: 0;
    margin: 0;
  }
`;

export const CategoriesScroll = styled.div`
  width: 100%;
  overflow-x: scroll;
  @media (min-width: 1200px) {
    grid-template-columns: 1fr;
    justify-items: start;
    position: relative;
    &:after {
      content: "\\21E9";
      position: absolute;
      bottom: 1rem;
      right: 1rem;
      font-size: 1.4rem;
      color: var(--blue);
      line-height: 1.4rem;
      text-align: center;
    }
  }
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
  @media (min-width: 1200px) {
    height: 30rem;
    overflow-x: hidden;
    overflow-y: scroll;
    grid-template-columns: 1fr;
    justify-items: start;
  }
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
  margin: 1rem auto;
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
    width: 100%;
    margin: 0;
  }
`;

export const CleanFilters = styled.button`
  width: 100%;
  padding: 1rem;
  margin: 1rem auto;
  font-size: 1.6rem;
  background-color: var(--background);
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
    width: 100%;
    margin: 0;
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