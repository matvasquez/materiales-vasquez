import React from "react";

//Components
import { MagnifierIcon } from "../IconsSVG/MagnifierIcon";
import { Seeking } from "../Loaders/Seeking";

// Styled-Components
import { InputSearch, InputStyled, IconContainer } from "./style";

const SearchBar = ({ handleSearch, hidden, input, handleClick, seeking }) => {
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
        {seeking ? <Seeking /> : <MagnifierIcon />}
      </IconContainer>
    </InputSearch>
  );
};

export default SearchBar;
