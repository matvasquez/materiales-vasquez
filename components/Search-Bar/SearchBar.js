import React, { useState, useEffect } from "react";
import debounce from "just-debounce-it";
import { useRouter } from "next/router";

// Data
import { articulos } from "../../database/articulos";

//Components
import { MagnifierIcon } from "../IconsSVG/MagnifierIcon";
import { Seeking } from "../Loaders/Seeking";
import SearchItem from "../Search-Item/SearchItem";

// Styled-Components
import {
  InputContainer,
  InputSearch,
  IconContainer,
  ResultsContainer,
  TitleMatch,
} from "./style";

const SearchBar = () => {
  const router = useRouter();
  const id = router.query.id;
  const [searchText, setSearchText] = useState("");
  const [resultsByName, setResultsByName] = useState([]);
  const [resultsByCategorye, setResultsByCategorye] = useState([]);
  const [resultsByID, setresultsByID] = useState([]);
  const [showResults, setshowResults] = useState(false);

  // Reinicia los valores
  const reset = () => {
    setSearchText("");
    setResultsByName([]);
    setResultsByCategorye([]);
    setresultsByID([]);
  };

  // Funcion para buscar productos
  const searchProduct = debounce(async (text) => {
    // // Ejemplo de AbortController
    // const controller = new AbortController();
    // const signal = controller.signal;
    // const responseRelatedByName = await fetch(
    //   `/api/related-by-name/${value}?first=1&last=8`,
    //   { signal }
    // );
    // controller.abort();
    const resultByName = articulos.filter((item) =>
      item.name.includes(text.toUpperCase())
    );
    setResultsByName(resultByName.slice(0, 6));

    const resultByCategorye = articulos.filter(
      (item) =>
        item.main_category !== null &&
        item.main_category.includes(text.toUpperCase())
    );
    setResultsByCategorye(resultByCategorye.slice(0, 6));

    const resultByID = articulos.filter((item) =>
      item.articulo_id.includes(text.toUpperCase())
    );
    setresultsByID(resultByID.slice(0, 6));
  }, 1500);

  // Detectar cambios en el input de texto
  useEffect(() => {
    if (searchText !== "" && searchText.length > 3) {
      searchProduct(searchText);
    } else if (searchText === "") {
      reset();
    }
  }, [searchText]);

  // Detectar si existen resultados de la busqueda
  useEffect(() => {
    if (
      resultsByName.length === 0 &&
      resultsByCategorye.length === 0 &&
      resultsByID.length === 0
    ) {
      setshowResults(false);
    } else {
      setshowResults(true);
    }
  }, [resultsByName, resultsByCategorye, resultsByID]);

  useEffect(() => {
    reset();
  }, [id]);

  return (
    <>
      <InputContainer>
        <InputSearch
          type="text"
          placeholder="Buscar producto..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value.toString())}
        />
        <IconContainer>
          <MagnifierIcon width="1.3rem" />
        </IconContainer>
      </InputContainer>
      {showResults && (
        <ResultsContainer>
          {resultsByName.length > 0 && (
            <>
              <TitleMatch>Coincidencias por nombre</TitleMatch>
              {resultsByName.map((item) => (
                <SearchItem key={item.articulo_id} {...item} />
              ))}
            </>
          )}
          {resultsByCategorye.length > 0 && (
            <>
              <TitleMatch>Coincidencias por categoría</TitleMatch>
              {resultsByCategorye.map((item) => (
                <SearchItem key={item.articulo_id} {...item} />
              ))}
            </>
          )}
          {resultsByID.length > 0 && (
            <>
              <TitleMatch>Coincidencias por ID</TitleMatch>
              {resultsByID.map((item) => (
                <SearchItem key={item.articulo_id} {...item} />
              ))}
            </>
          )}
        </ResultsContainer>
      )}
    </>
  );
};

export default SearchBar;
