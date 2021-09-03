import React from "react";

//Components
import { MagnifierIcon } from "../IconsSVG/MagnifierIcon";

// Styled-Components
import { InputSearch, InputStyled, IconContainer } from "./style";

const SearchBar = ({ handleSearch, hidden, input, handleClick }) => {
  return (
    <InputSearch hidden={hidden}>
      <InputStyled
        ref={input}
        hidden={hidden}
        type="text"
        placeholder="Buscar producto..."
        onChange={(e) => handleSearch(e.target.value.toString())}
      />
      <IconContainer onClick={handleClick} hidden={hidden}>
        <MagnifierIcon />
      </IconContainer>
    </InputSearch>
  );
};

export default SearchBar;
