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

export const SubDirectory = styled.div`
  width: 100%;
  margin: 1rem 0;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  p {
    font-size: 1rem;
  }
`;

export const ImageContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #ffffff;
  border-radius: 0.5rem;
  overflow: hidden;
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
  @media (min-width: 1000px) {
    width: 50%;
    min-height: 40vh;
  }
`;

export const Title = styled.h1`
  margin: 1rem 0;
  font-size: 1.8rem;
  font-weight: 500;
  text-transform: capitalize;
`;

export const PriceContainer = styled.div`
  width: 100%;
  margin: 1rem 0;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  @media (min-width: 1000px) {
    width: 50%;
  }
`;

export const Price = styled.p`
  font-size: 1.8rem;
  font-weight: 700;
  del {
    font-size: 1.4rem;
    font-weight: 500;
    opacity: 0.5;
  }
`;

export const InfoContainer = styled.div`
  width: 100%;
  margin: 1rem 0;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  @media (min-width: 1000px) {
    width: 50%;
  }
`;

export const Sku = styled.p`
  margin: 1rem 0;
  font-weight: 500;
`;
