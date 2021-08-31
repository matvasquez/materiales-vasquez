import styled from "styled-components";

export const Item = styled.div`
  width: 100%;
  height: 17rem;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  a {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: right;
    align-items: center;
    position: relative;
    border: 0.1rem solid #fff;
    border-radius: 1.5rem;
    overflow: hidden;
  }
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 1;
  }
  @media (min-width: 350px) {
    height: 20rem;
  }
  @media (min-width: 500px) {
    height: 25rem;
  }
  @media (min-width: 750px) {
    height: 35rem;
  }
  @media (min-width: 1200px) {
    border-radius: 2rem;
    img {
      width: 100%;
      object-fit: cover;
    }
  }
`;

export const Filter = styled.div`
  width: 100%;
  height: 100%;
  background: linear-gradient(
    90deg,
    rgba(18, 89, 230, 0) 0.02%,
    var(--blue) 78%
  );
  position: absolute;
  top: 0;
  left: 0;
  z-index: 2;
`;

export const Text = styled.p`
  width: 70%;
  height: fit-content;
  margin-right: 1rem;
  margin-left: auto;
  padding: 0.5rem;
  font-size: 2rem;
  text-align: center;
  color: var(--background);
  border: 0.1rem solid #fff;
  border-radius: 0.5rem;
  z-index: 4;
  span {
    font-weight: 700;
    color: var(--yellow);
  }
  @media (min-width: 750px) {
    font-size: 3rem;
  }
  @media (min-width: 1200px) {
    width: 35%;
    font-size: 5rem;
    font-weight: 700;
    top: calc(50% - 5.5rem);
  }
`;
