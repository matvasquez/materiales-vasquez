import styled from "styled-components";

export const Item = styled.div`
  width: 100%;
  height: 17rem;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 1rem;
  overflow: hidden;
  a {
    width: 100%;
    position: relative;
  }
  img {
    width: 100%;
    object-fit: contain;
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
  z-index: 3;
`;

export const Text = styled.p`
  width: 50%;
  color: var(--background);
  font-size: 2rem;
  text-align: right;
  position: absolute;
  top: calc(50% - 3.5rem);
  right: 3rem;
  z-index: 4;
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
