import React, { useEffect, useState } from "react";

// Styled-Components
import { ButtonStyled, LineOne, LineTwo, LineThree } from "./style";

export const ButtonMenu = ({ handleClick }) => {
  const [showButton, setShowButton] = useState(true);

  const handleScroll = () => {
    window.scrollY > 100 ? setShowButton(false) : setShowButton(true);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <ButtonStyled
      showButton={showButton}
      onClick={() => {
        showButton && handleClick();
      }}
    >
      <LineOne />
      <LineTwo />
      <LineThree />
    </ButtonStyled>
  );
};
