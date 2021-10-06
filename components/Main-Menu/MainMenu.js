import React, { useEffect, useState } from "react";
import Link from "next/link";
import fetch from "isomorphic-unfetch";

// Components
import { Instagram } from "../IconsSVG/Instagram";
import { Twitter } from "../IconsSVG/Twitter";
import { Facebook } from "../IconsSVG/Facebook";

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

  console.log(apartments);
  useEffect(() => {
    if (apartments.length > 0) {
      apartments.forEach(async (categorie) => {
        console.log(categorie.category_id);
        const response = await fetch(
          `/api/categories/sub-categories/${categorie.category_id}`
        );
        const { data } = await response.json();
        categorie.category_id;
        console.log(data);
      });
    }
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
            <LiStyled key={menuItem.category_id} onClick={() => handleOpen()}>
              <Link
                href={`/categoria/${menuItem.name.replace(/ /gi, "-")}`}
                passHref
              >
                <AnchorStyled>{menuItem.name}</AnchorStyled>
              </Link>
              <LineLink />
            </LiStyled>
          ))}
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
            href="https://twitter.com/materialesvh"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Enlace a Twitter"
            bg="#1DA1F2"
          >
            <Twitter width="75%" />
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
      </UlStyled>
    </NavStyled>
  );
};

export default MainMenu;
