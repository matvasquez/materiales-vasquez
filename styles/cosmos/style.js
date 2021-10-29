import styled from "styled-components";

export const MainStyled = styled.main`
  width: 100%;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`;

export const FirstSection = styled.div`
  width: 100%;
  margin: 1rem 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Total = styled.span`
  font-size: 1.6rem;
  font-weight: 700;
`;

export const ItemsContainer = styled.section`
  width: 100%;
  margin: 1rem auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  align-items: center;
`;

export const Item = styled.div`
  width: 47%;
  height: 23rem;
  padding: 0.5rem;
  margin: 1rem auto;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  background-color: #efefef;
  box-shadow: 2px 2px 5px 1px #dcdcdc;
`;

export const ImageContainer = styled.div`
  width: 100%;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #ffffff;
  border-radius: 0.5rem;
  overflow: hidden;
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`;

export const ItemInfo = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const ItemText = styled.p`
  width: 100%;
  font-size: 1.4rem;
  margin: 0.5rem 0;
  text-transform: capitalize;
  color: var(--text);
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
`;

export const ItemPrice = styled(ItemText)`
  font-size: 1.6rem;
  font-weight: 500;
`;

export const Categoryes = styled.div`
  width: 100%;
  margin: 1rem 0 0.5rem 0;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
`;

export const Categorie = styled(ItemText)`
  width: 50%;
  font-size: 1.2rem;
  font-weight: 500;
`;
