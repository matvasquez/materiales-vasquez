import styled from "styled-components";

export const GoToTopButton = styled.button`
  width: 4rem;
  height: 4rem;
  border-radius: 50%;
  border: 0.1rem solid rgb(0 20 76 / 40%);
  background-color: rgb(0 20 76 / 20%);

  display: flex;
  justify-content: center;
  align-items: center;

  position: fixed;
  bottom: 15rem;
  right: 1rem;
  z-index: 1000;
  transition: 0.3s ease-in-out all;
  cursor: pointer;

  &:after {
    content: "\\21E7";
    font-size: 2.5rem;
    color: rgb(0 20 76 / 60%);
    line-height: 2.5rem;
    text-align: center;
    transition: 0.3s ease-in-out all;
  }
  &:hover {
    border: 0.1rem solid rgb(255 201 71 / 70%);
    background-color: rgb(255 201 71 / 40%);
    &:after {
      transform: translateY(-3.5rem);
    }
  }
`;
