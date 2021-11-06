import styled from "styled-components";

export const NavStyled = styled.nav`
  width: 100vw;
  min-height: 100vh;
  padding: 4rem 1rem 8rem;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  background-color: var(--background);
  position: absolute;
  top: 0;
  left: ${(props) => (props.open ? "0" : "-100%")};
  z-index: 999;
  overflow-x: hidden;
  transition: 0.3s ease-in-out all;
  ${(props) => props.open && `box-shadow: 0.5rem 0.5rem 1rem 0.5rem #434343;`}

  @media (min-width: 1000px) {
    grid-column: 1 / span 3;
    grid-row: 2 / span 1;
    width: 99vw;
    height: fit-content;
    min-height: 1rem;
    padding: 0;
    justify-content: center;
    align-items: center;
    border-radius: 1rem;
    position: initial;
    overflow-x: visible;
  }
`;

export const CloseButton = styled.button`
  width: 2.5rem;
  height: 2.5rem;
  padding: 0.5rem 0.5rem 0.5rem 0;
  border: none;
  background: none;
  outline: none;
  cursor: pointer;
  position: absolute;
  top: 2rem;
  right: 2rem;
  &:after {
    content: "\\2715";
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    font-size: 2.5rem;
    color: var(--blue);
    line-height: 2.5rem;
    text-align: center;
  }
  @media (min-width: 750px) {
    width: 3rem;
    height: 3rem;
    &:after {
      font-size: 3rem;
      line-height: 3rem;
    }
  }
  @media (min-width: 1000px) {
    display: none;
  }
`;

export const UlStyled = styled.ul`
  width: 100%;
  height: 90%;
  margin-top: 2rem;

  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;

  @media (min-width: 750px) {
    width: 60%;
    height: 100%;
    min-height: 50vh;
    padding: 1rem;
    justify-content: space-between;
    background-color: var(--background);
    border-radius: 2rem;
  }
  @media (min-width: 1000px) {
    width: 100%;
    height: 4rem;
    min-height: 1rem;
    padding: 0;
    margin: 0;
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-start;
    background-color: var(--blue);
    border-radius: 1rem;
  }
`;
