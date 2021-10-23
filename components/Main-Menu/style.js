import styled from "styled-components";

export const NavStyled = styled.nav`
  width: 100vw;
  min-height: 100vh;
  padding: 4rem 1rem 8rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  background-color: var(--background);
  position: fixed;
  top: 0;
  left: ${(props) => (props.open ? "0" : "-100%")};
  z-index: 20000;
  transition: 0.3s ease-in-out all;
  @media (min-width: 750px) {
    padding: 5rem;
    justify-content: flex-start;
    background-color: rgb(0 20 76 / 85%);
  }
  @media (min-width: 1200px) {
    width: 99vw;
    height: fit-content;
    min-height: 1rem;
    padding: 0;
    justify-content: center;
    align-items: center;
    border-radius: 1rem;
    position: fixed;
    top: 8rem;
    left: calc(50% - 49.5vw);
    z-index: 1000;
  }
`;

export const CloseButton = styled.button`
  width: 2.5rem;
  height: 2.5rem;
  padding: 0.5rem 0.5rem 0.5rem 0;
  border: none;
  background: none;
  outline: none;
  cursor: pointer;
  position: absolute;
  top: 2rem;
  right: 2rem;
  &:after {
    content: "\\2715";
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    font-size: 2.5rem;
    color: var(--blue);
    line-height: 2.5rem;
    text-align: center;
  }
  @media (min-width: 750px) {
    width: 3rem;
    height: 3rem;
    &:after {
      font-size: 3rem;
      color: var(--white);
      line-height: 3rem;
    }
  }
  @media (min-width: 1200px) {
    display: none;
  }
`;

export const UlStyled = styled.ul`
  width: 100%;
  height: 90%;
  margin-top: 4rem;

  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;

  @media (min-width: 750px) {
    width: 60%;
    height: 100%;
    min-height: 50vh;
    padding: 1rem;
    justify-content: space-between;
    background-color: var(--background);
    border-radius: 2rem;
  }
  @media (min-width: 1200px) {
    width: 100%;
    height: fit-content;
    min-height: 1rem;
    padding: 0.5rem 1rem;
    margin: 0;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    background-color: var(--blue);
    border-radius: 1rem;
  }
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

export const LiStyled = styled.li`
  width: 100%;
  margin: 1rem 0;
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
  }
  @media (min-width: 1200px) {
    margin: 0.2rem 0;
    justify-content: center;
    overflow: visible;
  }
`;

export const AnchorStyled = styled.a`
  width: 100%;
  height: 100%;
  padding: 1rem;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  font-size: 1.8rem;
  font-weight: 500;
  color: var(--blue);
  background: none;
  cursor: pointer;
  transition: 0.3s ease-in-out all;
  @media (min-width: 1200px) {
    width: min-content;
    padding: 0.5rem 1rem;
    color: var(--background);
    white-space: nowrap;
    font-size: 1.4rem;
  }
`;

export const SocialIconsConatiner = styled.li`
  width: 60%;
  margin: 1rem auto;
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (min-width: 750px) {
    width: fit-content;
    height: 30rem;
    flex-direction: column;
    position: absolute;
    right: 20%;
    top: 20rem;
  }
  @media (min-width: 1200px) {
    width: 10%;
    height: fit-content;
    flex-direction: row;
    right: 7%;
    top: -6.5rem;
  }
`;

export const LinkIcon = styled.a`
  width: 3.5rem;
  height: 3.5rem;
  padding: 0.3rem;
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${(props) => (props.bg ? `${props.bg}` : "var(--yellow)")};
  border-radius: 50%;
  cursor: pointer;
  transition: 0.3s ease-in-out all;
  svg {
    transition: 0.3s ease-in-out all;
    fill: var(--background);
  }
  @media (min-width: 750px) {
    width: 4.5rem;
    height: 4.5rem;
    background: transparent;
    svg {
      fill: var(--background);
    }
    &:hover {
      background: ${(props) => (props.bg ? `${props.bg}` : "var(--blue)")};
      svg {
      }
    }
  }
  @media (min-width: 1200px) {
    width: 3.5rem;
    height: 3.5rem;
    background: transparent;
    svg {
      fill: var(--blue);
    }
    &:hover {
      background: ${(props) => (props.bg ? `${props.bg}` : "var(--blue)")};
      svg {
        fill: var(--background);
      }
    }
  }
`;
