import styled from "styled-components";

export const SectionStyled = styled.section`
  width: 100%;
  padding: 0.5rem 0;
  margin: 2rem 0 3rem;
  text-align: right;

  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;

  @media (min-width: 750px) {
    width: 95%;
  }
`;

export const TitleSection = styled.h3`
  width: 100%;
  margin-bottom: 2rem;
  font-size: 2.5rem;
  text-align: left;
  font-weight: 500;
  text-transform: capitalize;
  @media (min-width: 750px) {
    font-size: 3rem;
    font-weight: 700;
  }
`;

export const ItemsContainer = styled.section`
  width: 100%;
  min-height: 50vh;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(14rem, 1fr));
  grid-auto-rows: 27rem;
  grid-gap: 1rem;
  align-items: stretch;

  /* @media (min-width: 750px) {
    display: grid;
    grid-template-columns: repeat(auto-fill, 32%);
    grid-gap: 1rem;
    justify-content: center;
  }
  @media (min-width: 1200px) {
    grid-template-columns: repeat(5, 1fr);
  } */
`;

export const ButtonMore = styled.a`
  width: 25%;
  margin: 1rem 0 0 auto;
  padding: 0.3rem 0.4rem;
  font-size: 1.2rem;
  text-align: center;
  color: var(--background);
  background-color: var(--blue);
  border-radius: 0.5rem;
  border: none;
  outline: none;
  cursor: pointer;
  transition: 0.3s ease-in-out all;
  &:hover {
    color: var(--blue);
    background-color: var(--yellow);
  }
  @media (min-width: 750px) {
    margin-top: 2rem;
    font-size: 1.6rem;
    border-radius: 1rem;
  }
  @media (min-width: 1200px) {
    width: fit-content;
    padding: 0.5rem 2rem;
  }
`;

// -------SectionEmpty

export const SectionEmpty = styled.section`
  width: 100%;
  padding: 0.5rem 0;
  margin: 6rem 0 3rem;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 1rem;
  @media (min-width: 750px) {
    width: 90%;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 2rem;
  }
  @media (min-width: 1000px) {
    grid-template-columns: repeat(4, 1fr);
  }
`;
