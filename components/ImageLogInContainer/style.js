import styled from "styled-components";

export const LogInContainer = styled.a`
  grid-column: 6 / span 1;
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  border: 0.1rem solid var(--blue);
  cursor: pointer;
  position: relative;

  @media (min-width: 750px) {
    width: 3rem;
    height: 3rem;
  }

  @media (min-width: 1200px) {
    grid-column: 3 / span 1;
    width: 3.5rem;
    height: 3.5rem;
    position: absolute;
    top: 1.8rem;
    right: 1.8rem;
  }
`;

export const ItemsIlikedContainer = styled.div`
  width: 1.2rem;
  height: 1.2rem;
  color: var(--background);
  background-color: var(--red);
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  position: absolute;
  top: -0.5rem;
  right: -0.5rem;
  z-index: 1;
`;

export const NumberItemsIliked = styled.p`
  font-size: 0.8rem;
  text-align: center;
  color: var(--background);
`;
