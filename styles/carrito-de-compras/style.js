import styled from "styled-components";

export const FirstSection = styled.section`
  width: 100%;
  padding: 0 1rem;
  margin: 1rem 0;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  @media (min-width: 750px) {
    width: 70%;
    margin: 2rem 0;
  }

  @media (min-width: 1000px) {
    width: 50%;
    margin: 2rem 0;
  }
`;

export const Title = styled.h4`
  font-size: 2rem;
  font-weight: 500;
  color: var(--blue);
`;

export const FreeShipping = styled.p`
  font-size: 1rem;
`;

export const PaymentButton = styled.a`
  width: 100%;
  padding: 0.5rem;
  margin: 0.5rem 0;
  text-align: center;
  font-weight: 500;
  color: var(--white);
  background-color: var(--light-blue);
  border-radius: 0.5rem;
  opacity: 0.8;
  transition: 0.3s ease-in-out all;
  &:hover {
    opacity: 1;
  }
`;

export const ArtilcesSection = styled(FirstSection)`
  @media (min-width: 750px) {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 2rem;
    justify-items: center;
    align-items: center;
  }
`;

export const Separator = styled.hr`
  width: 100%;
  margin: 0.5rem 0;
  border-top: 0.1rem solid var(--blue);
  opacity: 0.3;
  @media (min-width: 750px) {
    display: none;
  }
`;

export const DetailsSection = styled(FirstSection)`
  margin-top: 2rem;
`;

export const Details = styled.div`
  width: 100%;
  margin: 0.5rem 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  @media (min-width: 750px) {
    margin: 2rem 0;
  }
`;

export const Totals = styled.p`
  font-size: 1.6rem;
  font-weight: 700;
`;

export const Footnotes = styled.p`
  font-size: 0.8rem;
  text-align: center;
`;
