import styled from "styled-components";

export const MainTitle = styled.h1`
  width: 100%;
  font-size: 2rem;
`;

export const SectionStyled = styled.section`
  width: 100%;
  padding: 1rem;
  margin: 2rem auto;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  background-color: var(--white);
  border-radius: 1rem;
  @media (min-width: 750px) {
    width: 90%;
  }
`;

export const Text = styled.p`
  width: 90%;
  margin: 1rem auto;
  font-size: 1.6rem;
  font-weight: 500;
`;

export const Container = styled.div`
  width: 100%;
  text-align: center;
`;

export const ButtonLogIn = styled.button`
  width: 90%;
  padding: 1rem;
  margin: 1rem auto;
  font-size: 1.6rem;
  text-align: center;
  color: var(--white);
  border: none;
  ${(props) => props.color && `background-color: ${props.color};`}
  border-radius: 0.5rem;
  outline: none;
  cursor: pointer;
  box-shadow: 5px 5px 8px -1px rgba(102, 102, 102, 0.6);
  @media (min-width: 1200px) {
    width: 50%;
  }
`;

export const SpanStyles = styled.span`
  font-weight: 700;
`;
