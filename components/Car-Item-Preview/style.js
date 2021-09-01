import styled from "styled-components";

export const ItemConatiner = styled.div`
  width: 3.5rem;
  height: 3.5rem;
  margin-right: 1.2rem;
  border: 0.1rem solid var(--yellow);
  border-radius: 50%;
  overflow: hidden;
  transition: 1s ease-in-out all;
  img {
    width: 100%;
    height: 100%;
    object-fit: fill;
  }
`;

export const CartItem = styled.div`
  width: 100%;
  margin: 1rem auto;
  display: grid;
  /* grid-template-columns: 1fr 0.5fr 3fr 1fr; */
  grid-template-columns: 0.7fr 0.5fr 3fr 1fr;
  grid-column-gap: 0.5rem;
  justify-items: center;
  align-items: center;
  transition: 1s ease-in-out all;
`;

export const ImageContainer = styled.div`
  width: 4rem;
  height: 4rem;
  border-radius: 50%;
  overflow: hidden;
  @media (min-width: 1200px) {
    width: 6rem;
    height: 6rem;
  }
`;

export const ImageItem = styled.a`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: 1s ease-in-out all;
  img {
    width: 100%;
    height: 100%;
    object-fit: fill;
  }
`;

export const SelectContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  position: relative;
`;

export const SelectValue = styled.p`
  font-size: 1.6rem;
  font-weight: 600;
  ::after {
    content: "\\2207";
    position: absolute;
    right: 0.3rem;
    top: calc(50% - 0.6rem);
    font-size: 1.2rem;
    color: var(--yellow);
  }
`;

export const SelectStyled = styled.select`
  position: absolute;
  opacity: 0;
  cursor: pointer;
`;

export const NameContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Name = styled.a`
  width: 100%;
  color: var(--background);
  font-size: 1.2rem;
  text-align: left;
  text-transform: capitalize;
  position: relative;
  @media (min-width: 1200px) {
    font-size: 1.4rem;
  }
`;

export const PriceContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: flex-end;
`;

export const PriceTotal = styled.p`
  font-weight: 500;
`;

export const Price = styled.p`
  font-size: 1rem;
  font-weight: 400;
`;

export const SpanPrice = styled.span`
  font-size: 0.7rem;
  font-weight: 300;
`;
