import React from "react";
import { connect } from "react-redux";
import { useRouter } from "next/router";
import Link from "next/link";
import { useSession } from "next-auth/client";

// Components
import { Instagram } from "../IconsSVG/Instagram";
import { Whatsapp } from "../IconsSVG/Whatsapp";
import { Facebook } from "../IconsSVG/Facebook";

// Stiled-Components
import {
  FooterStyled,
  LinksSyled,
  LinkGroups,
  GroupTitle,
  Li,
  Anchor,
  UlIcons,
  AnchorIcon,
  PaymentMethods,
  PaymentMethodsImageContainer,
  AllRightsReserved,
} from "./style";

const Footer = ({ carIsEmpty }) => {
  const { pathname } = useRouter();
  const [session, loading] = useSession();

  return (
    <FooterStyled carIsEmpty={pathname != "/realizar-pago" && carIsEmpty}>
      <LinksSyled>
        <LinkGroups>
          <GroupTitle>Servicio al cliente</GroupTitle>
          <ul>
            <Li>
              <Link href="/sucursales" passHref>
                <Anchor>Sucursales y horarios</Anchor>
              </Link>
            </Li>
            {/* <Li>
              <Link href="#" passHref>
                <Anchor>Déjanos tu opinión</Anchor>
              </Link>
            </Li> */}
            <Li>
              <Link href="/registro-de-usuario" passHref>
                <Anchor>{session ? "Ver mi perfil" : "Iniciar sesión"}</Anchor>
              </Link>
            </Li>
          </ul>
        </LinkGroups>

        {/* Second Group */}
        <LinkGroups>
          <GroupTitle>Más información</GroupTitle>
          <ul>
            <Li>
              <Link href="/aviso-de-privacidad" passHref>
                <Anchor>Aviso de privacidad</Anchor>
              </Link>
            </Li>
            <Li>
              <Link href="/cancelaciones-devoluciones" passHref>
                <Anchor>Política de cancelaciones y devoluciones</Anchor>
              </Link>
            </Li>
          </ul>
        </LinkGroups>

        {/* Third Group */}
        <LinkGroups>
          <GroupTitle>Acerca de nosotros</GroupTitle>
          <ul>
            <Li>
              <Link href="/quienes-somos" passHref>
                <Anchor>¿Quiénes somos?</Anchor>
              </Link>
            </Li>
            <Li>
              <Link href="/unete-a-nuestro-equipo" passHref>
                <Anchor>Únete a nuestro equipo</Anchor>
              </Link>
            </Li>
          </ul>
        </LinkGroups>

        {/* Fourth Group */}
        <LinkGroups>
          <GroupTitle>Redes sociales</GroupTitle>
          <UlIcons>
            <li>
              <AnchorIcon
                href="https://www.instagram.com/materialesvasquezhermanos/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Enlace a Instagram"
              >
                <Instagram width="90%" />
              </AnchorIcon>
            </li>
            <li>
              <AnchorIcon
                href="https://api.whatsapp.com/send?phone=522288366283"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Enlace a Twitter"
              >
                <Whatsapp width="90%" />
              </AnchorIcon>
            </li>
            <li>
              <AnchorIcon
                href="https://www.facebook.com/materialesvasquezhnos"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Enlace a Facebook"
              >
                <Facebook width="90%" />
              </AnchorIcon>
            </li>
          </UlIcons>
        </LinkGroups>
      </LinksSyled>
      <PaymentMethods>
        <GroupTitle>Métodos de pago</GroupTitle>
        <PaymentMethodsImageContainer>
          <img
            src="https://www.jucri.com.mx/wp-content/uploads/2020/12/fda.png"
            width={249}
            height={57}
            alt="Imagen de Métodos de pago"
          />
        </PaymentMethodsImageContainer>
      </PaymentMethods>
      <AllRightsReserved>
        Materiales Vasquez Hermanos S.A. de C.V. © 2020. Todos los derechos
        reservados.
      </AllRightsReserved>
    </FooterStyled>
  );
};

const mapStateToProps = (state) => {
  return {
    carIsEmpty: state.carIsEmpty,
  };
};

export default connect(mapStateToProps, null)(Footer);
