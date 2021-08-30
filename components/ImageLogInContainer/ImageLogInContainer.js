import React from "react";
import Link from "next/link";

// Components
import { User } from "../IconsSVG/User";

// Stiled-Components
import {
  LogInContainer,
  ItemsIlikedContainer,
  NumberItemsIliked,
} from "./style";

const ImageLogInContainer = () => {
  let itemsIliked = [];

  return (
    <>
      <Link href="/registro-de-usuario" passHref>
        <LogInContainer aria-label={`Icno de registro de usuario`}>
          {itemsIliked.length > 0 && (
            <ItemsIlikedContainer>
              <NumberItemsIliked>{itemsIliked.length}</NumberItemsIliked>
            </ItemsIlikedContainer>
          )}
          <User />
        </LogInContainer>
      </Link>
    </>
  );
};

export default ImageLogInContainer;
