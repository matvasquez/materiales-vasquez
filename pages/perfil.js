import { connect } from "react-redux";
import {
  AuthAction,
  useAuthUser,
  withAuthUser,
  withAuthUserTokenSSR,
} from "next-firebase-auth";
import firebase from "firebase";
import Image from "next/image";

// Styles
import { MainStyled } from "../styles/Inicio/style";
import { ProfileData, ImageContainer } from "../styles/perfil/style";

// Loader para componente Image
const loader = ({ src, width, quality }) => {
  return `${src}?w=${width}&q=${quality || 75}`;
};

const Perfil = () => {
  const AuthUser = useAuthUser();
  // console.log("AuthUser: ", AuthUser);
  return (
    <MainStyled>
      <ProfileData>
        {AuthUser.photoURL && (
          <ImageContainer>
            <Image
              loader={loader}
              src={AuthUser.photoURL}
              width={300}
              height={300}
              alt={`Fotografía de perfil de ${AuthUser.displayName}`}
            />
          </ImageContainer>
        )}
        <h1>{AuthUser.displayName ? AuthUser.displayName : "No registrado"}</h1>
        <p>{AuthUser.email ? AuthUser.email : "No registrado"}</p>
        <button type="button" onClick={() => firebase.auth().signOut()}>
          Salir
        </button>
      </ProfileData>
    </MainStyled>
  );
};

export const getServerSideProps = withAuthUserTokenSSR({
  whenUnauthed: AuthAction.REDIRECT_TO_LOGIN,
})(() => {
  return {
    props: {},
  };
});

export default withAuthUser({
  whenUnauthedAfterInit: AuthAction.REDIRECT_TO_LOGIN,
})(Perfil);
