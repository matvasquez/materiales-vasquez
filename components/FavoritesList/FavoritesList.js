import React from "react";

//Components
import FavoritesItem from "../Favorites-Item/FavoritesItem";

// Styled-Components
import { ListFavorites, Title, FavoritesContainer } from "./style";

const FavoritesList = ({ itemsIliked }) => {
  return (
    <ListFavorites>
      <Title>Mis favoritos</Title>
      <FavoritesContainer>
        {itemsIliked &&
          itemsIliked.map((article, i) => (
            <FavoritesItem
              key={article.articulo_id}
              {...article}
              isRelated={true}
            />
          ))}
      </FavoritesContainer>
    </ListFavorites>
  );
};

export default FavoritesList;
