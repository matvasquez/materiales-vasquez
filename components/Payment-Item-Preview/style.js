import styled from "styled-components";

export const ItemContainer = styled.div`
  width: 100%;
  margin: 0.5rem;
  display: grid;
  grid-template-columns: 1fr 3fr 0.5fr 1fr;
  grid-column-gap: 0.5rem;
  justify-content: center;
  align-items: center;
`;

export const ImageContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  img {
    width: 100%;
    height: 100%;
    object-fit: fill;
  }
`;

export const Text = styled.p`
  font-size: 1.2rem;
`;

export const Total = styled.p`
  font-size: 1.2rem;
  font-weight: 700;
`;

export const Price = styled.p`
  font-size: 0.9rem;
  text-align: right;
`;
