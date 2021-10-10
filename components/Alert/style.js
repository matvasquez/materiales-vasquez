import styled from "styled-components";

export const SectionText = styled.section`
  width: 100%;
  padding: 0.5rem;
  p {
    margin: 0.5rem 0;
    font-size: 1.6rem;
    text-align: center;
  }
  @media (min-width: 1200px) {
    p {
      font-size: 1.8rem;
    }
  }
`;

export const SectionItems = styled.section`
  width: 100%;
  max-height: 55vh;
  padding: 0.5rem;
  margin: 1rem 0;
  overflow-y: scroll;
`;

export const Item = styled.div`
  width: 100%;
  padding: 0.5rem 0;
  margin: 0.5rem 0 1.5rem;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 0.5rem;
  justify-items: start;
  align-items: center;
  background-color: var(--white);
  border-radius: 1rem;
  p {
    width: 100%;
    text-align: center;
  }
  p:first-child {
    font-size: 1.6rem;
    grid-column: 1 / span 3;
  }

  @media (min-width: 750px) {
    grid-template-columns: 2fr 1fr 1fr 1fr;
    p:first-child {
      font-size: 1.4rem;
      grid-column: 1 / auto;
    }
    p:not(:first-child) {
      text-align: center;
    }
  }
`;

export const ImageConatiner = styled.div`
  width: 5rem;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
  @media (min-width: 1200px) {
    width: 100%;
  }
`;
