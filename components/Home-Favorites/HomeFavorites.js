import { useState, useEffect } from "react";
import { connect } from "react-redux";
import Link from "next/link";
import fetch from "isomorphic-unfetch";

// Data
import { articulos } from "../../database/articulos";

// Components
import CategorySection from "../Category-Section/CategorySection";

// Styled-Components
import { ContainerFavorites, Title } from "./style";

const HomeFavorites = ({ itemsIliked }) => {
  const [myFavorites, setmyFavorites] = useState([]);

  useEffect(() => {
    if (articulos.length > 0) {
      const data = itemsIliked.map(
        (article) =>
          articulos.filter(
            (item) => item.articulo_id === article.articulo_id
          )[0]
      );

      if (data) {
        setmyFavorites(data);
      }
    }
  }, [itemsIliked, articulos]);

  if (itemsIliked.length > 0) {
    return (
      <ContainerFavorites>
        <Title>PRODUCTOS QUE TE GUSTAN</Title>
        <CategorySection data={myFavorites} />
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
