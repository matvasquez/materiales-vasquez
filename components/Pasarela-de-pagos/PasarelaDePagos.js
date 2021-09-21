import React, { useEffect, useState } from "react";
import sjcl from "sjcl";

// Tarjeta de pruebas: 5426064000424979

// Components
import { SuspensoryPoints } from "../../components/Loaders/SuspensoryPoints";

// Styled-Components
import { FormStyled, BuyButton, Iframe } from "./style";

const PasarelaDePagos = ({ shippingCost, subTotal }) => {
  const [load, setLoad] = useState(false);
  const [show, setShow] = useState(false);

  // Fecha y formato
  let date_ob = new Date();
  let date = ("0" + date_ob.getDate()).slice(-2);
  let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
  let year = date_ob.getFullYear();
  let hours = date_ob.getHours();
  let minutes = date_ob.getMinutes();
  let seconds = date_ob.getSeconds();
  // imprime date & time in YYYY-MM-DD HH:MM:SS format
  let dateFormat = `${year}:${month}:${date}-${hours}:${minutes}:${seconds}`;

  // const urlWebsite = process.env.NEXT_PUBLIC_URL;
  const urlWebsite = "http://localhost:3000";

  // Se obtiene la cadena hexadecimal
  const convertStringToHex = () => {
    // Se concatenen los valores requeridos
    // console.log("Fecha: ", dateFormat);

    const str = `${process.env.NEXT_PUBLIC_STORE_ID}${dateFormat}${
      shippingCost + subTotal
    }${484}${process.env.NEXT_PUBLIC_SHARED_SECRET}`;

    // console.log("Concatenar los valores: ", str);

    const hex = Buffer.from(str, "utf8").toString("hex");
    // console.log("Buffer: ", hex);

    const myBitArray = sjcl.hash.sha256.hash(hex);
    const hash = sjcl.codec.hex.fromBits(myBitArray);
    // console.log("Buffsha256er: ", hash);

    return hash;
  };

  const handleSubmitPayment = () => {
    setLoad(true);
    setShow(true);
    setTimeout(() => {
      setLoad(false);
    }, 3000);
  };

  return (
    <>
      <Iframe name="myFrame" show={show}></Iframe>
      <FormStyled
        method="POST"
        target="myFrame"
        action="https://test.ipg-online.com/connect/gateway/processing"
        onSubmit={handleSubmitPayment}
      >
        <input type="hidden" name="checkoutoption" value="simpleform" />
        <input
          type="hidden"
          name="hostURI"
          value={`${urlWebsite}/realizar-pago`}
        />
        <input type="hidden" name="txntype" value="sale" />
        <input type="hidden" name="timezone" value="America/Mexico_City" />
        <input type="hidden" name="txndatetime" value={dateFormat} />
        <input type="hidden" name="hash_algorithm" value="SHA256" />
        <input type="hidden" name="hash" value={convertStringToHex()} />
        <input
          type="hidden"
          name="storename"
          value={process.env.NEXT_PUBLIC_STORE_ID}
        />
        <input type="hidden" name="currency" value="484" />
        <input
          type="hidden"
          name="chargetotal"
          value={shippingCost + subTotal}
        />
        <input
          type="hidden"
          name="responseFailURL"
          value={`${urlWebsite}/pago-error`}
        />
        <input
          type="hidden"
          name="responseSuccessURL"
          value={`${urlWebsite}/pago-realizado`}
        />
        <BuyButton type="submit">
          {load ? <SuspensoryPoints /> : "Pagar"}
        </BuyButton>
      </FormStyled>
    </>
  );
};

export default PasarelaDePagos;
