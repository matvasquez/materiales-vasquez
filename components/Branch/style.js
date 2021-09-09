import styled from "styled-components";

export const SectionStyled = styled.section`
  width: 100%;
  margin: 1rem auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: flex-start;
  position: relative;
  border-radius: 1.5rem;
  overflow: hidden;
  @media (min-width: 750px) {
    margin: 0;
  }
`;

export const ImageContainer = styled.div`
  width: 40%;
  min-height: 22rem;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  z-index: 1;
  overflow: hidden;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export const Image = styled.img`
  height: 100%;
  object-fit: cover;
  filter: grayscale(35%);
  transition: all 0.3s ease-in-out;
  :hover {
    filter: grayscale(0%);
  }
`;

export const InfoContainer = styled.div`
  width: 70%;
  min-height: 22rem;
  padding: 1rem;
  margin-left: auto;
  font-size: 1.2rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  background-color: var(--white);
  border-radius: 1.5rem 0 0 1.5rem;
  position: relative;
  z-index: 2;
`;

export const Title = styled.h3`
  width: 100%;
  font-size: 1.8rem;
`;

export const Span = styled.span`
  font-weight: 700;
`;

export const PhoneContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

export const Anchor = styled.a`
  color: var(--text);
  margin-right: 1rem;
`;

export const ButtonsContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const AnchorButton = styled.a`
  width: 25%;
  height: 2.5rem;
  padding: 0.4rem;
  display: flex;
  justify-content: center;
  align-items: center;
  color: var(--blue);
  background-color: var(--yellow);
  border-radius: 0.5rem;
`;
