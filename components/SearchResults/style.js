import styled from "styled-components";

export const NotFound = styled.div`
  width: 100vw;
  min-height: 4rem;
  text-align: center;
  font-weight: 500;
  color: var(--blue);
  background-color: var(--background);
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 4.5rem;
  left: 0;
  z-index: 999;
  box-shadow: 0 10px 11px 0 rgba(0, 20, 76, 0.5);
  @media (min-width: 750px) {
    width: 30rem;
    top: 8rem;
    left: calc(50% - 15rem);
    border-radius: 1rem;
  }
  @media (min-width: 1200px) {
    top: 12rem;
  }
`;

export const Container = styled.div`
  width: 100vw;
  min-height: calc(100vh - 4.5rem);
  padding: 1rem 1rem 4rem 1rem;
  background-color: var(--background);

  border-radius: 0 0 2rem 2rem;
  box-shadow: 0 10px 11px 0 rgba(0, 20, 76, 0.5);

  position: absolute;
  top: 4.5rem;
  left: 0;
  z-index: 999;

  @media (min-width: 750px) {
    width: 95vw;
    min-height: calc(50vh - 4.5rem);
    padding: 2rem;
    top: 6rem;
    left: calc(50% - 47.5vw);
    border-radius: 0 0 2rem 2rem;
  }
  @media (min-width: 1200px) {
    position: fixed;
    width: 50vw;
    top: 11rem;
    left: calc(50% - 25vw);
  }
`;

export const SearchResultContainer = styled.div`
  width: 100%;
  height: 100%;

  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: repeat(9, 1fr);
  grid-gap: 1rem;
  @media (min-width: 750px) {
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(5, 1fr);
    grid-gap: 1rem;
  }
`;

export const LoadMoreButton = styled.div`
  width: 80%;
  padding: 0.5rem;
  margin: 2rem auto;
  font-size: 1.6rem;
  font-weight: 600;
  text-align: center;
  display: flex;
  background: var(--yellow);
  border: none;
  border-radius: 1rem;
  outline: none;
  transition: 0.3s ease-in-out all;
  &:hover {
    background-color: #ffb910;
  }
  a {
    width: 100%;
    height: 100%;
    color: var(--blue);
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  @media (min-width: 750px) {
    grid-column: 1 / span 2;
    width: 50%;
    padding: 1rem;
    font-size: 1.8rem;
    margin: 2rem auto;
  }
`;
