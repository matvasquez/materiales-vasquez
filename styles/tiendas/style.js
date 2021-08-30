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
    margin-top: 8rem;
  }
  @media (min-width: 1200px) {
    padding: 2rem 1rem;
    margin-top: 19rem;
  }
`;

export const MainTitle = styled.h1`
  width: 100%;
  font-size: 1.8rem;
`;
