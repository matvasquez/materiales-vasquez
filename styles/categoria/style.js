import styled from "styled-components";

// -------SectionEmpty

export const SectionEmpty = styled.main`
  width: 100%;
  min-height: 50vh;
  padding: 2rem;
  margin-top: 3rem auto;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`;

export const TitleSection = styled.h1`
  font-size: 2.2rem;
  margin: 2rem auto;
`;

export const EmptyContainer = styled.div`
  width: 70%;
  margin: 2rem auto;
  padding: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 0.1rem solid var(--blue);
  border-radius: 2rem;
`;

export const TextEmpty = styled.p`
  font-size: 1.8rem;
  margin: 2rem auto;
`;
