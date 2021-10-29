import styled from "styled-components";

export const HeaderStyled = styled.header`
  width: 100%;
  padding: 1rem;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: repeat(2, 1fr);
  grid-gap: 1rem;
  justify-items: center;
  align-items: center;
  @media (min-width: 1000px) {
    grid-template-columns: 2fr 1fr 2fr;
    grid-template-rows: repeat(2, 1fr);
  }
`;

export const SearchAndButtonContainer = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 9fr;
  grid-gap: 2rem;
  @media (min-width: 1000px) {
    grid-column: 1 / span 1;
  }
`;

export const LogoContainer = styled.a`
  width: 5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: 0.3s ease-in-out all;
  @media (min-width: 1000px) {
    width: 8rem;
  }
`;
