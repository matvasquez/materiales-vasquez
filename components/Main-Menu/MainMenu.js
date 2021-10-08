import React, { useEffect, useState } from "react";
import Link from "next/link";
import fetch from "isomorphic-unfetch";

// Components
import { Whatsapp } from "../IconsSVG/Whatsapp";
import { Instagram } from "../IconsSVG/Instagram";
// import { Twitter } from "../IconsSVG/Twitter";
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

const MainMenu = ({ isOpen, handleOpen }) => {
  const [apartments, setapartments] = useState([]);

  useEffect(async () => {
    const response = await fetch("/api/categories/main-menu");
    const { data } = await response.json();

    setapartments(data);
  }, []);

  return (
    <NavStyled open={isOpen}>
      <CloseButton
        type="button"
        onClick={() => handleOpen()}
        aria-label="Botón cerrar menú"
      ></CloseButton>
      <UlStyled rows={apartments.length + 2}>
        <LiStyled onClick={() => handleOpen()}>
          <Link href={`/tienda`} passHref>
            <AnchorStyled>Todos los productos</AnchorStyled>
          </Link>
          <LineLink />
        </LiStyled>
        {apartments &&
          apartments.map((menuItem) => (
            <MenuSection
              key={menuItem.category_id}
              {...menuItem}
              handleOpen={handleOpen}
            />
          ))}
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
          href="https://api.whatsapp.com/send?phone=522288366283&text=Hola,%20quisiera%20obtener%20m%C3%A1s%20informaci%C3%B3n%20sobre%20este%20art%C3%ADculo"
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
