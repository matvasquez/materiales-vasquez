import styled from "styled-components";

export const Form = styled.form`
  width: 100%;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  @media (min-width: 750px) {
    width: 80%;
  }
  @media (min-width: 1000px) {
    width: 50%;
  }
`;

export const Fieldset = styled.fieldset`
  width: 100%;
  padding: 0.5rem;
  margin: 0.5rem auto;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  border: 0.1rem solid var(--blue);
  border-radius: 0.3rem;
  @media (min-width: 750px) {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 1rem;
    justify-items: center;
    align-items: center;
  }
`;

export const Legend = styled.legend`
  padding: 0.5rem;
  color: var(--light-blue);
  background-color: var(--white);
`;

export const InputBase = styled.input`
  width: 100%;
  padding: 0.3rem;
  margin: 0.4rem auto;
  text-transform: capitalize;
  color: var(--light-blue);
  background-color: var(--light-gray);
  border-radius: 0.2rem;
  border: none;
  outline: none;
  &::placeholder {
    color: var(--gray);
  }
`;

export const InputMail = styled(InputBase)`
  text-transform: lowercase;
  &::placeholder {
    text-transform: capitalize;
  }
`;

export const Report = styled.p`
  font-size: 1rem;
  color: var(--gray);
`;

export const InputRfc = styled(InputBase)`
  text-transform: uppercase;
`;

export const Select = styled.select`
  width: 100%;
  border-radius: 0.2rem;
  border: 0.1rem solid var(--blue);
  color: var(--light-blue);
  outline: var(--light-blue);
`;

export const Textarea = styled.textarea`
  width: 100%;
  min-height: 10rem;
  max-height: 14rem;
  padding: 0.3rem;
  margin: 0.4rem auto;
  color: var(--light-blue);
  background-color: var(--light-gray);
  border-radius: 0.2rem;
  border: none;
  outline: none;
  resize: vertical;
  &::placeholder {
    color: var(--gray);
    opacity: 0.7;
  }
  @media (min-width: 750px) {
    grid-column: 1 / span 2;
  }
`;

export const PickUpButton = styled.button`
  width: 100%;
  padding: 0.5rem;
  margin: 0.5rem 0;
  text-align: center;
  font-weight: 500;
  color: var(--white);
  background-color: var(--light-blue);
  border-radius: 0.5rem;
  border: none;
  outline: none;
  cursor: pointer;
  opacity: 0.8;
  transition: 0.3s ease-in-out all;
  &:hover {
    opacity: 1;
  }
  @media (min-width: 750px) {
    grid-column: 1 / span 2;
  }
`;

export const SubmitButton = styled.button`
  width: 100%;
  padding: 0.5rem;
  margin: 0.5rem 0;
  text-align: center;
  font-weight: 500;
  color: var(--white);
  background-color: var(--light-blue);
  border-radius: 0.5rem;
  border: none;
  outline: none;
  cursor: pointer;
  opacity: 0.8;
  transition: 0.3s ease-in-out all;
  &:hover {
    opacity: 1;
  }
`;

// PickUp --------------

export const PickUpConatiner = styled.div`
  width: 100%;
  padding: 1rem;
  margin: 0 auto;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;

  background-color: var(--white);
  transition: 0.3s ease-in-out all;

  p {
    width: 100%;
    margin: 1rem 0;
    text-align: center;
    &::last-child {
      color: var(--light-blue);
    }
  }

  span {
    font-weight: 700;
    font-size: 1.8rem;
  }
  @media (min-width: 750px) {
    grid-column: 1 / span 2;
    width: 50%;
  }
`;

export const PickUpLink = styled.a`
  width: 60%;
  padding: 0.5rem;
  margin: 1rem auto;
  background-color: var(--yellow);
  color: var(--blue);
  font-size: 1.6rem;
  font-weight: 700;
  text-align: center;
  border-radius: 2rem;
  outline: none;
  border: none;
  cursor: pointer;
`;
