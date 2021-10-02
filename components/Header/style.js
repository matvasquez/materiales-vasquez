import styled from "styled-components";

export const HeaderStyled = styled.header`
  width: 100%;
  padding: 1rem;

  transition: 0.3s ease-in-out all;

  display: grid;
  grid-template-columns: repeat(6, 1fr);
  justify-items: right;
  align-items: center;

  background-color: var(--background);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: ${(props) => (props.zindex ? 998 : 999)};
  @media (min-width: 750px) {
    padding: 2rem;
  }

  @media (min-width: 1200px) {
    padding: 2rem 1rem;
    grid-template-columns: 1fr 2fr 1fr;
    grid-template-rows: min-content;
    grid-gap: 1rem;
  }

  @media print {
    display: none;
  }
`;

export const LogoContainer = styled.a`
  grid-column: 4 / span 1;
  width: 2.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: 0.3s ease-in-out all;

  ${(props) =>
    props.activateSearch &&
    `
    display: none;
  `}
  @media (min-width: 750px) {
    width: 3rem;
    height: 3rem;
  }
  @media (min-width: 1200px) {
    grid-column: 1 / span 1;
    grid-row: 1 / span 1;
    width: 8rem;
    height: 8rem;
    margin-right: 25%;
    ${(props) =>
      props.withScroll &&
      `
      width: 5rem;
      height: 5rem;
    `}
  }
`;
