import styled from "styled-components";

export const Item = styled.div`
  width: 100%;
  height: 15rem;
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
    border-radius: 1rem;
    overflow: hidden;
  }
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 1;
  }
  @media (min-width: 350px) {
    height: 18rem;
  }
  @media (min-width: 500px) {
    height: 25rem;
  }
  @media (min-width: 750px) {
    height: 32rem;
  }
  @media (min-width: 1000px) {
    height: 40rem;
  }
  @media (min-width: 1200px) {
    height: 52rem;
    border-radius: 2rem;
    a {
      padding-bottom: 3rem;
      align-items: flex-end;
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
  @media (min-width: 1200px) {
    background: linear-gradient(
      129deg,
      rgba(18, 89, 230, 0) 0.02%,
      var(--blue) 78%
    );
  }
`;

export const Text = styled.p`
  width: 70%;
  height: fit-content;
  margin-right: 1rem;
  margin-left: auto;
  padding: 0.5rem;
  font-size: 1.8rem;
  text-align: center;
  color: var(--background);
  border: 0.1rem solid #fff;
  border-radius: 0.5rem;
  background: linear-gradient(
    90deg,
    rgba(18, 89, 230, 0) 0.2%,
    var(--blue) 78%
  );
  z-index: 4;
  span {
    font-weight: 700;
    color: var(--yellow);
  }
  @media (min-width: 750px) {
    font-size: 4rem;
  }
  @media (min-width: 1200px) {
    width: 45%;
    padding: 1rem;
    font-size: 6rem;
    font-weight: 700;
    margin-right: 4rem;
    border-radius: 1rem;
  }
`;
