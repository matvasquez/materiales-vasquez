import styled from "styled-components";

// -------SectionEmpty

export const SectionEmpty = styled.section`
  width: 100%;
  min-height: 50vh;
  padding: 2rem;
  margin-top: 3rem auto;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  @media (min-width: 750px) and (orientation: portrait) {
    min-height: 55vh;
  }
  @media (min-width: 1000px) and (orientation: portrait) {
    min-height: 65vh;
  }
  @media (min-width: 1200px) and (orientation: landscape) {
    width: 40vw;
    min-height: 35vh;
  }
`;

export const GoToTopButton = styled.button`
  width: 4rem;
  height: 4rem;
  border-radius: 50%;
  border: 0.1rem solid rgb(0 20 76 / 40%);
  background-color: rgb(0 20 76 / 20%);

  display: flex;
  justify-content: center;
  align-items: center;

  position: fixed;
  bottom: 15rem;
  right: 1rem;
  z-index: 1000;
  transition: 0.3s ease-in-out all;
  cursor: pointer;

  &:after {
    content: "\\21E7";
    font-size: 2.5rem;
    color: rgb(0 20 76 / 60%);
    line-height: 2.5rem;
    text-align: center;
    transition: 0.3s ease-in-out all;
  }
  &:hover {
    border: 0.1rem solid rgb(255 201 71 / 70%);
    background-color: rgb(255 201 71 / 40%);
    &:after {
      transform: translateY(-3.5rem);
    }
  }
`;

export const TitleSection = styled.h1`
  font-size: 2rem;
  margin: 2rem auto;
`;

export const EmptyContainer = styled.div`
  width: 100%;
  margin: 2rem auto;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const TextEmpty = styled.p`
  margin: 2rem auto;
  color: #5e4cc9;
  font-size: 1.8rem;
  font-weight: 600;
  text-align: center;
`;

export const ClearFilters = styled.button`
  width: 100%;
  padding: 1rem;
  color: var(--blue);
  font-size: 1.6rem;
  font-weight: 700;
  background-color: var(--yellow);
  border-radius: 1rem;
  border: none;
  outline: none;
  cursor: pointer;
  transition: 0.3s ease-in-out all;
  @media (min-width: 750px) {
    width: 80%;
    bottom: 6rem;
  }
  @media (min-width: 1200px) {
    width: 90%;
    position: initial;
    margin: 5rem auto;
  }
`;

export const LinkMainCategorie = styled.a`
  width: 80%;
  padding: 0.5rem;
  margin: 2rem auto 0;
  font-size: 1.6rem;
  font-weight: 400;
  text-align: center;
  background: var(--yellow);
  border: 0.1rem solid #ffb910;
  border-radius: 1rem 1rem 0 0;
  outline: none;
  cursor: pointer;
  transition: 0.3s ease-in-out all;
  &:hover {
    background-color: #ffb910;
  }
  @media (min-width: 750px) {
    width: 50%;
    margin: 5rem auto 0;
  }
  @media (min-width: 1200px) {
    display: none;
  }
`;
