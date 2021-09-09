import styled from "styled-components";

export const MainStiled = styled.main`
  width: 100%;
  padding: 1rem;
  margin-top: 4.5rem;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: center;
  @media (min-width: 750px) {
    margin-top: 10rem;
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 2rem;
    justify-items: center;
    align-items: center;
  }
  @media (min-width: 1000px) and (orientation: portrait) {
    width: 95%;
    min-height: 60vh;
    margin: 10rem auto;
  }
  @media (min-width: 1000px) and (orientation: landscape) {
    width: 80%;
    min-height: 40vh;
    margin: 5rem auto;
    grid-gap: 2.5rem;
  }
  @media (min-width: 1200px) {
    width: 90%;
    padding: 2rem 1rem;
    margin-top: 20rem;
    grid-gap: 3rem;
  }
`;

export const MainTitle = styled.h1`
  width: 100%;
  font-size: 1.8rem;
`;

export const ClearFilters = styled.button`
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
