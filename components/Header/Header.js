import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { connect } from "react-redux";
import { useSession } from "next-auth/client";

//Actions
import { setIitemsIliked } from "../../actions";

// Components
import MainMenu from "../Main-Menu/MainMenu";
import { Logo } from "../IconsSVG/Logo";
import { ButtonMenu } from "../ButtonMenu/ButtonMenu";
import SearchBar from "../Search-Bar/SearchBar";
import ImageLogInContainer from "../ImageLogInContainer/ImageLogInContainer";

// Stiled-Components
import { HeaderStyled, LogoContainer } from "./style";

const Header = ({ carIsOpen, itemsIliked }) => {
  const [hidden, setHidden] = useState(true);
  const input = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [session, loading] = useSession();

  const handleOpen = () => {
    window.innerWidth < 1100 && setIsOpen(!isOpen);
  };

  const handleSearch = (value) => {
    console.log("Click: ", value);
  };

  const handleClick = () => {
    setHidden(!hidden);
    input.current.focus();
    // input.current.select();
  };

  return (
    <HeaderStyled zindex={carIsOpen}>
      <MainMenu isOpen={isOpen} handleOpen={handleOpen} />
      <ButtonMenu handleClick={handleOpen} />
      <Link href="/" passHref>
        <LogoContainer
          style={{ display: !hidden && "none" }}
          aria-label="Inicio"
          itemProp="logo"
        >
          <Logo />
        </LogoContainer>
      </Link>
      <SearchBar
        handleSearch={handleSearch}
        hidden={hidden}
        input={input}
        handleClick={handleClick}
      />
      {loading ? null : (
        <ImageLogInContainer session={session} itemsIliked={itemsIliked} />
      )}
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
  // setMyCart,
  // setPricesToCart,
  setIitemsIliked,
  // setDeleteFavorite,
  // setCloseCart,
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
