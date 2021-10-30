import React, { useState, useRef } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { connect } from "react-redux";
import fetch from "isomorphic-unfetch";
import debounce from "just-debounce-it";

//Actions
import { setIitemsIliked } from "../../actions";

// Components
import MainMenu from "../Main-Menu/MainMenu";
import { Logo } from "../IconsSVG/Logo";
import { ButtonMenu } from "../ButtonMenu/ButtonMenu";
import SearchBar from "../Search-Bar/SearchBar";

// Stiled-Components
import { HeaderStyled, SearchAndButtonContainer, LogoContainer } from "./style";

const Header = () => {
  const [menuIsOpen, setMenuIsOpen] = useState(false);

  const handleOpen = () => {
    setMenuIsOpen(!menuIsOpen);
  };

  return (
    <HeaderStyled>
      <SearchAndButtonContainer>
        <ButtonMenu
          handleClick={handleOpen}
          aria-label="Botón para abrir el menú lateral"
        />
        <SearchBar />
      </SearchAndButtonContainer>
      <Link href="/" passHref>
        <LogoContainer aria-label="Inicio" itemProp="logo">
          <Logo />
        </LogoContainer>
      </Link>
      <div>{/* <button type="button">Carrito</button> */}</div>
      <MainMenu isOpen={menuIsOpen} handleOpen={handleOpen} />
    </HeaderStyled>
  );
};

const mapStateToProps = (state) => {
  return {
    myCart: state.myCart,
    articles: state.articles,
    itemsIliked: state.itemsIliked,
    carIsEmpty: state.carIsEmpty,
    carIsOpen: state.carIsOpen,
  };
};

const mapDispatchToProps = {
  setIitemsIliked,
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
