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
`;

export const SearchResultContainer = styled.div`
  max-height: calc(100vh - 4.5rem);
  padding: 1rem 1rem 4rem 1rem;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: var(--background);

  position: fixed;
  top: 4.5rem;
  left: 0;
  overflow-y: scroll;
  z-index: 1100;
  ::-webkit-scrollbar {
    display: none;
  }
  @media (min-width: 750px) {
    padding: 2rem;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 2rem;
    top: 8rem;
    box-shadow: 0 10px 11px 0 rgba(0, 20, 76, 0.5);
  }
  @media (min-width: 1200px) {
    width: 50vw;
    top: 19rem;
    left: calc(50% - 25vw);
  }
`;
