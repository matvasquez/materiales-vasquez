import React, { useState, useRef } from "react";
import Link from "next/link";

// Components
import MainMenu from "../Main-Menu/MainMenu";
import { Logo } from "../IconsSVG/Logo";
import { ButtonMenu } from "../ButtonMenu/ButtonMenu";
import SearchBar from "../Search-Bar/SearchBar";
import ImageLogInContainer from "../ImageLogInContainer/ImageLogInContainer";

// Stiled-Components
import { HeaderStyled, LogoContainer } from "./style";

const Header = () => {
  const [hidden, setHidden] = useState(true);
  const input = useRef(null);
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    console.log("Click");
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
    <HeaderStyled>
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
      <ImageLogInContainer />
    </HeaderStyled>
  );
};

export default Header;
