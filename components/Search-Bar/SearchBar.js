import React from "react";

//Components
import { MagnifierIcon } from "../IconsSVG/MagnifierIcon";

//Styles
import styles from "./SearchBar.module.css";

const SearchBar = ({ handleSearch, hidden, input, handleClick }) => {
  return (
    <div className={hidden ? styles.InputSearch : styles.StartSearching}>
      <input
        ref={input}
        className={hidden ? styles.InputHidden : styles.InputStyled}
        type="text"
        placeholder="Buscar producto..."
        onChange={(e) => handleSearch(e.target.value.toString())}
      />
      <div className={styles.IconContainer} onClick={handleClick}>
        <MagnifierIcon />
      </div>
    </div>
  );
};

export default SearchBar;
