import React, { useEffect, useState } from "react";
import Link from "next/link";
import fetch from "isomorphic-unfetch";

// Components
import { Whatsapp } from "../IconsSVG/Whatsapp";
import { Instagram } from "../IconsSVG/Instagram";
import { Facebook } from "../IconsSVG/Facebook";
import MenuSection from "../Menu-Section/MenuSection";

// Styled-Components
import {
  NavStyled,
  CloseButton,
  UlStyled,
  LiStyled,
  AnchorStyled,
  LineLink,
  SocialIconsConatiner,
  LinkIcon,
} from "./style";

const categories = [
  {
    name: "MATERIALES PARA CONSTRUCCION",
  },
  {
    name: "ACABADOS",
  },
  {
    name: "BAÑOS",
  },
  {
    name: "FERRETERIA",
  },
  {
    name: "HOGAR",
  },
  {
    name: "COCINA",
  },
];

const MainMenu = ({ isOpen, handleOpen }) => {
  return (
    <NavStyled open={isOpen} id="Main-Menu">
      <CloseButton
        type="button"
        onClick={() => handleOpen()}
        aria-label="Botón cerrar menú"
      ></CloseButton>
      <UlStyled rows={categories.length + 1}>
        {categories.length > 0 && (
          <>
            {categories.map((menuItem) => (
              <LiStyled key={menuItem.name} onClick={() => handleOpen()}>
                <Link
                  href={`#${menuItem.name
                    .replace(/ /g, "-")
                    .replace(/Ñ/g, "enne")}`}
                  passHref
                >
                  <AnchorStyled>{menuItem.name}</AnchorStyled>
                </Link>
                <LineLink />
              </LiStyled>
            ))}
          </>
        )}
      </UlStyled>
      <SocialIconsConatiner>
        <LinkIcon
          href="https://www.instagram.com/materialesvasquezhermanos/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Enlace a Instagram"
          bg="radial-gradient(circle at 30% 107%, #fdf497 0%, #fdf497 5%, #fd5949 45%,#d6249f 60%,#285AEB 90%)"
        >
          <Instagram width="75%" />
        </LinkIcon>

        <LinkIcon
          href="https://api.whatsapp.com/send?phone=522288366283"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Enlace a Twitter"
          bg="#25d366"
        >
          <Whatsapp width="75%" />
        </LinkIcon>

        <LinkIcon
          href="https://www.facebook.com/materialesvasquezhnos"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Enlace a Facebook"
          bg="#4267B2"
        >
          <Facebook width="75%" />
        </LinkIcon>
      </SocialIconsConatiner>
    </NavStyled>
  );
};

export default MainMenu;
