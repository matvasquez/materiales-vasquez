import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { connect } from "react-redux";

//Actions
import { setIitemsIliked } from "../../actions";

// Components
import MainMenu from "../Main-Menu/MainMenu";
import { Logo } from "../IconsSVG/Logo";
import { ButtonMenu } from "../ButtonMenu/ButtonMenu";
import SearchBar from "../Search-Bar/SearchBar";
import HeaderProfile from "../Header-Profile/HeaderProfile";

// Stiled-Components
import { HeaderStyled, SearchAndButtonContainer, LogoContainer } from "./style";

const Header = ({ user }) => {
  const router = useRouter();
  const [menuIsOpen, setMenuIsOpen] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  // console.log("user: ", user);

  const handleOpen = () => {
    setMenuIsOpen(!menuIsOpen);
  };

  useEffect(() => {
    window.innerWidth < 1000 && setMenuIsOpen(false);
  }, [router.query]);

  useEffect(() => {
    if (router.pathname !== "/perfil" && user.email !== null) {
      setShowProfile(true);
    } else {
      setShowProfile(false);
    }
  }, [router, user]);

  return (
    <HeaderStyled>
      <SearchAndButtonContainer>
        <ButtonMenu
          handleClick={handleOpen}
          aria-label="Botón para abrir el menú lateral"
        />
        <SearchBar user={showProfile} />
        {showProfile && <HeaderProfile {...user} />}
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
    profile: state.profile,
  };
};

const mapDispatchToProps = {
  setIitemsIliked,
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
