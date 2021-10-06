import React, { useEffect, useState } from "react";
import Link from "next/link";
import fetch from "isomorphic-unfetch";

// Styled Components
import {
  SubCategorieContainer,
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
    <LiStyled key={category_id} onClick={() => handleOpen()}>
      <Link href={`/categoria/${name.replace(/ /gi, "-")}`} passHref>
        <AnchorStyled>
          {name}
          {subCategories.length > 0 && <Arrow />}
        </AnchorStyled>
      </Link>
      <LineLink />
      {subCategories.length > 0 && (
        <SubCategorieContainer>
          {subCategories.map((sub) => (
            <SubLiStyled key={sub.id}>
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
