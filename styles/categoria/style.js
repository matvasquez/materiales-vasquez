import styled from "styled-components";

export const MainStyled = styled.main`
  width: 100%;
  padding: 1rem;
  margin: 1rem 0 4rem;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`;

export const Title = styled.h1`
  margin: 1rem 0;
  font-size: 1.8rem;
  font-weight: 500;
  text-transform: capitalize;
  @media (min-width: 1000px) {
    font-size: 2.5rem;
  }
`;

export const SectionEmpty = styled.section`
  width: 50vh;
`;

export const TextEmpty = styled.p`
  font-size: 1.6rem;
  @media (min-width: 1000px) {
    width: 100%;
    margin-top: 2rem;
    font-size: 2rem;
    text-align: center;
  }
`;
