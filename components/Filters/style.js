import styled from "styled-components";

export const SectionStyled = styled.section`
  width: 95%;
  margin: 2rem 0;
  display: grid;
  grid-template-columns: 85% 15%;
  grid-template-rows: 3.2rem;
  grid-gap: 0.5rem;
  @media (min-width: 1200px) {
    width: 100%;
    margin: 0;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
  }
`;

export const CategoriesContainer = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(
    ${(props) => (props.numColumns ? props.numColumns : 12)},
    min-content
  );
  /* grid-template-rows: minmax(2rem, 3rem); */
  grid-gap: 0 0.5rem;
  align-items: center;
  overflow-x: scroll;
  ::-webkit-scrollbar {
    display: none;
  }
  @media (min-width: 1200px) {
    display: none;
  }
`;

export const ButtonCategory = styled.button`
  width: fit-content;
  height: fit-content;
  padding: 0.2rem 0.4rem;
  color: var(--blue);
  white-space: nowrap;
  background: none;
  border: 0.1rem solid var(--blue);
  border-radius: 0.5rem;
  outline: none;
  cursor: pointer;
  transition: 0.3s ease-in-out all;
  &:hover {
    background-color: var(--yellow);
    border: 0.1rem solid var(--yellow);
  }
`;

export const MoreContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  @media (min-width: 1200px) {
    display: none;
  }
`;

export const ButtonMore = styled.button`
  width: 100%;
  height: 100%;
  padding: 0.2rem 0.4rem;
  color: var(--white);
  background-color: var(--blue);
  border: 0.1rem solid var(--blue);
  border-radius: 0.5rem;
  outline: none;
  cursor: pointer;
`;
