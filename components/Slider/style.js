import styled from "styled-components";

export const SliderStyled = styled.section`
  width: 100%;
`;

export const SliderItem = styled.div`
  width: 100%;
  aspect-ratio: 29 / 9;
  display: flex;
  justify-content: center;
  align-items: center;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;
