import styled from "styled-components";

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
    margin: 1rem 0;
  }
  @media (min-width: 1200px) {
    width: 80%;
    padding: 5rem 1rem;
    margin: 0;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 2rem;
    justify-items: center;
    align-items: start;
    border-radius: 1.5rem 1.5rem 0 0;
  }
`;

// ____________________________________

export const ShippingAddress = styled.div`
  width: 100%;
  padding: 3rem 1rem 1rem;
  margin: 1rem auto 0;

  grid-template-columns: 1fr 1fr;
  grid-gap: 1rem;

  background-color: var(--white);
  border-radius: ${(props) => (props.invoice ? `1rem 1rem 0 0` : `1rem`)};
  transition: 0.3s ease-in-out all;
  ${(props) => (props.showForm ? `display: grid;` : `display: none;`)}
  @media (min-width: 750px) {
    width: 90%;
    grid-template-columns: repeat(3, 1fr);
  }
  @media (min-width: 1200px) {
    grid-column: 2 / span 1;
    grid-row: 1 / span 1;
  }
`;

export const Subtitle = styled.p`
  font-size: 1.5rem;
  font-weight: 500;
  grid-column: 1 / span 2;
  @media (min-width: 750px) {
    grid-column: 1 / span 3;
    grid-row: 1 / span 1;
    text-align: center;
  }
`;

// ____________________________________

export const PickUpConatiner = styled.div`
  grid-column: 1 / span 2;
  width: 100%;
  padding: 1rem;
  margin: 0 auto;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;

  background-color: var(--white);
  transition: 0.3s ease-in-out all;

  p {
    width: 100%;
    margin: 1rem 0;
    text-align: center;
  }

  span {
    font-weight: 700;
    font-size: 1.8rem;
  }
  @media (min-width: 750px) {
    grid-column: 1 / span 3;
    width: 90%;
  }
  @media (min-width: 1200px) {
    grid-column: 1 / span 3;
    grid-row: 3 / span 1;
  }
`;

export const PickUpLink = styled.a`
  width: 60%;
  padding: 0.5rem;
  margin: 1rem auto;
  background-color: var(--yellow);
  color: var(--blue);
  font-size: 1.6rem;
  font-weight: 700;
  text-align: center;
  border-radius: 2rem;
  outline: none;
  border: none;
  cursor: pointer;
`;

export const InputBase = styled.input`
  grid-column: 1 / span 2;
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
  @media (min-width: 750px) {
    grid-column: auto / span 1;
  }
`;

export const ZipCode = styled(InputBase)`
  grid-column: 1 / span 1;
  @media (min-width: 750px) {
    grid-column: 2 / span 1;
  }
`;

export const PhoneNumber = styled(InputBase)`
  @media (min-width: 750px) {
    grid-column: 1 / span 1;
  }
`;

export const SelectCity = styled.select`
  grid-column: 1 / span 2;
  width: 100%;
  margin: 1rem auto;
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
  }
`;

// ----------------------------------------------

export const ShippingData = styled(ShippingAddress)`
  border-radius: 1rem;
  grid-template-columns: 1fr 1fr;
  grid-gap: 1rem;
  @media (min-width: 750px) {
    width: 90%;
  }
  @media (min-width: 1200px) {
    grid-column: 1 / span 1;
    grid-row: 1 / span 1;
    ${(props) => (props.showForm ? `display: grid;` : `display: none;`)}
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
  grid-column: 1 / span 2;
  grid-row: 1 / span 1;
  text-align: center;
`;

export const InputSameName = styled(InputBase)`
  transition: 0.3s ease-in-out all;
  grid-column: 1 / span 2;
  ${(props) =>
    props.same &&
    `
    height: 0;
    margin: 0;
    border: none;
    `}
  @media (min-width: 750px) {
    grid-column: auto / span 1;
  }
`;

export const InputEmail = styled(InputBase)`
  text-transform: initial;
  grid-column: 1 / span 2;
  @media (min-width: 750px) {
    grid-column: 2 / span 1;
  }
`;

export const ProofOfPurchase = styled.p`
  grid-column: 1 / span 2;
  font-size: 0.9rem;
  text-align: center;
  opacity: 0.6;
  @media (min-width: 750px) {
    grid-column: 2 / span 1;
  }
`;

export const References = styled.textarea`
  grid-column: 1 / span 2;
  width: 100%;
  min-height: 8rem;
  max-height: 12rem;
  padding: 0.5rem;
  margin: 0.5rem auto;
  font-size: 1.4rem;
  text-align: start;
  color: var(--blue);
  background: none;
  border: none;
  border: 0.1rem solid var(--blue);
  border-radius: 1rem;
  outline: none;
  resize: vertical;
  ::placeholder {
    color: var(--blue);
    font-size: 1.2rem;
  }
  @media (min-width: 750px) {
    grid-column: 1 / span 3;
  }
  @media (min-width: 1200px) {
    grid-row: 6 / span 1;
  }
`;

export const FreeShippingText = styled.p`
  grid-column: 1 / span 2;
  margin: 0.5rem auto;
  padding: 0.5rem;
  background-color: var(--yellow);
  font-size: 1.2rem;
  font-weight: 500;
  border-radius: 0.4rem;

  display: flex;
  justify-content: center;
  align-items: center;
  @media (min-width: 750px) {
    grid-column: 1 / span 3;
    grid-row: 5 / span 1;
    padding: 0.2rem 0.5rem;
    cursor: default;
  }
`;

export const InvoiceQuestion = styled.div`
  grid-column: 1 / span 2;
  width: 100%;
  padding-left: 0.5rem;
  margin: 0.5rem auto;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  cursor: pointer;
  @media (min-width: 750px) {
    grid-column: 1 / span 1;
    grid-row: 7 / span 1;
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
    cursor: pointer;
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

export const PickUpQuestion = styled(InvoiceQuestion)`
  grid-row: 1 / span 1;

  @media (min-width: 1200px) {
    grid-column: 1 / span 3;
    grid-row: 2 / span 1;
  }
`;
export const PickUpInput = styled(InvoiceInput)``;
export const PickUp = styled(Invoice)``;

// ----------------------------------------------

export const SelectCFDI = styled(SelectCity)`
  @media (min-width: 750px) {
    grid-row: 1 / span 1;
  }
`;

export const ShippingInvoice = styled(ShippingAddress)`
  margin: 0;
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
    ${(props) => (props.showForm ? `display: flex;` : `display: none;`)}
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: flex-start;
    align-items: flex-start;
    input {
      width: 45%;
    }
    ${(props) =>
      props.hide
        ? `
      opacity: 1;
    `
        : `
      opacity: 0.3;
    `}
  }
`;

export const InputRFC = styled(InputBase)`
  text-transform: uppercase;
`;

export const MyListOfItems = styled.section`
  width: 100%;
  padding: 1rem;
  margin: 1rem auto 0;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  background-color: var(--white);
  border-radius: 1rem;
  ${(props) => (props.showForm ? `display: flex;` : `display: none;`)}
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
  display: flex;
  margin-top: 1rem;
  @media (min-width: 1200px) {
    grid-row: 2 / span 1;
    ${(props) =>
      props.showForm
        ? `grid-column: 1 / span 1;`
        : `width: 30%; grid-column: 1 / span 2;`}
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
  grid-template-columns: 1fr 1fr;
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
