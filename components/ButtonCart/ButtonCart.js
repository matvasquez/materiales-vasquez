import React, { useEffect, useState } from "react";
import Link from "next/link";
import { connect } from "react-redux";

// Components
import { ShoppingBag } from "../IconsSVG/ShoppingBag";

// Styled-Components
import { ButtonStyled, Counter } from "./style";

const ButtonCart = ({ itemsIliked }) => {
  return (
    <Link href="/perfil" passHref>
      <ButtonStyled aria-label="Botón para ir al perfil del usuario">
        {itemsIliked.length > 0 && <Counter>{itemsIliked.length}</Counter>}
        <ShoppingBag />
      </ButtonStyled>
    </Link>
  );
};

const mapStateToProps = (state) => {
  return {
    itemsIliked: state.itemsIliked,
  };
};

export default connect(mapStateToProps, null)(ButtonCart);
