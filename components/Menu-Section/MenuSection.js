import React from "react";
import Link from "next/link";
import fetch from "isomorphic-unfetch";

// Styled Components
import {
  SubCategorieContainer,
  Circle,
  CircleBottom,
  LiStyled,
  AnchorStyled,
  SubAnchorStyled,
  SubLiStyled,
  LineLink,
  SubLineLink,
  Arrow,
} from "./style";

const MenuSection = ({ handleOpen, subCategories }) => {
  return (
    <LiStyled
      onClick={
        window.innerWidth <= 770
          ? () =>
              subCategories.length > 0 ? console.log("Click") : handleOpen()
          : () => handleOpen()
      }
      columns={subCategories.length > 25 ? true : false}
    >
      <Link
        href={
          window.innerWidth <= 770
            ? subCategories.length > 0
              ? `#`
              : `/categoria/${subCategories[0].categorie.replace(/ /gi, "-")}`
            : `/categoria/${subCategories[0].categorie.replace(/ /gi, "-")}`
        }
        passHref
      >
        <AnchorStyled>{subCategories[0].categorie}</AnchorStyled>
      </Link>
      {subCategories.length > 0 && <Arrow />}
      {subCategories.length === 0 && <LineLink />}
      {subCategories.length > 0 && (
        <SubCategorieContainer
          columns={subCategories.length > 25 ? true : false}
        >
          <Circle />
          <CircleBottom />
          {subCategories.map((sub) => (
            <SubLiStyled key={sub.id} onClick={() => handleOpen()}>
              <Link
                href={`/categoria/${subCategories[0].categorie.replace(
                  / /gi,
                  "-"
                )}/${sub.subcategorie.replace(/ /gi, "-")}`}
                passHref
              >
                <SubAnchorStyled>{sub.subcategorie}</SubAnchorStyled>
              </Link>
              <SubLineLink />
            </SubLiStyled>
          ))}
        </SubCategorieContainer>
      )}
    </LiStyled>
  );
};

export default MenuSection;

// OBRA NEGRA
