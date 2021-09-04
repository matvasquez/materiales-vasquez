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
  font-weight: 500;
`;

export const InputRange = styled.input`
  /* -webkit-appearance: none; */
  width: 100%;
  height: 1.5rem;
  border-radius: 1rem;
  background-color: var(--white);
  border: 0.1rem solid var(--blue);
  outline: none;
  transition: 0.3s ease-in-out all;
  ::-webkit-slider-runnable-track {
    /* width: 50%;
    height: 1.5rem;
    border-radius: 1rem;
    background: var(--yellow);
    cursor: pointer; */
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

  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: repeat(${(props) => props.rows && props.rows}, 1fr);
  grid-gap: 2rem;
  justify-items: start;
  align-items: center;
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
    content: "\\2714";
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    font-size: 2.3rem;
    color: #0275ff;
    line-height: 1.4rem;
    text-align: center;
  }
  @media (min-width: 1200px) {
    display: none;
  }
`;

// export const Brand = styled.div`
//   width: fit-content;
//   padding: 0.5rem;
//   margin: 0.5rem;
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   background: none;
//   border: 0.1rem solid var(--blue);
//   border-radius: 0.8rem;
//   cursor: pointer;
//   transition: 0.3s ease-in-out all;
//   position: relative;
//   ${(props) =>
//     props.isChecked &&
//     `
//       background-color: var(--blue);
//       ${BrandLabel} {
//         color: var(--yellow);
//       }
//   `}
//   &:hover {
//     background-color: var(--yellow);
//     border: 0.1rem solid var(--yellow);
//   }
// `;

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
