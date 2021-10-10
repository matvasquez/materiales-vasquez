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
  z-index: 1100;
  box-shadow: 0 10px 11px 0 rgba(0, 20, 76, 0.5);
  @media (min-width: 750px) {
    top: 8rem;
  }
  @media (min-width: 1200px) {
    top: 12rem;
  }
`;

export const Container = styled.div`
  width: 100vw;
  height: calc(100vh - 4.5rem);
  padding: 1rem 1rem 4rem 1rem;
  background-color: var(--background);
  border-top: 0.5rem solid var(--blue);
  border-bottom: 0.5rem solid var(--blue);

  position: fixed;
  top: 4.5rem;
  left: 0;
  z-index: 1100;

  @media (min-width: 750px) {
    width: 95vw;
    height: calc(60vh - 4.5rem);
    padding: 2rem;
    top: 6rem;
    left: calc(50% - 47.5vw);
    box-shadow: 0 10px 11px 0 rgba(0, 20, 76, 0.5);
    border: none;
    border-radius: 0 0 2rem 2rem;
  }
  @media (min-width: 1200px) {
    width: 50vw;
    height: calc(65vh - 4.5rem);
    top: 11rem;
    left: calc(50% - 25vw);
    border: none;
  }
`;

export const SearchResultContainer = styled.div`
  width: 100%;
  height: 100%;

  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr 1fr 1fr 1fr 1fr 1fr 0.5fr;
  grid-gap: 1rem;
  overflow-y: scroll;

  ::-webkit-scrollbar {
    display: none;
  }
  @media (min-width: 750px) {
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: 1fr 1fr 1fr 0.5fr;
    grid-gap: 2rem;
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
  }
  @media (min-width: 750px) {
    grid-column: 1 / span 2;
    width: 50%;
    margin: 5rem auto 2rem;
  }
`;
