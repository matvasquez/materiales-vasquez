import styled from "styled-components";

export const MainStiled = styled.main`
  width: 100%;
  min-height: 50vh;
  padding: 1rem;
  margin: 1rem 0 2rem;
  margin-top: 4.5rem;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  @media (min-width: 750px) {
    width: 90%;
    min-height: 50vh;
    margin: 8rem auto;
  }
  @media (min-width: 1200px) {
    width: 70%;
    margin-top: 19rem;
  }
`;

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
`;

export const SpanStyles = styled.span`
  font-weight: 700;
`;

// ----------------------------------------------

export const UserInfo = styled.section`
  width: 100%;
  padding: 1rem 2rem;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  background-color: var(--white);
  border-radius: 1rem;
  position: relative;
  @media (min-width: 750px) {
    padding: 3rem;
    display: grid;
    grid-template-columns: 2fr 1fr;
    grid-template-rows: repeat(2, 5rem);
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
    background-color: var(--red);
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
  border-radius: 1rem;
`;
