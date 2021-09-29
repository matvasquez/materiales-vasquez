import styled from "styled-components";

export const SearchResult = styled.a`
  width: 90%;
  padding: 1rem 0.2rem;
  margin: 1rem auto;
  color: var(--text);
  background-color: var(--white);
  display: grid;
  grid-template-columns: 1fr 2fr;
  grid-auto-rows: 7rem;
  justify-items: center;
  align-content: stretch;
  border: none;
  border-radius: 1rem;
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`;

export const ImageContainer = styled.div`
  width: 70%;
`;

export const InfoContainer = styled.div`
  width: 100%;
  padding: 0.5rem;
  color: var(--text);
  display: grid;
  grid-template-columns: 2fr 1fr;
  grid-template-rows: 2fr 1fr;
`;

export const Name = styled.p`
  grid-column: 1 / span 2;
  grid-row: 1 / span 1;
  font-size: 1.6rem;
  font-weight: 500;
  text-align: left;
  text-transform: capitalize;
`;

export const Category = styled.p`
  grid-column: 1 / span 1;
  grid-row: 2 / span 1;
  font-size: 1.2rem;
  font-weight: 400;
  text-align: left;
  text-transform: capitalize;
`;

export const Price = styled.p`
  grid-column: 2 / span 1;
  grid-row: 2 / span 1;
  padding: 0.2rem 0.5rem;
  text-align: center;
  font-size: 1.6rem;
  font-weight: 700;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--yellow);
  border-radius: 1rem;
`;
