import React from "react";

//Components
import { MagnifierIcon } from "../IconsSVG/MagnifierIcon";
import { Seeking } from "../Loaders/Seeking";

// Styled-Components
import { InputSearch, InputStyled, IconContainer, ClearSearch } from "./style";

const SearchBar = ({
  handleSearch,
  hidden,
  input,
  handleClick,
  seeking,
  deleteText,
  reset,
}) => {
  return (
    <InputSearch hidden={hidden}>
      <InputStyled
        ref={input}
        hidden={hidden}
        type="text"
        placeholder="Buscar producto..."
        onChange={(e) =>
          handleSearch(
            e.target.value
              .toString()
              .normalize("NFD")
              .replace(/[\u0300-\u036f]/g, "")
          )
        }
      />
      <IconContainer onClick={handleClick} hidden={hidden}>
        {seeking ? (
          <Seeking />
        ) : (
          <>
            {deleteText ? (
              <ClearSearch
                type="button"
                onClick={() => {
                  console.log(input.current.value);
                  input.current.value = "";
                  reset();
                }}
                aria-label="Borrar busqueda"
              ></ClearSearch>
            ) : (
              <MagnifierIcon />
            )}
          </>
        )}
      </IconContainer>
    </InputSearch>
  );
};

export default SearchBar;
