import styled from "styled-components";

export const SubCategorieContainer = styled.ul`
  width: 100%;
  min-width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  border-left: 0.1rem solid var(--blue);
  border-bottom: 0.1rem solid var(--blue);
  position: relative;
  border-radius: 0 0 0 1rem;
  transition: 0.3s ease-in-out all;
  visibility: hidden;
  max-height: 0;
  @media (min-width: 750px) {
    width: 90%;
    min-width: 90%;
  }
  @media (min-width: 1200px) {
    width: min-content;
    background-color: var(--blue);
    border-radius: 0 0 0.5rem 0.5rem;
    border: none;
    position: absolute;
    top: 108%;
    left: 0;
    z-index: 1;
    ${(props) =>
      props.columns &&
      `
          width: 60rem;
          left: -100%;
        `}
  }
`;

export const Circle = styled.div`
  width: 1rem;
  height: 1rem;
  border: 0.1rem solid var(--blue);
  border-radius: 50%;
  position: absolute;
  top: -1rem;
  left: -0.5rem;
  @media (min-width: 1200px) {
    display: none;
  }
`;

export const CircleBottom = styled(Circle)`
  position: absolute;
  top: initial;
  bottom: -0.5rem;
  left: initial;
  right: -1rem;
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

export const Arrow = styled.div`
  width: 1rem;
  height: 1rem;
  position: absolute;
  right: 0;
  bottom: 1.5rem;
  transform: rotate(270deg);
  transition: 0.3s ease-in-out all;
  &:after {
    content: "\\25BC";
    position: absolute;
    bottom: 0;
    right: 0;
    font-size: 1rem;
    line-height: 1rem;
    color: var(--blue);
    text-align: center;
  }

  @media (min-width: 1200px) {
    width: 0.8rem;
    height: 0.8rem;
    right: -1px;
    bottom: 0;
    transform: rotate(0);
    &:after {
      font-size: 0.8rem;
      line-height: 0.8rem;
      color: var(--yellow);
    }
  }
`;

export const LiStyled = styled.li`
  width: 100%;
  height: fit-content;
  margin: 0.4rem 0;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  border-radius: 0;
  position: relative;
  &:hover {
    ${LineLink} {
      width: 100%;
    }
    ${SubCategorieContainer} {
      visibility: visible;
      max-height: 300vh;
    }
    ${Arrow} {
      transform: rotate(180deg);
    }
  }

  @media (min-width: 1200px) {
    justify-content: center;
    align-items: center;
    /* overflow: visible; */
    &:hover {
      ${Arrow} {
        transform: rotate(180deg);
      }
      ${SubCategorieContainer} {
        ${(props) =>
          props.columns
            ? `
            left: -100%;
            width: 60rem;
            max-height: 85vh;
            display: grid;
            grid-template-columns: 1fr 1fr;
            grid-gap: 0 0.5rem;
            visibility: visible;
        `
            : `
        visibility: visible;
      max-height: 150vh;
    `}
      }
    }
  }
`;

export const SubLiStyled = styled.li`
  width: 75%;
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
  @media (min-width: 1200px) {
    width: 100%;
  }
`;

export const AnchorStyled = styled.a`
  width: 100%;
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

export const SubAnchorStyled = styled(AnchorStyled)``;
