import React, { useEffect, useState } from "react";
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

const MenuSection = ({ name, category_id, handleOpen }) => {
  const [subCategories, setSubCategories] = useState([]);

  useEffect(async () => {
    const response = await fetch(
      `/api/categories/sub-categories/${category_id}`
    );
    const { data } = await response.json();

    setSubCategories(data);
  }, []);

  return (
    <LiStyled
      key={category_id}
      onClick={
        window.innerWidth <= 770
          ? () =>
              subCategories.length > 0 ? console.log("Click") : handleOpen()
          : () => handleOpen()
      }
    >
      <Link
        href={
          window.innerWidth <= 770
            ? subCategories.length > 0
              ? `#`
              : `/categoria/${name.replace(/ /gi, "-")}`
            : `/categoria/${name.replace(/ /gi, "-")}`
        }
        passHref
      >
        <AnchorStyled>{name}</AnchorStyled>
      </Link>
      {/* {subCategories.length > 0 && <Arrow />} */}
      {subCategories.length === 0 && <LineLink />}
      {subCategories.length > 0 && (
        <SubCategorieContainer>
          <Circle />
          <CircleBottom />
          {subCategories.map((sub) => (
            <SubLiStyled key={sub.id} onClick={() => handleOpen()}>
              <Link
                href={`/categoria/${name.replace(
                  / /gi,
                  "-"
                )}/${sub.name.replace(/ /gi, "-")}`}
                passHref
              >
                <SubAnchorStyled>{sub.name}</SubAnchorStyled>
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
