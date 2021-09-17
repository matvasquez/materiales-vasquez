import styled from "styled-components";

export const MainStiled = styled.main`
  width: 100%;
  padding: 1rem;
  margin-top: 4.5rem;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  align-items: center;
  @media (min-width: 750px) {
    margin-top: 10rem;
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 2rem;
    justify-items: center;
    align-items: center;
  }
  @media (min-width: 1000px) and (orientation: portrait) {
    width: 95%;
    min-height: 60vh;
    margin: 10rem auto;
  }
  @media (min-width: 1000px) and (orientation: landscape) {
    width: 80%;
    min-height: 40vh;
    margin: 5rem auto;
    grid-gap: 2.5rem;
  }
  @media (min-width: 1200px) {
    width: 90%;
    padding: 2rem 1rem;
    margin-top: 20rem;
    grid-gap: 3rem;
  }
`;
