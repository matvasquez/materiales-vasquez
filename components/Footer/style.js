import styled from "styled-components";

export const FooterStyled = styled.footer`
  width: 100%;
  padding: 2rem 1rem;
  background-color: var(--white);
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  ${(props) =>
    props.carIsEmpty &&
    `
  margin-bottom: 8rem;
  `}
  @media (min-width: 750px) {
    padding: 3rem 2rem;
    margin: 0;
  }
  @media print {
    display: none;
  }
`;

export const LinksSyled = styled.section`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(2, min-content);
  grid-gap: 1rem;
  @media (min-width: 750px) {
    width: 80%;
  }
`;

export const LinkGroups = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
`;

export const GroupTitle = styled.h5`
  font-size: 1.6rem;
  font-weight: 500;
`;

export const Li = styled.li`
  margin: 0.5rem 0;
`;

export const Anchor = styled.a`
  padding: 0.5rem 0;
  color: var(--text);
  cursor: pointer;
`;

export const UlIcons = styled.ul`
  width: 100%;
  margin: 1rem 0;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-column-gap: 0.5rem;
  justify-items: center;
  align-content: center;
`;

export const AnchorIcon = styled.a`
  width: 4rem;
  height: 4rem;
  padding: 0.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--yellow);
  border-radius: 50%;
  cursor: pointer;
  transition: 0.3s ease-in-out all;
  &:hover {
    background-color: var(--blue);
    transform: rotate(-15deg);
  }
  :hover svg {
    transition: 0.3s ease-in-out all;
    fill: var(--yellow);
  }
`;

export const PaymentMethods = styled.section`
  width: 100%;
  margin: 2rem 0;
  @media (min-width: 750px) {
    width: 80%;
  }
`;

export const PaymentMethodsImageContainer = styled.div`
  margin: 1rem auto;
  img {
    width: 100%;
    object-fit: contain;
  }
  @media (min-width: 750px) {
    width: 40%;
    margin: 1rem 1rem auto 1rem;
  }
`;

export const AllRightsReserved = styled.p`
  font-size: 1rem;
  font-weight: 300;
  text-align: center;
`;

// export const FiservText = styled.p`
//   font-family: "Archivo Narrow", sans-serif;
//   font-size: 2rem;
//   color: #ff5600;
// `;
