import styled from "styled-components";

export const Main = styled.main`
  width: 90%;
  min-height: 40vh;
  margin: 10rem auto 6rem;
  background-color: #fd5949;
  border-radius: 1rem;
  color: var(--white);
  position: relative;
  overflow: hidden;
  h1 {
    font-size: 16rem;
    position: absolute;
    top: -4rem;
    left: -2rem;
    opacity: 0.15;
  }
  h3 {
    margin: 1rem auto;
    font-size: 8rem;
  }
  p {
    margin: 1rem auto;
    text-align: center;
  }
  a {
    padding: 1rem;
    margin: 2rem auto;
    color: var(--blue);
    text-align: center;
    background-color: var(--white);
    border-radius: 1rem;
    cursor: pointer;
    position: relative;
    z-index: 1;
    transition: 0.3s ease-in-out all;
  }
  @media (min-width: 750px) {
    margin: 15rem auto 10rem;
    border-radius: 2rem;
    h1 {
      font-size: 30rem;
      font-weight: 700;
      top: -10rem;
      left: initial;
      opacity: 0.1;
    }
    a {
      width: 30%;
      &:hover {
        background-color: var(--background);
      }
    }
  }

  @media (min-width: 1000px) and (orientation: portrait) {
    min-height: 55vh;
  }
  @media (min-width: 1000px) and (orientation: landscape) {
    width: 70%;
    margin-top: 22rem;
    h1 {
      font-size: 30rem;
      top: calc(50% - 18rem);
      z-index: 0;
    }
  }
`;
