import React, { useEffect, useState } from "react";
import fetch from "isomorphic-unfetch";

// Components
import MainMenuSections from "../Main-Menu-Sections/MainMenuSections";

// Styled-Components
import { NavStyled, CloseButton, UlStyled } from "./style";

const MainMenu = ({ isOpen, handleOpen }) => {
  const [allCAtegories, setallCAtegories] = useState([]);
  const [mainCategories, setMainCategories] = useState([]);

  // Consulta las categorias
  useEffect(async () => {
    const response = await fetch(`/api/menu`);
    const { data } = await response.json();
    setallCAtegories(data);
  }, []);

  // Filtra las categorias principales
  useEffect(() => {
    const cat = allCAtegories.map((item) => item.categorie);

    let result = cat.filter((item, index) => {
      return cat.indexOf(item) === index;
    });
    setMainCategories(result);
  }, [allCAtegories]);

  return (
    <NavStyled open={isOpen} id="Main-Menu">
      <CloseButton
        type="button"
        onClick={() => handleOpen()}
        aria-label="Botón cerrar menú"
      ></CloseButton>
      {mainCategories.length > 0 && (
        <UlStyled rows={mainCategories.length + 1}>
          {mainCategories.map((categorie) => {
            let sub = allCAtegories.filter(
              (item) => item.categorie === categorie
            );
            return (
              <MainMenuSections
                key={categorie}
                categorie={categorie}
                sub={sub.sort()}
              />
            );
          })}
        </UlStyled>
      )}

      {/* <SocialIconsConatiner>
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
      </SocialIconsConatiner> */}
    </NavStyled>
  );
};

export default MainMenu;
