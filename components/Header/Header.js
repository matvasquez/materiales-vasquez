import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { connect } from "react-redux";
import { useSession } from "next-auth/client";
import fetch from "isomorphic-unfetch";
import debounce from "just-debounce-it";

//Actions
import { setIitemsIliked } from "../../actions";

// Components
import MainMenu from "../Main-Menu/MainMenu";
import { Logo } from "../IconsSVG/Logo";
import { ButtonMenu } from "../ButtonMenu/ButtonMenu";
import SearchBar from "../Search-Bar/SearchBar";
import ImageLogInContainer from "../ImageLogInContainer/ImageLogInContainer";
import SearchResults from "../SearchResults/SearchResults";

// Stiled-Components
import { HeaderStyled, LogoContainer } from "./style";

const Header = ({ carIsOpen, itemsIliked }) => {
  const [hidden, setHidden] = useState(false);
  const input = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [session, loading] = useSession();
  const [searchResults, setSearchResults] = useState([]);
  const [noResults, setNoResults] = useState(false);
  const [seeking, setSeeking] = useState(false);
  const [searchName, setSearchName] = useState("");

  const handleOpen = () => {
    window.innerWidth < 1100 && setIsOpen(!isOpen);
  };

  const searchProduct = debounce(async (value) => {
    if (value !== "") {
      // Activa la animacion de busqueda
      setSeeking(true);
      // Solicita articulos relacionados por nombre
      const responseRelatedByName = await fetch(
        `${
          process.env.NEXT_PUBLIC_URL
        }/api/related-by-name/${value.toUpperCase()}?first=1&last=6`
      );
      const { data } = await responseRelatedByName.json();
      if (data.length > 0) {
        setSearchResults(data);
        setNoResults(false);
        // Desactiva la animacion de busqueda
        setSeeking(false);
        // Actualiza el valor de búsqueda para ofrecer más resultados
        setSearchName(value.toUpperCase());
      } else {
        setNoResults(true);
      }
    } else {
      setSearchResults([]);
      setNoResults(false);
    }
  }, 1000);

  const handleSearch = (value) => {
    searchProduct(value);
  };

  const handleClick = () => {
    setHidden(!hidden);
    input.current.focus();
    // input.current.select();
  };

  // useEffect(() => {
  //   if (isOpen) {
  //     document.body.style.position = "fixed";
  //   } else {
  //     document.body.style.position = "initial";
  //   }
  // }, [isOpen]);

  return (
    <>
      <HeaderStyled zindex={carIsOpen}>
        <MainMenu isOpen={isOpen} handleOpen={handleOpen} />
        <ButtonMenu handleClick={handleOpen} />
        <Link href="/" passHref>
          <LogoContainer
            style={{ display: hidden && "none" }}
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
          seeking={seeking}
        />
        {loading ? null : (
          <ImageLogInContainer session={session} itemsIliked={itemsIliked} />
        )}
      </HeaderStyled>
      {searchResults && (
        <SearchResults
          searchResults={searchResults}
          noResults={noResults}
          clear={setSearchResults}
          searchName={searchName}
        />
      )}
    </>
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
