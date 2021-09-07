import styled from "styled-components";

export const ShoppingCartStyled = styled.section`
  width: 100vw;
  padding: 0.5rem 0 0;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  background-color: var(--blue);
  color: var(--background);
  position: fixed;
  top: 110%;
  bottom: -10%;
  left: 0;
  right: 0;
  transition: 0.3s ease-in-out all;
  transition-timing-function: cubic-bezier(0.43, -0.03, 0.38, 1.37);
  z-index: 1000;
  ${(props) =>
    props.carIsEmpty &&
    `
    top: calc(100% - 8rem);
    height: 10rem;
  `}

  ${(props) =>
    props.carIsOpen &&
    `
    height: 100vh;
    top: 0;
    bottom: 0;
  `}
  ${(props) =>
    props.hide &&
    `
    display: none;
  `}
  @media (min-width: 750px) {
    ${(props) =>
      props.carIsEmpty &&
      `
    width: 60vw;
    height: min-content;
    padding: 1rem;
    top: calc(100% - 10rem);
    left: calc(50% - 30vw);
    border-radius: 2rem;
  `}
    ${(props) =>
      props.carIsOpen &&
      `
      width: 90vw;
      height: 90vh;
      top: calc(50% - 45vh);
      left: calc(50% - 45vw);
    `}
  }
  @media (min-width: 1200px) {
    width: 20vw;
    left: calc(99.2% - 20vw);
    ${(props) =>
      props.carIsOpen &&
      `
      width: 80vw;
      padding: 2rem;
      left: calc(50% - 40vw);
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      grid-template-rows: 1fr 9fr;
      justify-items: center;
      grid-row-gap: 4rem;
      grid-column-gap: 1rem;
    `}
  }
`;

export const CornerLeftContainer = styled.div`
  width: 3.6rem;
  height: 3.6rem;
  position: absolute;
  bottom: 99%;
  left: 0;
  @media (min-width: 750px) {
    display: none;
  }
`;

export const CornerRightContainer = styled(CornerLeftContainer)`
  right: 0;
  left: initial;
`;

export const CartPreview = styled.section`
  width: 95%;
  display: grid;
  grid-template-columns: 80% 20%;
  grid-column-gap: 1rem;
  justify-items: start;
  align-content: center;
`;

export const OpenCloseButton = styled.button`
  background-color: transparent;
  color: transparent;
  width: 100%;
  height: 100%;
  outline: none;
  border: none;
  position: absolute;
  top: 0rem;
  right: 0rem;

  ${(props) =>
    props.carIsOpen &&
    `
      height: 4rem;
  `}

  @media (min-width: 1200px) {
    width: fit-content;
    height: fit-content;
    padding: 0.2rem;
    font-size: 1rem;
    color: var(--yellow);
    font-weight: 500;
    background: none;
    border: none;
    outline: none;
    cursor: pointer;
    display: block;
    position: absolute;
    top: 0.5rem;
    right: 2rem;
    transition: 0.3s ease-in-out all;
    :hover {
      color: var(--white);
    }
    ${(props) =>
      props.carIsOpen &&
      `
      padding: 0.4rem;
      top: 2rem;
      right: 2rem;
      border: 0.1rem solid var(--white);
      border-radius: 0.5rem;
      :hover{
        border: 0.1rem solid var(--yellow);
    }
  `}
  }
`;

export const Title = styled.h5`
  width: 95%;
  font-size: 1.2rem;
  text-align: left;
  margin-bottom: 0.5rem;
  ${(props) =>
    props.carIsOpen &&
    `
    font-size: 2rem;
    margin-bottom: 1rem;
    grid-column: 1 / span 2;
    grid-row: 1 / span 1;
  `}
`;

export const CartItemsOpen = styled.section`
  width: 95%;
  height: 40%;

  overflow-y: scroll;
  scrollbar-width: none;
  ::-webkit-scrollbar {
    display: none;
  }
  @media (min-width: 1200px) {
    ${(props) =>
      props.carIsOpen &&
      `
    grid-column: 1 / span 1;
    grid-row: 2 / span 1;
    min-height: 50vh;
  `}
  }
`;

export const Totals = styled.section`
  width: 100%;
  height: 45%;
  padding: 2rem 1rem 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  @media (min-width: 750px) {
    width: 80%;
    height: 50vh;
  }
  @media (min-width: 1200px) {
    ${(props) =>
      props.carIsOpen &&
      `
      grid-column: 2 / span 1;
      grid-row: 2 / span 1;
      width: 100%;
  `}
  }
`;

export const ApllyPromoCodeButton = styled.div`
  width: 100%;
  height: 4rem;
  padding: 0 1rem;
  display: grid;
  grid-template-columns: 3fr 1fr;
  background-color: var(--white);
  border-radius: 2rem;
`;

export const PromoCodeInput = styled.input`
  width: 100%;
  height: 100%;
  padding: 1rem;
  background: none;
  font-size: 1.4rem;
  color: var(--text);
  border: none;
  outline: none;
  ::placeholder {
    color: var(--blue);
  }
`;

export const PromoCodeButton = styled.button`
  width: 100%;
  height: 80%;
  margin: auto;
  background-color: var(--blue);
  font-size: 1.4rem;
  color: var(--white);
  font-weight: 500;
  border-radius: 1rem;
  border: none;
  outline: none;
`;

export const DetailsPrice = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  @media (min-width: 750px) {
    width: 90%;
    margin: 1rem auto;
  }
`;

export const NumberOfItems = styled.p`
  width: 100%;
  margin: 0 auto;
  text-align: center;

  /* @media (min-width: 750px) {
    width: 90%;
    margin: 1rem auto;
  } */
`;

export const SubPrice = styled.p`
  font-size: 1.5rem;
  font-weight: 500;
`;

export const TotalText = styled.p`
  font-size: 1.8rem;
  font-weight: 700;
  color: var(--white);
`;

export const TotalPrice = styled(TotalText)`
  color: var(--yellow);
`;

export const BuyButtonContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const BuyButton = styled.a`
  width: 100%;
  padding: 1rem;
  background-color: var(--yellow);
  color: var(--blue);
  font-size: 2rem;
  font-weight: 700;
  text-align: center;
  border-radius: 2rem;
  outline: none;
  border: none;
  cursor: pointer;
`;

export const FreeShippingText = styled.p`
  width: 100%;
  font-size: 1rem;
  text-align: center;
  font-weight: 400;
`;

// ___________________

export const ItemsContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  border-radius: 2rem;
  overflow-x: scroll;
  scrollbar-width: none;
  ::-webkit-scrollbar {
    display: none;
  }
`;

export const ContainerScroll = styled.div`
  width: fit-content;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

export const CarItemCounter = styled.div`
  width: 3.5rem;
  height: 3.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.5rem;
  color: var(--blue);
  background-color: var(--yellow);
  border-radius: 50%;
  transition: 0.5s ease-in-out all;

  @media (min-width: 750px) {
    margin-left: auto;
    margin-right: 1rem;
  }
`;

export const Counter = styled.p`
  font-size: 1.4rem;
  font-weight: 700;
  color: var(--blue);
  transition: 0.6s ease-in-out all;
`;

export const Background = styled.div`
  display: none;
  @media (min-width: 750px) {
    display: block;
    width: 100vw;
    height: 100vh;
    background-color: var(--background);
    position: fixed;
    top: 0;
    left: 0;
    z-index: 999;
    transition: 0.3s ease-in-out all;
    opacity: 0;
    ${(props) =>
      props.carIsOpen &&
      `
      opacity: 0.9;
    `}
  }
`;
