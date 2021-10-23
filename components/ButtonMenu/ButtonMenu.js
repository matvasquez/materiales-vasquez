import React, { useEffect, useState } from "react";

// Styled-Components
import { ButtonStyled, LineOne, LineTwo, LineThree } from "./style";

export const ButtonMenu = ({ handleClick }) => {
  return (
    <ButtonStyled
      onClick={() => {
        handleClick();
      }}
    >
      <LineOne />
      <LineTwo />
      <LineThree />
    </ButtonStyled>
  );
};
