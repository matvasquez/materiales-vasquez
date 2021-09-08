import React from "react";
import Link from "next/link";

// Styles
import styles from "../styles/components/Main.module.css";

// styled-Components
import { Main } from "../styles/pago-error/style";

const pagoError = () => {
  return (
    <Main className={styles.MainHome}>
      <h3>Ups!!</h3>
      <p>Ocurrió un error al procesar el pago</p>
      <p>No te preocupes, los artículos en tu carrito te estarán esperando</p>
      <Link href="/">
        <a>Volver al inicio</a>
      </Link>
      <h1>Error</h1>
    </Main>
  );
};

export default pagoError;
