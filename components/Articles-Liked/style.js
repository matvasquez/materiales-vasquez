import styled from "styled-components";

export const SectionStyled = styled.section`
  width: 100%;
  padding: 0.5rem 0;
  margin: 2rem 0 3rem;
  text-align: right;

  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;

  @media (min-width: 750px) {
    width: 95%;
  }
`;

export const TitleSection = styled.h3`
  width: 100%;
  margin-bottom: 2rem;
  font-size: 2.5rem;
  text-align: left;
  font-weight: 500;
  @media (min-width: 750px) {
    font-size: 3rem;
    font-weight: 700;
  }
`;

export const ItemsContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  overflow: hidden;
`;

export const ItemsScroll = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(${(props) => props.rows && props.rows}, 50vw);
  grid-auto-rows: 27rem;
  justify-items: center;
  align-items: stretch;
  grid-gap: 1rem;
  overflow-x: scroll;
  ::-webkit-scrollbar {
    display: none;
  }

  @media (min-width: 350px) {
    grid-template-columns: repeat(
      ${(props) => props.rows && props.rows},
      fit-content
    );
  }
  @media (min-width: 750px) {
    grid-template-columns: repeat(${(props) => props.rows && props.rows}, 1fr);
    grid-auto-rows: 30rem;
  }
  @media (min-width: 1200px) {
    grid-template-columns: repeat(
      ${(props) => props.rows && props.rows},
      24rem
    );
    grid-auto-rows: 35rem;
  }
`;
