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
    const controller = new AbortController();
    const signal = controller.signal;

    if (value !== "") {
      // Activa la animacion de busqueda
      setSeeking(true);
      // Solicita articulos relacionados por nombre
      const responseRelatedByName = await fetch(
        `${
          process.env.NEXT_PUBLIC_URL
        }/api/related-by-name/${value.toUpperCase()}?first=1&last=6`,
        { signal }
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
        controller.abort();
        setSearchResults([]);
        setNoResults(true);
        setSeeking(false);
      }
    } else {
      controller.abort();
      setSearchResults([]);
      setNoResults(false);
      setSeeking(false);
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

  const disableScroll = () => {
    let x = window.scrollX;
    let y = window.scrollY;
    window.onscroll = function () {
      window.scrollTo(x, y);
    };
  };

  useEffect(() => {
    if (isOpen || searchResults.length > 0) {
      window.addEventListener("scroll", disableScroll);
    } else {
      window.onscroll = null;
    }
    return () => {
      window.removeEventListener("scroll", disableScroll);
    };
  }, [isOpen, searchResults]);
  // useEffect(() => {
  //   if (isOpen || searchResults.length > 0) {
  //     // document.body.style.position = "fixed";
  //     document.body.style.maxHeight = "100vh";
  //     document.body.style.overflow = "hidden";
  //   } else {
  //     // document.body.style.position = "initial";
  //     document.body.style.maxHeight = "initial";
  //     document.body.style.overflow = "visible";
  //   }
  // }, [isOpen, searchResults]);

  // console.log("searchResults: ", searchResults);

  return (
    <>
      <HeaderStyled zindex={carIsOpen}>
        <MainMenu isOpen={isOpen} handleOpen={handleOpen} />
        <ButtonMenu
          handleClick={handleOpen}
          aria-label="Botón para abrir el menú lateral"
        />
        <Link href="/" passHref>
          <LogoContainer
            style={{ display: hidden ? "none" : null }}
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
