import styled from "styled-components";

export const Item = styled.a`
  width: 100%;
  padding: 0.5rem;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 15rem 9rem;
  grid-gap: 1rem;
  justify-items: center;
  align-items: start;
  background-color: #efefef;
  box-shadow: 2px 2px 5px 1px #dcdcdc;
  cursor: pointer;
  @media (min-width: 1000px) {
    grid-template-rows: 30rem 8rem;
  }
`;

export const ImageContainer = styled.div`
  width: 100%;
  height: 100%;
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
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;

export const ItemText = styled.p`
  width: 100%;
  font-size: 1.4rem;
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
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
`;

export const Categorie = styled(ItemText)`
  font-size: 1rem;
  font-weight: 500;
  &:nth-child(2) {
    margin-top: 0.5rem;
  }
`;
