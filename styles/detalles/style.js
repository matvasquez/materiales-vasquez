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
  @media (min-width: 1000px) {
    width: 80%;
    margin: 2rem auto;
    p {
      font-size: 1.2rem;
    }
  }
`;

export const Product = styled.section`
  width: 100%;
  min-height: 50vh;
  padding: 0.5rem;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: min-content min-content;
  grid-gap: 2rem;
  justify-items: center;
  align-items: start;
  border-radius: 0.5rem;
  background-color: #efefef;
  box-shadow: 2px 2px 5px 1px #dcdcdc;
  @media (min-width: 1000px) {
    width: 80%;
    margin: 0 auto;
    grid-template-columns: 1fr 1fr;
    align-items: center;
    background-color: #ffffff;
    box-shadow: initial;
  }
`;

export const ImageContainer = styled.div`
  width: 100%;
  height: 100%;
  min-height: 20vh;
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
  @media (min-width: 750px) {
    width: 70%;
    min-height: 30vh;
    border-radius: 1rem;
  }
  @media (min-width: 1000px) {
    width: 100%;
    min-height: 40vh;
  }
`;

export const InfoContainer = styled.div`
  width: 100%;
  margin: 1rem 0;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  @media (min-width: 750px) {
    width: 70%;
  }
  @media (min-width: 1000px) {
    width: 80%;
    padding: 1rem;
    background-color: #efefef;
  }
`;

export const Title = styled.h1`
  margin: 1rem 0;
  font-size: 1.8rem;
  font-weight: 500;
  text-transform: capitalize;
  @media (min-width: 1000px) {
    font-size: 2.2rem;
  }
`;

export const PriceContainer = styled.div`
  width: 100%;
  min-height: 1.8rem;
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
  @media (min-width: 1000px) {
    font-size: 2rem;
  }
`;

export const Stock = styled.p`
  span {
    font-size: 1.6rem;
    font-weight: 700;
  }
  @media (min-width: 1000px) {
    span {
      font-size: 1.8rem;
    }
  }
`;

export const Description = styled.p`
  margin: 1.5rem 0;
  font-weight: 400;
  text-transform: capitalize;
`;

export const Sku = styled.p`
  margin: 1rem 0;
  font-weight: 500;
`;

export const RelatedSection = styled.section`
  width: 100%;
  margin: 4rem 0;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  h3 {
    font-size: 1.6rem;
    text-align: center;
    margin: 1rem auto;
  }
  @media (min-width: 1000px) {
    width: 80%;
    margin: 4rem auto;
    h3 {
      font-size: 1.8rem;
      text-align: left;
      margin: 1rem 0;
    }
  }
`;
