import styled from "styled-components";

export const MainStiled = styled.main`
  width: 100%;
  padding: 1rem;
  margin-top: 4.5rem;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  @media (min-width: 750px) {
    margin-top: 8rem;
  }
  @media (min-width: 1200px) {
    width: 98%;
    margin: 19rem auto 2rem;
    display: grid;
    grid-template-columns: 1fr 4fr;
    grid-template-rows: min-content;
    grid-gap: 1rem;
    justify-items: center;
    align-items: start;
  }
`;

export const Title = styled.h1`
  width: 100%;
  font-size: 2.5rem;
  text-transform: capitalize;
  @media (min-width: 1200px) {
    grid-column: 1 / span 2;
    text-align: center;
  }
`;

export const MainSection = styled.section`
  width: 100vw;
  padding: 2rem;
  margin-top: 1rem;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(2, 1fr);
  grid-gap: 2rem;
  justify-items: center;
  align-content: center;
  ${(props) => props.bg && `background-color: ${props.bg};`}
  @media (min-width: 750px) {
    width: 95%;
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: 1fr;
  }
  @media (min-width: 1200px) {
    width: 100%;
    padding: 2rem 3rem;
    display: flex;
    justify-content: space-around;
    align-items: center;
  }
`;

export const ListSection = styled.section`
  width: 100%;
  margin-top: 2rem;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(14rem, 1fr));
  grid-gap: 1rem;
  align-items: stretch;
  @media (min-width: 750px) {
    width: 95%;
    grid-template-columns: repeat(auto-fit, minmax(22rem, 1fr));
  }
  @media (min-width: 1200px) {
    width: 100%;
    padding: 0;
    margin: 0;
  }
`;

export const EndContainer = styled.div`
  grid-column: 1 / span 2;
  width: 100%;
  margin: 1rem 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const End = styled.p`
  padding: 0.5rem;
  font-size: 1.6rem;
  font-weight: 600;
  border: none;
`;

export const ButtonMore = styled.button`
  width: 80%;
  padding: 0.5rem;
  font-size: 1.6rem;
  font-weight: 600;
  background: var(--yellow);
  border: none;
  border-radius: 1rem;
  outline: none;
  cursor: pointer;
  transition: 0.3s ease-in-out all;
  &:hover {
    background-color: var(--blue);
    color: var(--yellow);
  }
  @media (min-width: 1200px) {
    width: 50%;
  }
`;

// -------SectionEmpty

export const MainEmpty = styled(MainStiled)`
  padding: 2rem;
  margin-top: 3rem auto;
`;

export const SectionEmpty = styled.section`
  width: 100%;
  padding: 0.5rem 0;
  margin: 6rem 0 3rem;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 1rem;
  @media (min-width: 750px) {
    width: 95%;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 2rem;
  }
  @media (min-width: 1000px) {
    grid-column: 1 / span 2;
    width: 90%;
    grid-template-columns: repeat(4, 1fr);
  }
`;
