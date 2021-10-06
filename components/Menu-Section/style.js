import styled from "styled-components";

export const SubCategorieContainer = styled.ul`
  width: min-content;
  min-width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  position: absolute;
  top: 108%;
  left: 0;
  background-color: var(--blue);
  border-radius: 0 0 0.5rem 0.5rem;
  transition: 0.3s ease-in-out all;
  visibility: hidden;
  max-height: 0;
`;

export const LineLink = styled.div`
  width: 0;
  height: 0.1rem;
  background-color: var(--blue);
  position: absolute;
  bottom: 0;
  left: 0;
  transition: 0.3s ease-in-out all;
  @media (min-width: 1200px) {
    background-color: var(--yellow);
  }
`;

export const SubLineLink = styled.div`
  width: 0;
  height: 0.1rem;
  background-color: var(--blue);
  position: absolute;
  bottom: 0;
  left: 0;
  transition: 0.3s ease-in-out all;
  @media (min-width: 1200px) {
    background-color: var(--yellow);
  }
`;

export const LiStyled = styled.li`
  height: fit-content;
  margin: 0.2rem 0;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  border-radius: 0;
  overflow: hidden;
  position: relative;
  &:hover {
    ${LineLink} {
      width: 100%;
    }
    ${SubCategorieContainer} {
      visibility: visible;
      max-height: 10rem;
    }
  }
  @media (min-width: 1200px) {
    justify-content: center;
    overflow: visible;
  }
`;

export const SubLiStyled = styled.li`
  margin: 0.2rem 0;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  border-radius: 0;
  overflow: hidden;
  position: relative;
  &:hover {
    ${SubLineLink} {
      width: 100%;
    }
  }
`;

export const AnchorStyled = styled.a`
  width: fit-content;
  height: 100%;
  padding: 1rem;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  font-size: 1.6rem;
  font-weight: 500;
  color: var(--blue);
  background: none;
  cursor: pointer;
  position: relative;
  transition: 0.3s ease-in-out all;
  @media (min-width: 1200px) {
    width: min-content;
    padding: 0.5rem 1rem;
    color: var(--background);
    white-space: nowrap;
    font-size: 1.4rem;
  }
`;

export const Arrow = styled.div`
  width: 0.5rem;
  height: 0.5rem;
  position: absolute;
  right: 0;
  bottom: 0.2rem;
  &:after {
    content: "\\21E9";
    position: absolute;
    bottom: 0;
    right: 0;
    font-size: 0.5rem;
    color: var(--yellow);
    line-height: 0.5rem;
    text-align: center;
  }
`;

export const SubAnchorStyled = styled(AnchorStyled)``;
