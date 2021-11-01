import styled from "styled-components";

export const ItemsContainer = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 1rem;
  @media (min-width: 1000px) {
    grid-template-columns: repeat(4, 1fr);
    grid-gap: 2rem;
  }
`;
