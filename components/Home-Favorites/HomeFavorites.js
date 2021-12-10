import { useState, useEffect } from "react";
import { connect } from "react-redux";
import Link from "next/link";
import { useGetProductos } from "../../hooks/useGetProductos";

// Data
// import { articulos } from "../../database/articulos";

// Components
// import CategorySection from "../Category-Section/CategorySection";
import FavoritesItem from "../Favorites-Item/FavoritesItem";

// Styled-Components
import { ContainerFavorites, Title, LinkProfile } from "./style";
import { ItemsContainer } from "../Home-Sections/style";

const HomeFavorites = ({ itemsIliked }) => {
  const [myFavorites, setmyFavorites] = useState([]);
  const [articles] = useGetProductos();

  useEffect(() => {
    if (articles.length > 0) {
      const data = itemsIliked.map(
        (article) =>
          articles.filter((item) => item.articulo_id === article.articulo_id)[0]
      );

      if (data) {
        setmyFavorites(data);
      }
    }
  }, [itemsIliked, articles]);

  if (itemsIliked.length > 0) {
    return (
      <ContainerFavorites>
        {myFavorites.length > 0 && (
          <>
            <Title>PRODUCTOS QUE TE GUSTAN</Title>
            <ItemsContainer>
              {myFavorites.slice(0, 3).map((article, i) => (
                <FavoritesItem key={article.articulo_id} {...article} />
              ))}
            </ItemsContainer>
          </>
        )}
        {myFavorites.length > 2 && (
          <Link href="/perfil">
            <LinkProfile>Ver todos</LinkProfile>
          </Link>
        )}
      </ContainerFavorites>
    );
  } else {
    return null;
  }
};

const mapStateToProps = (state) => {
  return {
    myCart: state.myCart,
    itemsIliked: state.itemsIliked,
  };
};

export default connect(mapStateToProps, null)(HomeFavorites);
