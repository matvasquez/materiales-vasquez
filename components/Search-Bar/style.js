import styled from "styled-components";

export const InputContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  @media (min-width: 1000px) {
    grid-column: 1 / span 2;
  }
`;

export const IconContainer = styled.div`
  width: 10%;
  height: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  background: none;
  border: 0.1rem solid var(--blue);
  border-left: none;
  border-radius: 0 1rem 1rem 0;
  transition: 0.3s ease-in-out all;
  @media (min-width: 1000px) {
    height: 2.2rem;
  }
`;

export const InputSearch = styled.input`
  width: 90%;
  height: 2rem;
  padding: 0.2rem 1rem;
  font-size: 1.4rem;
  color: var(--text);
  background: none;
  border: 0.1rem solid var(--blue);
  border-right: none;
  border-radius: 1rem 0 0 1rem;
  outline: none;
  transition: 0.3s ease-in-out all;
  ::placeholder {
    color: var(--text);
    font-size: 1.4rem;
    opacity: 0.8;
  }
  @media (min-width: 1000px) {
    height: 2.2rem;
    padding: 0.5rem 1.5rem;
  }
`;

// export const InputSearch = styled.div`
//   grid-column: 5 / span 1;
//   width: 3rem;
//   height: 3rem;
//   display: grid;
//   grid-template-columns: 5fr 1fr;
//   justify-items: center;
//   align-items: center;
//   border-radius: 1rem;
//   transition: 0.1s ease-in-out all;

//   ${(props) =>
//     props.hidden &&
//     `
//     grid-column: 2 / span 4;
//     width: 100%;
//     height: 2.5rem;
//     border: 0.1rem solid var(--blue);
//   `}

//   @media (min-width: 750px) {
//     width: 3rem;
//     height: 3rem;
//     ${(props) =>
//       props.hidden &&
//       `
//         grid-column: 2 / span 4;
//         width: 100%;
//         border: 0.1rem solid var(--blue);
//   `}
//   }
//   @media (min-width: 1200px) {
//     grid-column: 2 / span 1;
//     grid-row: 1 / span 1;
//     width: 100%;
//     height: fit-content;
//     border-radius: 1.5rem;
//     border: 0.1rem solid var(--blue);
//   }
// `;

// export const InputStyled = styled.input`
//   display: none;
//   width: 100%;
//   padding: 0.2rem;
//   padding-left: 0.5rem;
//   font-size: 1.4rem;
//   color: var(--text);
//   background: none;
//   border: none;
//   outline: none;
//   transition: 0.3s ease-in-out all;
//   ::placeholder {
//     color: var(--text);
//     font-size: 1.4rem;
//     opacity: 0.8;
//   }
//   ${(props) =>
//     props.hidden &&
//     `
//     display: block;
//   `}
//   @media (min-width: 1200px) {
//     display: block;
//     font-size: 1.6rem;
//     padding: 0.5rem;
//     padding-left: 1rem;
//     ::placeholder {
//       font-size: 1.6rem;
//     }
//   }
// `;

// export const IconContainer = styled.div`
//   width: 1.7rem;
//   height: 1.7rem;
//   margin: 0;
//   display: flex;
//   justify-content: center;
//   align-items: center;

//   ${(props) =>
//     props.hidden &&
//     `
//     display: block;
//     width: 1.5rem;
//     height: 1.5rem;
//   `}

//   @media (min-width: 1200px) {
//     width: 2rem;
//     height: 2rem;
//   }
// `;

// export const ClearSearch = styled.div`
//   width: 1.7rem;
//   height: 1.7rem;
//   margin: 0;
//   display: flex;
//   justify-content: center;
//   align-items: center;

//   &:after {
//     content: "\\2715";
//     font-size: 1.8rem;
//     color: var(--red);
//     line-height: 1.8rem;
//     text-align: center;
//   }

//   @media (min-width: 1200px) {
//     width: 2rem;
//     height: 2rem;
//   }
// `;
