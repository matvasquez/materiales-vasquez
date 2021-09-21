import styled, { keyframes } from "styled-components";

export const MainStiled = styled.main`
  width: 100%;
  padding: 1rem;
  margin: 4.5rem auto 2rem;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: center;
  @media (min-width: 750px) {
    margin-top: 8rem;
  }
  @media (min-width: 1200px) {
    margin: 19rem auto 15rem;
  }
`;

export const MainTitle = styled.h1`
  width: 90%;
  margin: 2rem auto;
  font-size: 1.8rem;
  @media (min-width: 1200px) {
    width: 80%;
  }
`;

export const BuyersData = styled.section`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`;

export const FormStyled = styled.form`
  width: 90%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  position: relative;
  @media (min-width: 750px) {
    background-color: var(--white);
    border-radius: 1.5rem;
  }
  @media (min-width: 1200px) {
    width: 80%;
    padding: 5rem 1rem;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 2rem;
    justify-items: center;
    align-items: start;
  }
`;

export const CardStyled = styled.div`
  width: 100%;
  min-height: 17rem;
  padding: 1rem;
  margin: 1rem auto 0;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;

  background-color: var(--white);
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 2000 1500'%3E%3Cdefs%3E%3CradialGradient id='a' gradientUnits='objectBoundingBox'%3E%3Cstop offset='0' stop-color='%2377acf1'/%3E%3Cstop offset='1' stop-color='%2304009a'/%3E%3C/radialGradient%3E%3ClinearGradient id='b' gradientUnits='userSpaceOnUse' x1='0' y1='750' x2='1550' y2='750'%3E%3Cstop offset='0' stop-color='%233e56c6'/%3E%3Cstop offset='1' stop-color='%2304009a'/%3E%3C/linearGradient%3E%3Cpath id='s' fill='url(%23b)' d='M1549.2 51.6c-5.4 99.1-20.2 197.6-44.2 293.6c-24.1 96-57.4 189.4-99.3 278.6c-41.9 89.2-92.4 174.1-150.3 253.3c-58 79.2-123.4 152.6-195.1 219c-71.7 66.4-149.6 125.8-232.2 177.2c-82.7 51.4-170.1 94.7-260.7 129.1c-90.6 34.4-184.4 60-279.5 76.3C192.6 1495 96.1 1502 0 1500c96.1-2.1 191.8-13.3 285.4-33.6c93.6-20.2 185-49.5 272.5-87.2c87.6-37.7 171.3-83.8 249.6-137.3c78.4-53.5 151.5-114.5 217.9-181.7c66.5-67.2 126.4-140.7 178.6-218.9c52.3-78.3 96.9-161.4 133-247.9c36.1-86.5 63.8-176.2 82.6-267.6c18.8-91.4 28.6-184.4 29.6-277.4c0.3-27.6 23.2-48.7 50.8-48.4s49.5 21.8 49.2 49.5c0 0.7 0 1.3-0.1 2L1549.2 51.6z'/%3E%3Cg id='g'%3E%3Cuse href='%23s' transform='scale(0.12) rotate(60)'/%3E%3Cuse href='%23s' transform='scale(0.2) rotate(10)'/%3E%3Cuse href='%23s' transform='scale(0.25) rotate(40)'/%3E%3Cuse href='%23s' transform='scale(0.3) rotate(-20)'/%3E%3Cuse href='%23s' transform='scale(0.4) rotate(-30)'/%3E%3Cuse href='%23s' transform='scale(0.5) rotate(20)'/%3E%3Cuse href='%23s' transform='scale(0.6) rotate(60)'/%3E%3Cuse href='%23s' transform='scale(0.7) rotate(10)'/%3E%3Cuse href='%23s' transform='scale(0.835) rotate(-40)'/%3E%3Cuse href='%23s' transform='scale(0.9) rotate(40)'/%3E%3Cuse href='%23s' transform='scale(1.05) rotate(25)'/%3E%3Cuse href='%23s' transform='scale(1.2) rotate(8)'/%3E%3Cuse href='%23s' transform='scale(1.333) rotate(-60)'/%3E%3Cuse href='%23s' transform='scale(1.45) rotate(-30)'/%3E%3Cuse href='%23s' transform='scale(1.6) rotate(10)'/%3E%3C/g%3E%3C/defs%3E%3Cg transform='rotate(0 0 0)'%3E%3Cg transform='rotate(0 0 0)'%3E%3Ccircle fill='url(%23a)' r='3000'/%3E%3Cg opacity='0.5'%3E%3Ccircle fill='url(%23a)' r='2000'/%3E%3Ccircle fill='url(%23a)' r='1800'/%3E%3Ccircle fill='url(%23a)' r='1700'/%3E%3Ccircle fill='url(%23a)' r='1651'/%3E%3Ccircle fill='url(%23a)' r='1450'/%3E%3Ccircle fill='url(%23a)' r='1250'/%3E%3Ccircle fill='url(%23a)' r='1175'/%3E%3Ccircle fill='url(%23a)' r='900'/%3E%3Ccircle fill='url(%23a)' r='750'/%3E%3Ccircle fill='url(%23a)' r='500'/%3E%3Ccircle fill='url(%23a)' r='380'/%3E%3Ccircle fill='url(%23a)' r='250'/%3E%3C/g%3E%3Cg transform='rotate(0 0 0)'%3E%3Cuse href='%23g' transform='rotate(10)'/%3E%3Cuse href='%23g' transform='rotate(120)'/%3E%3Cuse href='%23g' transform='rotate(240)'/%3E%3C/g%3E%3Ccircle fill-opacity='0.1' fill='url(%23a)' r='3000'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
  background-size: cover;
  border-radius: 1rem;
  position: relative;
  overflow: hidden;
  z-index: 2;

  @media (min-width: 750px) {
    width: 40rem;
    min-height: 22rem;
    margin: 2rem;
  }
  @media (min-width: 1200px) {
    grid-column: 1 / span 1;
    grid-row: 1 / span 1;
  }
`;

export const CardDataTitle = styled.h4`
  width: 100%;
  text-align: left;
  font-size: 2rem;
  font-weight: 400;
  color: var(--white);
`;

export const ChipStyled = styled.div`
  width: 5rem;
  height: 3rem;
  margin-right: auto;
  background: #f1d083;
  border-radius: 0.5rem;
`;

const write = keyframes`
  from { width: 0 }
  to { width: 100% }
`;

export const CardNumber = styled.input`
  width: 82%;
  margin: 0 auto;
  font-size: 2rem;
  font-family: "Share Tech Mono", "Roboto", monospace;
  text-align: center;
  color: var(--white);
  background: none;
  /* border: 0.1rem solid var(--background); */
  border: none;
  border-radius: 0.5rem;
  outline: none;
  animation: ${write} 3s steps(30) 1s 1 alternate;
  ::placeholder {
    color: var(--background);
    font-family: "Share Tech Mono", "Roboto", monospace;
    font-size: 2rem;
    text-decoration: underline;
    opacity: 0.5;
  }
`;

export const DateAndCode = styled.div`
  width: 80%;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const DateContainer = styled.div`
  width: 4rem;
  margin-right: 10%;
  position: relative;
`;

export const ShowDAte = styled.input`
  width: 6rem;
  border-radius: 0.5rem;
  font-size: 1.2rem;
  font-family: "Share Tech Mono", "Roboto", monospace;
  text-align: start;
  color: var(--background);
  background: none;
  /* border: 0.1rem solid var(--background); */
  border: none;
  border-radius: 0.5rem;
  text-align: center;
  opacity: ${(props) => props.isPlaceholder && "0.5"};
  outline: none;
  ::placeholder {
    color: var(--background);
    font-family: "Share Tech Mono", "Roboto", monospace;
    font-size: 1.2rem;
    opacity: 0.5;
  }
`;

export const InputDate = styled.input`
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: aquamarine;
  color: transparent;
  border: none;
  outline: none;
  &::-webkit-calendar-picker-indicator {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;
    cursor: pointer;
    opacity: 0;
  }
`;

export const InputCode = styled.input`
  width: 6rem;
  font-size: 1.2rem;
  font-family: "Share Tech Mono", "Roboto", monospace;
  text-align: start;
  color: var(--background);
  background: none;
  /* border: 0.1rem solid var(--background); */
  border: none;
  border-radius: 0.5rem;
  text-align: center;
  outline: none;
  ::placeholder {
    color: var(--background);
    font-size: 1.2rem;
    font-family: "Share Tech Mono", "Roboto", monospace;
    opacity: 0.5;
  }
`;

export const InputName = styled.input`
  width: 82%;
  margin: 0;
  margin-right: auto;
  font-size: 1.4rem;
  font-family: "Share Tech Mono", "Roboto", monospace;
  text-align: start;
  text-transform: uppercase;
  color: var(--background);
  background: none;
  /* border: 0.1rem solid var(--background); */
  border: none;
  border-radius: 0.5rem;
  outline: none;
  animation: ${write} 3s steps(30) 4s 1 alternate;
  ::placeholder {
    color: var(--background);
    font-size: 1.4rem;
    font-family: "Share Tech Mono", "Roboto", monospace;
    text-decoration: underline;
    opacity: 0.5;
  }
`;

export const LogoTypeCard = styled.div`
  width: 5rem;
  height: 3rem;
  margin-right: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  background: none;
  border-radius: 0.5rem;
  position: absolute;
  right: 0.5rem;
  bottom: 0.5rem;
  overflow: hidden;
`;

export const LogoContainer = styled.div`
  width: 20rem;
  position: absolute;
  right: -25%;
  bottom: -5rem;
  opacity: 0.7;
  z-index: -1;
`;

// ____________________________________

export const ShippingAddress = styled.div`
  width: 100%;
  padding: 3rem 1rem 1rem;
  margin: 0.5rem auto;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  background-color: var(--white);
  border-radius: 1rem;
  transform: translateY(-1rem);
  @media (min-width: 750px) {
    width: 90%;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: repeat(5, min-content);
    grid-gap: 0.5rem;
  }
  @media (min-width: 1200px) {
    grid-column: 2 / span 1;
    grid-row: 1 / span 1;
  }
`;

export const Subtitle = styled.p`
  font-size: 1.5rem;
  font-weight: 500;
  @media (min-width: 750px) {
    grid-column: 1 / span 3;
    grid-row: 1 / span 1;
    text-align: center;
  }
`;

export const StreetAndNumber = styled.div`
  width: 100%;
  margin: 0.5rem auto;
  display: grid;
  grid-template-columns: 3fr 1fr;
  grid-column-gap: 0.5rem;
  @media (min-width: 750px) {
    grid-column: 1 / span 3;
    grid-row: 3 / span 1;
  }
`;

export const StateAndZipCode = styled(StreetAndNumber)`
  @media (min-width: 750px) {
    grid-column: 1 / span 2;
    grid-row: 2 / span 1;
    grid-template-columns: 3fr 2fr;
  }
`;

export const InputBase = styled.input`
  width: 100%;
  height: initial;
  padding-left: 0.5rem;
  margin: 1rem auto;
  font-size: 1.4rem;
  text-align: start;
  text-transform: capitalize;
  color: var(--blue);
  background: none;
  border: none;
  border-bottom: 0.1rem solid var(--blue);
  border-radius: 0;
  outline: none;
  transition: 0.3s ease-in-out all;
  ::placeholder {
    color: var(--blue);
    font-size: 1.2rem;
    text-transform: initial;
  }
`;

// ----------------------------------------------

export const ShippingData = styled(ShippingAddress)`
  border-radius: 1rem;
  @media (min-width: 750px) {
    width: 90%;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-around;
    align-items: flex-start;
    ${InputBase} {
      width: 45%;
    }
  }
  @media (min-width: 1200px) {
    grid-column: 1 / span 1;
    grid-row: 1 / span 1;
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: min-content;
    grid-gap: 1rem;
    justify-items: center;
    align-items: center;
    ${InputBase} {
      width: 100%;
    }
  }
`;

export const DataSubtitle = styled.p`
  font-size: 1.5rem;
  font-weight: 500;
  @media (min-width: 750px) {
    grid-column: 1 / span 2;
    grid-row: 1 / span 1;
    text-align: center;
  }
`;

export const InputSameName = styled(InputBase)`
  transition: 0.3s ease-in-out all;
  ${(props) =>
    props.same &&
    `
    height: 0;
    margin: 0;
    border: none;
    `}
`;

export const InputEmail = styled(InputBase)`
  text-transform: initial;
`;

export const ProofOfPurchase = styled.p`
  grid-column: 2 / span 1;
  grid-row: 4 / span 1;
  font-size: 1rem;
  text-align: center;
`;

export const References = styled.textarea`
  width: 100%;
  min-height: 8rem;
  max-height: 12rem;
  padding-left: 0.5rem;
  margin: 0.5rem auto;
  font-size: 1.4rem;
  text-align: start;
  color: var(--blue);
  background: none;
  border: none;
  border-bottom: 0.1rem solid var(--blue);
  border-radius: 0;
  outline: none;
  resize: vertical;
  ::placeholder {
    color: var(--blue);
    font-size: 1.2rem;
  }
  @media (min-width: 750px) {
    grid-column: 1 / span 3;
    grid-row: 4 / span 1;
  }
`;

export const SelectCity = styled.select`
  width: 100%;
  padding-left: 0.5rem;
  margin: 0.5rem auto;
  font-size: 1.4rem;
  text-align: start;
  color: var(--blue);
  background: none;
  border: none;
  border-bottom: 0.1rem solid var(--blue);
  outline: none;
  ::placeholder {
    color: var(--blue);
    font-size: 1.2rem;
  }
  @media (min-width: 750px) {
    grid-column: 3 / span 1;
    grid-row: 2 / span 1;
  }
`;

export const FreeShippingText = styled.p`
  margin: 0.5rem auto;
  padding: 0.2rem;
  background-color: var(--yellow);
  font-size: 1.2rem;
  font-weight: 500;
  border-radius: 0.4rem;
  @media (min-width: 750px) {
    grid-column: 2 / span 2;
    grid-row: 5 / span 1;
  }
`;

export const InvoiceQuestion = styled.div`
  width: 100%;
  padding-left: 0.5rem;
  margin: 0.5rem auto;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  cursor: pointer;
  @media (min-width: 750px) {
    grid-column: 1 / span 1;
    grid-row: 5 / span 1;
  }
`;

export const InvoiceInput = styled.input`
  opacity: 0;
`;

export const Invoice = styled.label`
  margin: 1rem 0 1rem 1rem;
  color: var(--blue);
  font-size: 1.2rem;
  position: relative;
  ::after {
    content: "";
    width: 1.2rem;
    height: 1.2rem;
    margin-left: 0;
    background-color: var(--blue);
    border-radius: 50%;
    border: 0.1rem solid var(--blue);
    position: absolute;
    top: calc(50% - 0.6rem);
    left: -2.5rem;
    transition: 0.3s ease-in-out all;
    ${(props) =>
      props.bg
        ? `
    background-color: #ffc947;
    `
        : `
    background-color: var(--blue);
    `}
  }
`;

// ----------------------------------------------

export const SelectCFDI = styled(SelectCity)`
  @media (min-width: 750px) {
    grid-row: 1 / span 1;
  }
`;

export const ShippingInvoice = styled(ShippingAddress)`
  margin: 0;
  transform: translateY(-2.5rem);
  transition: 0.3s ease-in-out all;
  border-radius: 0 0 1rem 1rem;
  ${(props) =>
    props.hide
      ? `
        height: initial;
    `
      : `
        height: 0;
        padding: 0 1rem;
        overflow: hidden;
    `}
  @media (min-width: 750px) {
    width: 90%;
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(3, min-content);
    grid-gap: 1rem;
    ${SelectCFDI} {
      grid-column: 1 / span 2;
      grid-row: 3 / span 1;
    }
  }

  @media (min-width: 1200px) {
    grid-column: 2 / span 1;
    grid-row: 2 / span 1;
    height: initial;
    padding-top: 1rem;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: flex-start;
    align-items: flex-start;
    transform: translateY(0);
    input {
      width: 45%;
    }
  }
`;

export const InputRFC = styled(InputBase)`
  text-transform: uppercase;
`;

export const MyListOfItems = styled.section`
  width: 100%;
  padding: 1rem;
  margin: 2rem auto;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  background-color: var(--white);
  border-radius: 1rem;
  @media (min-width: 750px) {
    width: 90%;
  }
  @media (min-width: 1200px) {
    grid-column: 1 / span 2;
    grid-row: 3 / span 1;
    width: 50%;
  }
`;

export const BuyButton = styled.button`
  width: 100%;
  padding: 0.5rem;
  margin-top: 1rem;
  background-color: var(--yellow);
  color: var(--blue);
  font-size: 1.6rem;
  font-weight: 700;
  text-align: center;
  border-radius: 2rem;
  outline: none;
  border: none;
  cursor: pointer;
  @media (min-width: 750px) {
    width: 80%;
    margin: 2rem auto;
  }
  @media (min-width: 1200px) {
    grid-column: 1 / span 2;
    grid-row: 5 / span 1;
    width: 50%;
  }
`;

export const CostDetails = styled(MyListOfItems)`
  margin-top: 1rem;
  @media (min-width: 1200px) {
    grid-column: 1 / span 1;
    grid-row: 2 / span 1;
  }
`;

export const CostContainer = styled.div`
  width: 100%;
  margin: 0.5rem auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const InputCost = styled.input`
  width: 35%;
  font-size: 1.5rem;
  text-align: right;
  font-weight: 700;
  color: var(--blue);
  background: none;
  border: none;
  outline: none;
`;

export const RelatedArticles = styled.section`
  width: 90%;
  margin: 4rem auto;

  @media (min-width: 1200px) {
    width: 80%;
  }
`;

export const RelatedTitle = styled.h4`
  width: 90%;
  margin: 1rem auto;
  font-size: 2rem;
  span {
    text-transform: capitalize;
  }
`;

export const PreviewItemContainer = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 1rem;
  justify-items: center;
  align-content: center;

  overflow-x: scroll;
  overscroll-behavior-x: contain;
  scroll-behavior: smooth;
  scroll-snap-type: x mandatory;
  scrollbar-width: none;
  ::-webkit-scrollbar {
    display: none;
  }
  @media (min-width: 750px) {
    width: 100%;
    margin: 0 auto;
    grid-template-columns: repeat(4, 1fr);
    grid-column-gap: 1rem;
  }
`;
