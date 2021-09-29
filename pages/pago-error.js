import React from "react";
import Link from "next/link";
import { connect } from "react-redux";

// Styles
import styles from "../styles/components/Main.module.css";

// styled-Components
import { Main } from "../styles/pago-error/style";

const formatter = new Intl.NumberFormat("en-US", {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

const PagoError = ({ purchasingData }) => {
  return (
    <Main className={styles.MainHome}>
      <h3>Ups!!</h3>
      <p>Ocurrió un error al procesar el pago</p>
      <p style={{ fontWeight: "700", fontSize: "1.8rem" }}>
        Status {purchasingData.status}
      </p>
      <p style={{ fontWeight: "600", fontSize: "1.6rem" }}>
        {purchasingData.failReason}
      </p>
      <p>
        Monto de compra:{" "}
        <span style={{ fontWeight: "700" }}>
          ${formatter.format(purchasingData.chargeTotal)}
        </span>
      </p>
      <p>No te preocupes, los artículos en tu carrito te estarán esperando</p>
      <Link href="/">
        <a>Volver al inicio</a>
      </Link>
    </Main>
  );
};

const mapStateToProps = (state) => {
  return {
    purchasingData: state.purchasingData,
  };
};

export default connect(mapStateToProps, null)(PagoError);
