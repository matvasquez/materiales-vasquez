import styled from "styled-components";

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
    border-radius: 0 0 1.5rem 1.5rem;
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

export const Iframe = styled.iframe`
  width: 90%;
  ${(props) => (props.show ? `height: 36.5rem;` : `height: 0;`)}
  padding: 0;
  margin: 1.5rem auto;
  ${(props) => (props.show ? `display: flex;` : `display: none;`)}
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  background-color: var(--white);
  border-radius: 1rem;
  border: none;
  outline: none;
  @media (min-width: 750px) {
    ${(props) => (props.show ? `height: 30rem;` : `height: 0;`)}
    ${(props) => (props.show ? `display: flex;` : `display: none;`)}
  }
  @media (min-width: 1200px) {
    width: 80%;
    margin: 0 auto;
    ${(props) => (props.show ? `height: 60rem;` : `height: 0;`)}
    ${(props) => (props.show ? `display: flex;` : `display: none;`)}
    border-radius: 0 0 2rem 2rem;
  }
`;
