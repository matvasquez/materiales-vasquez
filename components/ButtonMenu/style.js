import styled from "styled-components";

export const LineOne = styled.div`
  width: 2rem;
  height: 0.2rem;
  background-color: var(--blue);
  border-radius: 0.1rem;
  transition: all 0.3s ease-in-out;
  @media (min-width: 750px) {
    width: 3rem;
  }
`;

export const LineTwo = styled(LineOne)`
  width: 1.5rem;
  @media (min-width: 750px) {
    width: 2rem;
  }
`;

export const LineThree = styled(LineOne)`
  width: 1rem;
  @media (min-width: 750px) {
    width: 1.5rem;
  }
`;

export const ButtonStyled = styled.button`
  width: 2.5rem;
  height: 2.5rem;
  padding: 0.3rem 0.3rem 0.3rem 0;
  margin-right: auto;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: flex-start;
  background: none;
  border: none;
  outline: none;
  cursor: pointer;
  @media (min-width: 750px) {
    width: 3rem;
    height: 3rem;
  }
  @media (min-width: 1200px) {
    display: none;
  }
`;
