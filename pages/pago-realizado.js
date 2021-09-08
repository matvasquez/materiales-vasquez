import React from "react";
import { connect } from "react-redux";

// Actions
import { setPurchaseSuccess } from "../actions";

// Components
import { Logo } from "../components/IconsSVG/Logo";
import { SuccessIcon } from "../components/IconsSVG/SuccessIcon";
import { CodeQR } from "../components/IconsSVG/CodeQR";

// Styles
import styles from "../styles/components/Main.module.css";

// Styled-Components
import {
  SuccessContainer,
  SuccessIconContainer,
  SuccessText,
  LogoContainer,
  InfoPrintContainer,
  PurchaseInfoContainer,
  InfoContainer,
  TotalContainer,
  ProductsContainer,
  Products,
  ShippingDetails,
  Gratitude,
  FiscalComprobant,
  QRContainer,
  ButtonsInfoContainer,
  PrintButton,
} from "../styles/pago-realizado/style";

const Success = ({ purchasingData, setPurchaseSuccess }) => {
  setPurchaseSuccess();
  const formatter = new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  return (
    <main className={styles.MainHome}>
      <SuccessContainer>
        <SuccessIconContainer>
          <SuccessIcon />
        </SuccessIconContainer>
        <LogoContainer>
          <Logo />
        </LogoContainer>
        <SuccessText>La compra se ha realizado exitosamente</SuccessText>
        <InfoPrintContainer>
          <p>Tel: (228) 8-40-19-19 Ext. 838 y 839</p>
          <p>E-mail: ventas.sucursal@grupovasquez.com.mx</p>
        </InfoPrintContainer>
      </SuccessContainer>
      <PurchaseInfoContainer>
        <TotalContainer>
          <h2>${purchasingData.total}</h2>
          <p>Tu importe</p>
        </TotalContainer>
        <ProductsContainer>
          {purchasingData.products.map((product) => (
            <>
              <Products key={product.articulo_id}>
                <p>
                  {product.name} |{" "}
                  <span>
                    {product.initialQuantity}
                    {product.initialQuantity > 1 ? "piezas" : "pieza"}
                  </span>
                </p>
                <p>${formatter.format(product.price)}</p>
                <img
                  src={`data:image/jpg;base64,${product.image_url}`}
                  width={300}
                  height={300}
                  alt={`Fotografía de ${product.name}`}
                />
              </Products>
              <Products key={product.articulo_id}>
                <p>
                  {product.name} |{" "}
                  <span>
                    {product.initialQuantity}
                    {product.initialQuantity > 1 ? "piezas" : "pieza"}
                  </span>
                </p>
                <p>${formatter.format(product.price)}</p>
                <img
                  src={`data:image/jpg;base64,${product.image_url}`}
                  width={300}
                  height={300}
                  alt={`Fotografía de ${product.name}`}
                />
              </Products>
            </>
          ))}
          <Products>
            <h4>Costo de envío</h4>
            <p>${purchasingData.shippingCost}</p>
          </Products>
        </ProductsContainer>
      </PurchaseInfoContainer>
      <InfoContainer>
        <ShippingDetails>
          <h4>Información de la cuenta</h4>
          <p>
            {purchasingData.shippingName} {purchasingData.shippingLastName}
          </p>
          <p>{purchasingData.shippingEmail}</p>
          <p>{purchasingData.phoneNumber}</p>
        </ShippingDetails>
        <ShippingDetails>
          <h4>Dirección de envío</h4>
          <p>
            {purchasingData.addressCity} {purchasingData.addressState}
          </p>
          <p>
            {purchasingData.addressStreet} {purchasingData.addressNumber} C.P.
            {purchasingData.addressCP}
          </p>
        </ShippingDetails>
        <ShippingDetails>
          <h4>Referencias</h4>
          <p>{purchasingData.addressReferences}</p>
        </ShippingDetails>
        <ShippingDetails>
          <h4>{purchasingData.requiredInvoice}</h4>
          {purchasingData.invoiceRFC && <p>{purchasingData.invoiceRFC}</p>}
          {purchasingData.invoiceCompanyName && (
            <p>{purchasingData.invoiceCompanyName}</p>
          )}
          {purchasingData.invoicePhoneNumber && (
            <p>{purchasingData.invoicePhoneNumber}</p>
          )}
          {purchasingData.invoiceShippingEmail && (
            <p>{purchasingData.invoiceShippingEmail}</p>
          )}
        </ShippingDetails>
        <Gratitude>
          <p>Gracias por su compra</p>
          <FiscalComprobant>Esto no es un comprobante fiscal</FiscalComprobant>
        </Gratitude>
        <QRContainer>
          <CodeQR />
        </QRContainer>
      </InfoContainer>
      <ButtonsInfoContainer>
        <PrintButton type="button" onClick={() => window.print()}>
          Imprimir
        </PrintButton>
      </ButtonsInfoContainer>
    </main>
  );
};

const mapStateToProps = (state) => {
  return {
    purchasingData: state.purchasingData,
  };
};

const mapDispatchToProps = {
  setPurchaseSuccess,
};

export default connect(mapStateToProps, mapDispatchToProps)(Success);
