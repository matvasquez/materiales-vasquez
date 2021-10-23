import styled from "styled-components";

export const MainInfo = styled.section`
  width: 100%;
  height: calc(100vh - 4.5rem);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  background-color: var(--white);
  border-radius: 2rem;
  position: relative;
  overflow: hidden;
  @media (min-width: 750px) {
    height: calc(100vh - 8rem);
  }
  @media (min-width: 1000px) {
    width: 95%;
  }
  @media (min-width: 1200px) {
    width: 80%;
    height: fit-content;
    min-height: 55vh;
    margin: 2rem auto;
    padding: 1rem;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    border-radius: 2rem;
    background-color: var(--white);
  }
`;

export const ImageContainer = styled.div`
  width: 100%;
  height: 47%;
  background-color: var(--white);
  position: relative;
  border-radius: 2rem;
  overflow: hidden;
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
  @media (min-width: 375px) {
    margin-top: 10%;
  }
  @media (min-width: 1000px) {
    margin-top: 7%;
  }
  @media (min-width: 1200px) {
    width: 45%;
    margin: 0;
    border-radius: 2rem;
    overflow: hidden;
  }
`;

export const LikeContainer = styled.button`
  width: 3rem;
  height: 3rem;
  padding: 0.1rem;
  background: none;
  border: none;
  border-radius: 0.2rem;
  outline: none;
  cursor: pointer;
  position: absolute;
  top: 1rem;
  right: 1rem;
  z-index: 10;
  @media (min-width: 750px) {
    top: 4rem;
    right: 4rem;
  }
`;

export const Info = styled.div`
  width: 100%;
  height: 53%;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  border-radius: 2rem;
  background-color: var(--blue);
  overflow: hidden;
  @media (min-width: 370px) {
    height: 45%;
  }
  @media (min-width: 750px) {
    width: 70%;
    height: 30%;
    box-shadow: 5px 5px 19px 2px rgba(4, 19, 48, 0.51);
    position: absolute;
    bottom: 12%;
  }
  @media (min-width: 1000px) {
    width: 60%;
    height: 32%;
    bottom: 10%;
  }
  @media (min-width: 1200px) {
    width: 45%;
    min-height: 30vh;
    margin: 0;
    position: initial;
  }
`;

export const NameAndPrice = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const Name = styled.h1`
  margin: 0.8rem 0;
  font-size: 1.8rem;
  font-weight: 700;
  color: var(--background);
  @media (min-width: 750px) {
    font-size: 2rem;
    font-weight: 700;
  }
`;

export const Price = styled.p`
  margin: 0.5rem 0;
  font-size: 1.8rem;
  font-weight: 500;
  color: var(--yellow);
  @media (min-width: 750px) {
    font-size: 2rem;
    font-weight: 700;
  }
`;

export const DescriptionH3 = styled.h3`
  margin: 0.5rem auto 0 0;
  font-size: 1.6rem;
  font-weight: 700;
  color: var(--background);
`;

export const Paragraph = styled.p`
  margin: 0.4rem 0;
  font-size: 1.2rem;
  font-weight: 400;
  text-transform: capitalize;
  color: var(--background);
  ${(props) =>
    props.lowStock &&
    `
    color: var(--yellow);
  `}
`;

export const Categories = styled.div`
  width: 100%;
  padding: 0.5rem 0;
  margin: 0.5rem 0;
  font-size: 1rem;
  font-weight: 400;
  color: var(--background);
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

export const Category = styled.span`
  margin: 0 0.5rem;
  color: var(--yellow);
  font-weight: 500;
`;

export const Sku = styled.p`
  font-size: 1rem;
  font-weight: 400;
  color: var(--background);
`;

export const Span = styled.span`
  font-weight: 500;
`;

export const ButtonStyled = styled.button`
  width: 100%;
  margin: 1rem auto;
  padding: 0.5rem;
  font-size: 1.4rem;
  font-weight: 500;
  color: var(--blue);
  background-color: var(--yellow);
  border-radius: 1.5rem;
  border: 0.1rem solid var(--blue);
  outline: none;
  cursor: pointer;
  transition: 0.3s ease-in-out all;
  &:hover {
    background-color: var(--background);
  }

  @media (min-width: 750px) {
    width: 50%;
    font-size: 2rem;
    font-weight: 700;
  }
  ${(props) =>
    props.inMyCArt &&
    `
      color: var(--yellow);
      background-color: var(--blue);
      border: 0.1rem solid var(--blue);
      font-weight: 700;
      &:hover {
        background-color: var(--blue);
      }
  `}
`;

export const NotAvailable = styled.p`
  width: 100%;
  margin: 1rem auto;
  padding: 0.5rem;
  font-size: 1.4rem;
  font-weight: 500;
  text-align: center;
  color: var(--blue);
  background-color: var(--blue);
  border-radius: 1.5rem;
  transition: 0.3s ease-in-out all;
  opacity: 0.7;
  @media (min-width: 750px) {
    width: 50%;
    font-size: 1.6rem;
  }
`;

export const RelatedArticles = styled.section`
  width: 100%;
  margin: 4rem 0;
  position: relative;
  @media (min-width: 1000px) {
    width: 95%;
  }
  @media (min-width: 1200px) {
    width: 80%;
  }
`;

export const RelatedTitle = styled.h4`
  width: 90%;
  margin: 1rem auto;
  font-size: 2rem;
  span {
    text-transform: capitalize;
  }
`;

export const ScrollLeft = styled.button`
  display: none;

  @media (min-width: 1100px) {
    width: 4rem;
    height: 4rem;
    border-radius: 50%;
    border: 0.1rem solid rgb(0 20 76 / 10%);
    background-color: rgb(0 20 76 / 5%);

    display: flex;
    justify-content: center;
    align-items: center;

    position: absolute;
    bottom: calc(50% - 4rem);
    left: -2%;
    z-index: 1000;
    transition: 0.3s ease-in-out all;
    cursor: w-resize;

    /* &:after {
      content: "\\21E7";
      font-size: 2.5rem;
      color: rgb(0 20 76 / 15%);
      line-height: 2.5rem;
      text-align: center;
      transition: 0.3s ease-in-out all;
      transform: rotate(270deg);
    } */
    &:hover {
      height: 14rem;
      border-radius: 1rem;
      border: 0.1rem solid rgb(255 201 71 / 40%);
      background-color: rgb(255 201 71 / 20%);
      transform: scale(1.6);
      bottom: calc(50% - 8rem);
      /* &:after {
        color: rgb(255 201 71 / 50%);
      } */
    }
  }
`;

export const ScrollRight = styled(ScrollLeft)`
  left: 99%;
  cursor: e-resize;
  &:after {
    transform: rotate(90deg);
  }
`;

export const PreviewItemContainer = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(6, 50%);
  grid-auto-rows: 27rem;
  grid-gap: 1rem;
  justify-items: center;
  align-content: center;

  overflow-x: scroll;
  overscroll-behavior-x: contain;
  scroll-behavior: smooth;
  scroll-snap-type: x mandatory;
  scrollbar-width: none;
  ::-webkit-scrollbar {
    display: none;
  }
  @media (min-width: 750px) {
    /* width: 95%;
    margin: 0 auto; */
    grid-template-columns: repeat(6, 27%);
    grid-auto-rows: 30rem;
  }
  @media (min-width: 1000px) {
    grid-template-columns: repeat(6, 25%);
    grid-auto-rows: 33rem;
  }
  @media (min-width: 1200px) {
    width: 100%;
    grid-template-columns: repeat(6, 22%);
    grid-auto-rows: 35rem;
  }
`;

export const LinkIcon = styled.a`
  width: 100%;
  height: 4rem;
  padding: 0.3rem;
  margin-top: 2rem;
  display: flex;
  justify-content: space-around;
  align-items: center;
  font-size: 1.4rem;
  font-weight: 500;
  color: var(--blue);
  background: #25d366;
  border-radius: 1.5rem;
  cursor: pointer;
  transition: 0.3s ease-in-out all;
  border: 0.1rem solid #25d366;
  svg {
    transition: 0.3s ease-in-out all;
    fill: var(--blue);
  }
  @media (min-width: 750px) {
    width: 35%;
    margin-left: auto;
  }
  @media (min-width: 1200px) {
    width: fit-content;
    padding: 0.3rem 1.5rem;
    margin-right: 10%;
    svg {
      margin-right: 1rem;
    }
    &:hover {
      background: var(--background);
      border: 0.1rem solid var(--blue);
    }
  }
`;
