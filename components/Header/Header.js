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
import SearchResults from "../SearchResults/SearchResults";

// Stiled-Components
import { HeaderStyled, LogoContainer } from "./style";

const Header = ({ carIsOpen, itemsIliked }) => {
  const router = useRouter();
  const [hidden, setHidden] = useState(false);
  const input = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [noResults, setNoResults] = useState(false);
  const [noResultsText, setnoResultsText] = useState(
    "No encontré nada con ese nombre"
  );
  const [seeking, setSeeking] = useState(false);
  const [searchName, setSearchName] = useState("");
  const [deleteText, setDeleteText] = useState(false);

  const handleOpen = () => {
    window.innerWidth < 1100 && setIsOpen(!isOpen);
  };

  const reset = () => {
    setSearchResults([]);
    setSeeking(false);
    setDeleteText(false);
  };

  const searchProduct = debounce(async (value) => {
    const controller = new AbortController();
    const signal = controller.signal;

    if (value !== "") {
      if (value.length >= 4) {
        // Activa la animacion de busqueda
        setSeeking(true);
        // Solicita articulos relacionados por nombre
        const responseRelatedByName = await fetch(
          `/api/related-by-name/${value
            .replace(/s$/g, "")
            .toUpperCase()}?first=1&last=8`,
          { signal }
        );
        const { data } = await responseRelatedByName.json();

        if (data.length > 0) {
          setSearchResults(data);
          setNoResults(false);
          // Desactiva la animacion de busqueda
          setSeeking(false);
          // Actualiza el valor de búsqueda para ofrecer más resultados
          setSearchName(value.replace(/s$/g, "").toUpperCase());
        } else {
          controller.abort();
          setNoResults(true);
          setnoResultsText("No encontré nada con ese nombre");
          reset();
        }

        setDeleteText(true);
      } else {
        reset();
        setNoResults(true);
        setnoResultsText("El texto es muy corto");
      }
    } else {
      controller.abort();
      reset();
      setNoResults(false);
    }
  }, 1000);

  const handleSearch = (value) => {
    searchProduct(value);
  };

  const handleClick = () => {
    setHidden(!hidden);
    input.current.focus();
  };

  return (
    <>
      <HeaderStyled zindex={carIsOpen}>
        <ButtonMenu
          handleClick={handleOpen}
          aria-label="Botón para abrir el menú lateral"
        />
        <Link href="/" passHref>
          <LogoContainer
            activateSearch={hidden}
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
          deleteText={deleteText}
          reset={reset}
        />
      </HeaderStyled>
      {searchResults && (
        <SearchResults
          searchResults={searchResults}
          noResults={noResults}
          text={noResultsText}
          clear={setSearchResults}
          searchName={searchName}
        />
      )}
      {router.pathname === "/" && (
        <MainMenu isOpen={isOpen} handleOpen={handleOpen} />
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
