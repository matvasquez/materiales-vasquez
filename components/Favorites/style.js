import styled from "styled-components";

export const ContainerFavorites = styled.section`
  width: 100%;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`;

export const Title = styled.h3`
  font-size: 1.6rem;
  text-align: center;
`;

export const Navigation = styled.nav`
  width: 100%;
  margin: 2rem auto;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`;

export const List = styled.ul`
  width: 100%;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`;

export const ListOptions = styled.li`
  width: 100%;
  margin: 0.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ListLink = styled.a`
  width: 100%;
  padding: 0.5rem;
  margin: 0 1rem;
  font-size: 1.6rem;
  font-weight: 400;
  text-transform: capitalize;
  text-align: center;
  white-space: nowrap;
  color: var(--white);
  background-color: var(--light-blue);
  border-radius: 0.5rem;
  opacity: 0.8;
  &:hover {
    opacity: 1;
  }
`;
