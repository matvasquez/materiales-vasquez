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

const UserProfile = (props) => {
  // const [session, loading] = useSession();
  const { session, itemsIliked } = props;

  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1"
        />

        <title>Perfil de usuario | Materiales Vasquez Hermanos</title>
      </Head>

      <main className={styles.MainStyle}>
        <>
          {session && (
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
          )}
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

export default connect(mapStateToProps, null)(UserProfile);
