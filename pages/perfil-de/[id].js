import React, { useState, useEffect } from "react";
import Head from "next/head";
import fetch from "isomorphic-unfetch";
import { connect } from "react-redux";

import {
  signIn,
  signOut,
  useSession,
  getProviders,
  getSession,
} from "next-auth/client";

// Components
import FavoritesList from "../../components/FavoritesList/FavoritesList";

// Styles
import styles from "../../styles/components/Main.module.css";

// Styled-Components
import {
  UserInfo,
  ImageContainer,
  UserName,
  ButtonLogOut,
  SectionIliked,
} from "../../styles/perfil/style";

export const getServerSideProps = async (context) => {
  const session = await getSession(context);

  if (session === null) {
    return {
      redirect: {
        destination: "/registro-de-usuario",
        permanent: false,
      },
    };
  }

  return {
    props: {
      session,
      title: `${session.user.name.toUpperCase()} | Materiales Vasquez Hermanos`,
      description:
        "Amplia gama de productos para obra negra, ferretería, muebles, y artículos para el hogar.",
      image:
        "https://res.cloudinary.com/duibtuerj/image/upload/v1630083340/brand/meta-image_rcclee.jpg",
      ogurl: "https://www.materialesvasquezhnos.com.mx",
    },
  };
};

const HomePage = (props) => {
  //   const [session, loading] = useSession();
  const { session, title, itemsIliked } = props;

  return (
    <>
      <Head>
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Roboto:wght@100;300;400;500;700;900&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Archivo+Narrow&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Share+Tech+Mono&display=swap"
          rel="stylesheet"
        />
        <link
          rel="icon"
          href="https://res.cloudinary.com/duibtuerj/image/upload/v1630083407/brand/favicon_aowz1n.png"
          type="image/x-icon"
        ></link>

        <title>{title}</title>
      </Head>

      <main className={styles.MainStyle}>
        <>
          <UserInfo>
            <ImageContainer>
              <img
                src={session.user.image}
                width={300}
                height={300}
                alt={`Fotografía de perfil de ${session.user.name}`}
              />
            </ImageContainer>
            <UserName>{session.user.name}</UserName>
            <p>{session.user.email}</p>
            <ButtonLogOut type="button" onClick={() => signOut()}>
              Cerrar sesión
            </ButtonLogOut>
          </UserInfo>
          <SectionIliked>
            {itemsIliked.length === 0 ? (
              <p>Su lista de favoritos está vacía</p>
            ) : (
              <FavoritesList itemsIliked={itemsIliked} />
            )}
          </SectionIliked>
        </>
      </main>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    itemsIliked: state.itemsIliked,
  };
};

export default connect(mapStateToProps, null)(HomePage);
