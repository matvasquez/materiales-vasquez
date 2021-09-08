import styled from "styled-components";

export const UserInfo = styled.section`
  width: 100%;
  padding: 1rem 2rem;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  background-color: var(--white);
  border-radius: 2rem;
  position: relative;
  @media (min-width: 750px) {
    padding: 3rem;
    display: grid;
    grid-template-columns: 2fr 1fr;
    grid-template-rows: repeat(2, 5rem);
  }

  @media (min-width: 1000px) {
    width: 80%;
  }
`;

export const ImageContainer = styled.div`
  width: 8rem;
  height: 8rem;
  margin: 1rem auto;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 0.1rem solid var(--blue);
  border-radius: 50%;
  overflow: hidden;
  img {
    width: 100%;
    height: 100%;
    object-fit: fill;
  }
  @media (min-width: 750px) {
    grid-column: 2 / span 1;
    grid-row: 1 / span 2;
    width: 10rem;
    height: 10rem;
    margin: 0 auto 0 0;
  }
`;

export const UserName = styled.h3`
  @media (min-width: 750px) {
    font-size: 3rem;
  }
`;

export const ButtonLogOut = styled.button`
  margin: 0;
  padding: 0.3rem;
  font-size: 1rem;
  background-color: var(--background);
  color: var(--blue);
  border: none;
  outline: none;
  cursor: pointer;
  border-radius: 0.5rem;
  position: absolute;
  top: 1rem;
  right: 1rem;
  transition: 0.3s ease-in-out all;
  &:hover {
    color: var(--background);
    background-color: #ff131d;
  }
`;

export const SectionIliked = styled.section`
  width: 100%;
  padding: 1rem;
  margin: 2rem auto 1rem;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  background-color: var(--white);
  border-radius: 2rem;
  @media (min-width: 1000px) {
    width: 80%;
  }
  @media (min-width: 1000px) and (orientation: portrait) {
    min-height: 50vh;
    margin: 3rem auto;
  }
  @media (min-width: 1000px) and (orientation: landscape) {
  }
`;
