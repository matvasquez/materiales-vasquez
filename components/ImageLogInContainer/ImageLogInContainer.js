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

const ImageLogInContainer = ({ session, itemsIliked }) => {
  return (
    <>
      <Link href="/registro-de-usuario" passHref>
        <LogInContainer aria-label={`Icono de registro de usuario`}>
          {itemsIliked.length > 0 && (
            <ItemsIlikedContainer>
              <NumberItemsIliked>{itemsIliked.length}</NumberItemsIliked>
            </ItemsIlikedContainer>
          )}
          {session ? (
            <img
              src={session.user.image}
              alt={`Fotografia de perfil de ${session.user.name}`}
            />
          ) : (
            <User />
          )}
        </LogInContainer>
      </Link>
    </>
  );
};

export default ImageLogInContainer;
