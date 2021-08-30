import styled from "styled-components";

export const AnchorStyled = styled.a`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  img {
    width: 100%;
    height: 100%;
    object-fit: fill;
  }
`;

// export const ImageContainer = styled.div`
//   width: 13rem;
//   height: 13rem;
//   margin: 0 auto;
//   border-radius: 1.5rem;
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   overflow-y: hidden;

//   img {
//     width: 100%;
//     height: 100%;
//     object-fit: fill;
//   }

//   @media (min-width: 370px) {
//     width: 15rem;
//     height: 15rem;
//   }
//   @media (min-width: 750px) {
//     width: 20rem;
//     height: 20rem;
//   }
//   @media (min-width: 1200px) {
//     width: 22rem;
//     height: 22rem;
//   }
// `;

export const Name = styled.p`
  width: 100%;
  text-align: left;
  text-transform: capitalize;
  color: var(--text);
  ${(props) =>
    props.isRelated &&
    `
    font-size: 1.2rem;
  `}
`;

export const Price = styled(Name)`
  font-size: 1.6rem;
  font-weight: 700;
  ${(props) =>
    props.isRelated &&
    `
    font-size: 1.2rem;
  `}
`;

// export const Description = styled(Name)`
//   font-size: initial;
//   font-weight: initial;
//   display: none;
// `;

export const ButtonsContainer = styled.div`
  width: 100%;
  padding: 0 0.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const ButtonLike = styled.button`
  width: 2rem;
  height: 2rem;
  margin-left: 0.5rem;
  background: none;
  border: none;
  outline: none;
  cursor: pointer;
  ${(props) =>
    props.isRelated &&
    `
    width: 1.5rem;
    height: 1.5rem;
  `}
`;

export const ButtonAdd = styled.button`
  padding: 0.4rem 0.6rem;
  font-size: 1.2rem;
  color: var(--background);
  background-color: var(--blue);
  border-radius: 0.5rem;
  border: none;
  outline: none;
  cursor: pointer;
  transition: 0.3s ease-in-out all;
  &:hover {
    color: var(--blue);
    background-color: var(--yellow);
  }

  ${(props) =>
    props.isRelated &&
    `
    width: fit-content;
    font-size: 1rem;
  `}

  ${(props) =>
    props.inMyCArt &&
    `
    color: var(--blue);
    background-color: var(--yellow);
    font-weight: 700;
  `}
  @media (min-width: 370px) {
    width: 70%;
  }
  @media (min-width: 1200px) {
    margin: 0.2rem 0.8rem 0.8rem auto;
  }
`;

export const ArticleStyled = styled.article`
  width: 100%;
  height: 100%;
  padding: 0.5rem;
  background-color: var(--white);
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 7fr 1fr 1fr 1fr;
  grid-gap: 0.5rem;
  justify-items: center;
  align-items: center;

  border-radius: 1.5rem;
  cursor: pointer;
  overflow: hidden;
  position: relative;

  transition: 0.3s ease-in-out all;
  ${(props) =>
    props.isRelated &&
    `
    margin: 0;
  `}
  &:hover {
    background-color: #f3f3f3;
  }

  @media (min-width: 750px) {
    margin: 0;
    height: auto;
    min-height: 30rem;

    &:nth-child(8) {
      display: none;
    }

    ${(props) =>
      props.different &&
      `
        grid-column: auto / span 2;
        display: flex;
        flex-direction: row;
        position: relative;
        ${AnchorStyled} {
          width: 55%;
          height: 100%;
          margin: auto 0 auto 0.8rem;
          border-radius: 1rem;
          overflow: hidden;
        }
        ${Name} {
          width: 40%;
          padding: 0;
          font-size: 2rem;
          font-weight: 500;
          text-transform: capitalize;
          position: absolute;
          top: 2rem;
          right: 0;
        }
        ${Price} {
          font-size: 3rem;
          font-weight: 700;
          text-align: center;
          position: absolute;
          right: 1rem;
          top: 60%;
        }
        ${ButtonsContainer} {
          width: 40%;
          margin: 0 1rem;
          position: absolute;
          bottom: 1rem;
          right: 0;
        }
        ${ButtonLike}{
          width: 3rem;
          height: 3rem;
        }
      `};
  }
  @media (min-width: 1100px) {
    min-height: 35rem;
    &:nth-child(8) {
      display: flex;
    }
  }
`;
