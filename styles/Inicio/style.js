import styled from "styled-components";

export const MainStyled = styled.main`
  width: 100%;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`;

export const FirstSection = styled.div`
  width: 100%;
  margin: 1rem 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Total = styled.span`
  font-size: 1.6rem;
  font-weight: 700;
`;

export const Section = styled.section`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  @media (min-width: 1000px) {
    margin: 3rem 0;
  }
`;

export const TitleSection = styled.h3`
  font-size: 1.6rem;
  font-weight: 700;
  @media (min-width: 1000px) {
    font-size: 2rem;
  }
`;
