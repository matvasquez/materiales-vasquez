import React, { useState, useRef, useEffect } from "react";
import { connect } from "react-redux";
import {
  setOpenCart,
  setCloseCart,
  setShippingCost,
  setPurchasingData,
} from "../../actions";
import Head from "next/head";
import { useShippingCost } from "../../hooks/useShippingCost";
import { sendEmail } from "../../utils/sendEmail";
import fetch from "isomorphic-unfetch";
import CryptoJS from "crypto-js";
import SHA256 from "crypto-js/sha256";

// Components
import { Logo } from "../../components/IconsSVG/Logo";
import PaymentItemPreview from "../../components/Payment-Item-Preview/PaymentItemPreview";
import { VisaLogo } from "../../components/IconsSVG/VisaLogo";
import { MastercardLogo } from "../../components/IconsSVG/MastercardLogo";
import { AmericanExpressLogo } from "../../components/IconsSVG/AmericanExpressLogo";
import PreviewItem from "../../components/Preview-Item/PreviewItem";
import { SuspensoryPoints } from "../../components/Loaders/SuspensoryPoints";

// Styled-Components
import {
  MainStiled,
  MainTitle,
  Iframe,
  BuyersData,
  FormStyled,
  CardStyled,
  CardDataTitle,
  CardNumber,
  ChipStyled,
  DateAndCode,
  ShowDAte,
  DateContainer,
  InputDate,
  InputCode,
  InputName,
  LogoTypeCard,
  LogoContainer,
  ShippingAddress,
  ShippingData,
  Subtitle,
  StreetAndNumber,
  StateAndZipCode,
  InputBase,
  InputSameName,
  InputEmail,
  ProofOfPurchase,
  References,
  SelectCity,
  FreeShippingText,
  InvoiceQuestion,
  Invoice,
  InvoiceInput,
  ShippingInvoice,
  InputRFC,
  SelectCFDI,
  BuyButton,
  MyListOfItems,
  CostDetails,
  CostContainer,
  InputCost,
  RelatedArticles,
  RelatedTitle,
  PreviewItemContainer,
} from "../../styles/realizar-pago/style";

//Data

const cfdis = [
  "G01	ADQUISICIÓN DE MERCANCIAS",
  "G02	DEVOLUCIONES, DESCUENTOS O BONIFICACIONES",
  "G03	GASTOS EN GENERAL",
  "I01	CONSTRUCCIONES",
  "I02	MOBILIARIO Y EQUIPO DE OFICINA POR INVERSIONES",
  "I03	EQUIPO DE TRANSPORTE ",
  "I04	EQUIPO DE COMPUTO Y ACCESORIOS",
  "I05	DAODS, TROQUELES, MOLDES, MATRICES Y HERRAMENTAL",
  "I06	COMUNICACIONES TELEFÓNICAS",
  "I07	COMUNICACIONES SATELITALES",
  "I08	OTRA MAQUINARIA Y EQUIPO",
  "D01	HONORARIOS MÉDICOS, DENTALES Y GASTOS HOSPITALARIOS",
  "D02	GASTOS MÉDICOS POR INCAPACIDAD O DISCAPACIDAD",
  "D03	GASTOS FUNERALES",
  "D04	DONATIVOS",
  "D05	INTERESES REALES EFECTIVAMENTE PAGADAS POR CRÉDITOS HIPOTECARIOS (CASA HABITACIÓN)",
  "D06 	APORTACIONES VOLUNTARIAS AL SAR",
  "D07	PRIMAS POR SEGUROS DE GASTOS MÉDICOS",
  "D08	GASTOS DE TRANSPORTACIÓN ESCOLAR OBLIGATORIA",
  "D09	DEPÓSITOS EN CUENTAS PARA EL AHORRO, PRIMAS QUE TENGAN COMO BASE PLANES DE PENSIONES ",
  "D10	PAGO POR SERVICIOS EDUCATIVOS (COLEGIATURAS)",
  "P01	POR DEFINIR",
];

const MakePayment = (props) => {
  const {
    myCart,
    setCloseCart,
    shoppingCartPrices,
    shippingCost,
    purchasingData,
    setShippingCost,
    setPurchasingData,
  } = props;

  const formatter = new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  // const urlWebsite = "http://localhost:3000";
  // const urlWebsite = "https://materiales-vasquez.vercel.app";
  const urlWebsite = "https://www.materialesvasquezhnos.com.mx";

  const [subTotal, setSubTotal] = useState(0);
  const [cardNumber, setCardNumber] = useState("");
  const [cardDate, setCardDate] = useState("2021-07");
  const [showDAte, setShowDAte] = useState("01/01");
  const [cardSecurityCode, setCardSecurityCode] = useState("");
  const [cardName, setCardNAme] = useState("");
  const [cardType, setCardType] = useState("");
  const [sameName, setSameName] = useState(false);
  const [shippingName, setShippingName] = useState("");
  const [city, setCity] = useState("Xalapa");
  const [zipCode, setZipCode] = useState("");
  const [invoiceRequired, setInvoiceRequired] = useState(false);
  const paymentForm = useRef(null);
  const invoiceCheck = useRef(null);
  const shippingNameCheck = useRef(null);
  const [cost, deliveryCities] = useShippingCost(zipCode, subTotal);
  // Activa la animación de carga en el botón de Cargar más
  const [load, setLoad] = useState(false);

  const [related, setRelated] = useState([]);

  useEffect(() => {
    setCloseCart();
    window.onscroll = null;
  }, []);

  useEffect(() => {
    setShippingCost(cost);
  }, [cost]);

  useEffect(() => {
    if (shoppingCartPrices.length > 0) {
      setSubTotal(
        shoppingCartPrices.reduce(
          (accumulator, currentValue) => accumulator + currentValue
        )
      );
    }
  }, [shoppingCartPrices]);

  useEffect(() => {
    if (cardNumber.startsWith("3")) {
      setCardType("American Express");
    } else if (cardNumber.startsWith("4")) {
      setCardType("Visa");
    } else if (cardNumber.startsWith("5")) {
      setCardType("Mastercard");
    } else {
      setCardType("");
    }
  }, [cardNumber]);

  const formatDate = (value) => {
    let year = value.slice(2, 4);
    let month = value.slice(5, 7);
    setShowDAte(year + "/" + month);
  };

  const handleChange = (e, func) => {
    func(e);
  };

  // Solicita articulos relacionados por nombre
  useEffect(async () => {
    if (myCart.length > 0) {
      const responseRelatedByName = await fetch(
        `https://api-vasquez.herokuapp.com/api/related-by-name/${myCart[
          myCart.length - 1
        ].name
          .split(" ")[0]
          .replace(/\//gi, "slash")}?first=1&last=4`
      );
      const { data: related } = await responseRelatedByName.json();
      setRelated(related);
    }
  }, [myCart]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoad(true);
    const newOrder = new FormData(paymentForm.current);
    const order = {
      date: new Intl.DateTimeFormat("es-MX", {
        dateStyle: "medium",
        timeStyle: "short",
      }).format(new Date()),
      // cardNumber: newOrder.get("card-number"),
      // cardDate: newOrder.get("card-date"),
      // cardSecurityCode: newOrder.get("card-security-code"),
      // cardName: newOrder.get("card-name"),

      shippingName: sameName
        ? "Es el mismo nombre de la tarjeta" + " " + newOrder.get("card-name")
        : newOrder.get("shippingName"),
      shippingLastName: sameName
        ? "Es el mismo nombre de la tarjeta"
        : newOrder.get("shippingLastName"),
      phoneNumber: newOrder.get("phoneNumber"),
      shippingEmail: newOrder.get("shippingEmail"),

      addressState: newOrder.get("addressState"),
      addressCP: newOrder.get("addressCP"),
      addressCity: newOrder.get("addressCity"),
      addressStreet: newOrder.get("addressStreet"),
      addressNumber: newOrder.get("addressNumber"),
      addressReferences: newOrder.get("addressReferences"),

      requiredInvoice: invoiceRequired
        ? "Requiere Factura"
        : "No requiere Factura",
      invoiceRFC: invoiceRequired ? newOrder.get("invoiceRFC") : "",
      invoiceCompanyName: invoiceRequired
        ? newOrder.get("invoiceCompanyName")
        : "",
      cfdi: invoiceRequired ? newOrder.get("cfdi") : "",
      invoicePhoneNumber: invoiceRequired
        ? newOrder.get("invoicePhoneNumber")
        : "",
      invoiceShippingEmail: invoiceRequired
        ? newOrder.get("invoiceShippingEmail")
        : "",

      subTotal: formatter.format(subTotal),
      shippingCost: formatter.format(shippingCost),
      total: formatter.format(shippingCost + subTotal),

      products: myCart,
    };

    // const paymetnMethods = [
    //   { cardNumber: newOrder.get("card-number") },
    //   { cardDate: newOrder.get("card-date") },
    //   { cardSecurityCode: newOrder.get("card-security-code") },
    //   { cardName: newOrder.get("card-name") },
    // ];

    // // Encrypt
    // const ciphertext = CryptoJS.AES.encrypt(
    //   JSON.stringify(paymetnMethods),
    //   "secret key 123"
    // ).toString();
    // console.log("ciphertext paymetnMethods: ", ciphertext);

    // // Decrypt
    // const bytes = CryptoJS.AES.decrypt(ciphertext, "secret key 123");
    // const decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));

    setPurchasingData(order);

    console.log("order: ", order);
    //sendEmail(order);

    // Esto solo es de prueba
    setTimeout(() => {
      setLoad(false);
      window.location.href = "/pago-realizado";
    }, 3000);
  };

  // Código de pasarela de pagos
  const forwardForm = (responseObj, elementArr) => {
    const newForm = document.createElement("form");
    newForm.setAttribute("method", "post");
    newForm.setAttribute("action", responseObj.redirectURL);
    newForm.setAttribute("id", "newForm");
    document.body.appendChild(newForm);
    for (let i = 0; i < elementArr.length; i++) {
      let element = elementArr[i];
      let input = document.createElement("input");
      input.setAttribute("type", "hidden");
      input.setAttribute("name", element.name);
      input.setAttribute("value", element.value);
      document.newForm.appendChild(input);
    }
    document.newForm.submit();
  };

  const receiveMessage = (e) => {
    console.log("receiveMessage");
    // if (e.origin != urlWebsite) {
    //   console.log("e.origin: ", e.origin);
    //   return;
    // }
    // let elementArr = e.data.elementArr;
    // console.log("elementArr: ", elementArr);
    // forwardForm(e.data, elementArr);
  };

  useEffect(() => {
    window.addEventListener("message", receiveMessage, false);
    return () => {
      window.removeEventListener("message", receiveMessage, false);
    };
  }, ["message"]);

  // Se obtiene la cadena hexadecimal
  const convertStringToHex = () => {
    // Se concatenen los valores requeridos
    const str = (
      process.env.NEXT_PUBLIC_STORE_ID +
      new Intl.DateTimeFormat("es-MX", {
        dateStyle: "medium",
        timeStyle: "short",
      }).format(new Date()) +
      (shippingCost + subTotal) +
      "484" +
      process.env.NEXT_PUBLIC_SHARED_SECRET
    )
      .toString()
      .replace(/,/gi, "")
      .replace(/ /gi, "");
    console.log("Concatenar: ", str);
    var arr = [];
    for (let i = 0; i < str.length; i++) {
      // arr[i] = str.charCodeAt(i).toString(16).slice(-4);
      arr[i] = str.charCodeAt(i);
    }
    console.log(
      "representación hexadecimal: ",
      arr.toString().replace(/,/gi, "")
    );
    // Se genera hash con el algoritmo SHA256
    console.log(
      "hash con el algoritmo SHA256: ",
      CryptoJS.SHA256(arr.toString().replace(/,/gi, "")).toString()
    );
    return CryptoJS.SHA256(arr).toString();
  };

  // console.log("purchasingData: ", purchasingData);

  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1"
        />
        <title>Realizar Pago | Materiales Vasquez Hermanos</title>
      </Head>
      <MainStiled>
        <MainTitle>Realizar Pago</MainTitle>

        <form
          method="POST"
          target="myFrame"
          action="https://test.ipg-online.com/connect/gateway/processing"
        >
          <input type="hidden" name="checkoutoption" value="simpleform" />
          <input
            type="hidden"
            name="hostURI"
            value={`${urlWebsite}/realizar-pago`}
          />
          <input type="hidden" name="txntype" value="sale" />
          <input type="hidden" name="timezone" value="America/Mexico_City" />
          <input
            type="hidden"
            name="txndatetime"
            value={new Intl.DateTimeFormat("es-MX", {
              dateStyle: "medium",
              timeStyle: "short",
            }).format(new Date())}
          />
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
          <button type="submit">Submit</button>
        </form>
        <Iframe name="myFrame"></Iframe>

        <BuyersData>
          <FormStyled ref={paymentForm} onSubmit={handleSubmit}>
            <CardStyled>
              <CardDataTitle>Datos de tarjeta</CardDataTitle>
              <ChipStyled />
              <CardNumber
                type="text"
                name="card-number"
                maxLength="19"
                placeholder="Ingresa aquí el número"
                inputMode="numeric"
                value={cardNumber}
                onChange={(e) =>
                  setCardNumber(
                    e.target.value
                      .replace(/\D/g, "")
                      .replace(/([0-9]{4})/g, "$1 ")
                      .trim()
                  )
                }
                autoComplete="off"
                // required
              />
              <DateAndCode>
                <DateContainer>
                  <ShowDAte
                    type="text"
                    name="card-date"
                    // value={showDAte}
                    placeholder="01/01"
                    // isPlaceholder={showDAte === "01/01" && true}
                    // required
                    autoComplete="off"
                    maxLength="5"
                  />
                  {/* <InputDate
                    type="month"
                    maxLength="4"
                    min="2010-01"
                    max="2030-12"
                    inputMode="month"
                    value={cardDate}
                    onChange={(e) => formatDate(e.target.value, formatDate)}
                    required
                  autoComplete="off" /> */}
                </DateContainer>
                <InputCode
                  type="text"
                  name="card-security-code"
                  maxLength="3"
                  placeholder="CVC/CVV"
                  inputMode="numeric"
                  value={cardSecurityCode}
                  onChange={(e) =>
                    setCardSecurityCode(e.target.value.replace(/\D/g, ""))
                  }
                  // required
                  autoComplete="off"
                />
              </DateAndCode>
              <InputName
                type="text"
                name="card-name"
                maxLength="30"
                placeholder="Ingresa aquí el nombre"
                value={cardName}
                onChange={(e) => setCardNAme(e.target.value)}
                // required
                autoComplete="off"
              />
              {cardType != "" && (
                <LogoTypeCard>
                  {cardType === "Visa" && <VisaLogo />}
                  {cardType === "Mastercard" && <MastercardLogo />}
                  {cardType === "American Express" && <AmericanExpressLogo />}
                </LogoTypeCard>
              )}
              <LogoContainer>
                <Logo />
              </LogoContainer>
            </CardStyled>
            <ShippingData>
              <Subtitle>¿A quién se lo enviamos?</Subtitle>
              <InvoiceQuestion>
                <InvoiceInput
                  type="checkbox"
                  id="shippingNameCheckbox"
                  name="shippingNameCheckbox"
                  ref={shippingNameCheck}
                  defaultChecked={sameName}
                  onChange={() => setSameName(!sameName)}
                />
                <Invoice htmlFor="shippingNameCheckbox" bg={sameName}>
                  El nombre es el mismo nombre que la tarjeta
                </Invoice>
              </InvoiceQuestion>
              <InputSameName
                type="text"
                name="shippingName"
                placeholder="Nombre/s"
                maxLength="30"
                value={shippingName}
                onChange={(e) => setShippingName(e.target.value)}
                same={sameName}
              />
              <InputSameName
                type="text"
                name="shippingLastName"
                placeholder="Apellidos"
                maxLength="30"
                same={sameName}
              />
              <InputBase
                type="tel"
                name="phoneNumber"
                placeholder="Numero de teléfono"
                maxLength="10"
                inputMode="numeric"
                pattern="[0-9]{10}"
                required
              />
              <InputEmail
                type="email"
                name="shippingEmail"
                placeholder="Correo Electrónico"
                maxLength="30"
                required
              />
              <ProofOfPurchase>
                A este correo enviaremos tu comprobante de compra
              </ProofOfPurchase>
            </ShippingData>
            <ShippingAddress>
              <Subtitle>¿A dónde lo enviamos?</Subtitle>
              <StateAndZipCode>
                <InputBase
                  type="text"
                  name="addressState"
                  placeholder="Estado"
                  maxLength="30"
                  required
                />
                <InputBase
                  type="text"
                  name="addressCP"
                  inputMode="numeric"
                  placeholder="Código Postal"
                  value={zipCode}
                  onChange={(e) =>
                    handleChange(
                      e.target.value.replace(/\D/g, "").trim(),
                      setZipCode
                    )
                  }
                  maxLength="7"
                  required
                />
              </StateAndZipCode>
              <SelectCity
                name="addressCity"
                defaultValue="Xalapa"
                onChange={(e) => handleChange(e.target.value, setCity)}
                required
              >
                {deliveryCities.map((city) => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
              </SelectCity>
              <FreeShippingText>
                Envío gratis en Xalapa a partir de $200
              </FreeShippingText>
              <StreetAndNumber>
                <InputBase
                  type="text"
                  name="addressStreet"
                  placeholder="Calle"
                  maxLength="40"
                  required
                />
                <InputBase
                  type="text"
                  name="addressNumber"
                  inputMode="numeric"
                  placeholder="Numero"
                  maxLength="4"
                  required
                />
              </StreetAndNumber>
              <References
                name="addressReferences"
                placeholder="Referencias"
                maxLength="350"
                required
              />
              <InvoiceQuestion>
                <InvoiceInput
                  type="checkbox"
                  id="invoice"
                  name="invoice"
                  ref={invoiceCheck}
                  defaultChecked={invoiceRequired}
                  onChange={() => setInvoiceRequired(!invoiceRequired)}
                />
                <Invoice htmlFor="invoice" bg={invoiceRequired}>
                  ¿Requiere factura?
                </Invoice>
              </InvoiceQuestion>
            </ShippingAddress>
            <ShippingInvoice hide={invoiceRequired}>
              <InputRFC
                type="text"
                name="invoiceRFC"
                placeholder="RFC"
                maxLength="13"
              />
              <InputRFC
                type="text"
                name="invoiceCompanyName"
                placeholder="Razón Social"
                maxLength="50"
              />
              <InputBase
                type="tel"
                name="invoicePhoneNumber"
                placeholder="Numero de teléfono"
                maxLength="10"
                inputMode="numeric"
                pattern="[0-9]{10}"
              />
              <InputEmail
                type="email"
                name="invoiceShippingEmail"
                placeholder="Correo Electrónico"
                maxLength="30"
              />
              <SelectCFDI name="cfdi" required>
                {cfdis.map((cfdi) => (
                  <option key={cfdi} value={cfdi}>
                    {cfdi}
                  </option>
                ))}
              </SelectCFDI>
            </ShippingInvoice>
            {myCart && (
              <MyListOfItems>
                {myCart.map((item) => (
                  <PaymentItemPreview key={item.articulo_id} {...item} />
                ))}
              </MyListOfItems>
            )}
            <CostDetails invoice={invoiceRequired}>
              <CostContainer>
                <p>Subtotal:</p>
                <InputCost
                  type="text"
                  name="subTotal"
                  value={`$${formatter.format(subTotal)}`}
                  readOnly
                />
              </CostContainer>
              <CostContainer>
                <p>Costo de envío:</p>
                <InputCost
                  type="text"
                  name="shippingCost"
                  value={`$${formatter.format(shippingCost)}`}
                  readOnly
                />
              </CostContainer>
              <CostContainer>
                <p>Total:</p>
                <InputCost
                  type="text"
                  name="shippingCost"
                  value={`$${formatter.format(shippingCost + subTotal)}`}
                  readOnly
                />
              </CostContainer>
            </CostDetails>
            <BuyButton type="submit">
              {load ? <SuspensoryPoints /> : "Pagar"}
            </BuyButton>
          </FormStyled>
        </BuyersData>

        {related.length > 0 && (
          <RelatedArticles>
            <RelatedTitle>Puede que te interese</RelatedTitle>
            <PreviewItemContainer>
              <>
                {related.map((article) => (
                  <PreviewItem
                    key={article.articulo_id}
                    {...article}
                    isRelated={true}
                  />
                ))}
              </>
            </PreviewItemContainer>
          </RelatedArticles>
        )}
      </MainStiled>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    carIsEmpty: state.carIsEmpty,
    myCart: state.myCart,
    carIsOpen: state.carIsOpen,
    shoppingCartPrices: state.shoppingCartPrices,
    shippingCost: state.shippingCost,
    purchasingData: state.purchasingData,
  };
};

const mapDispatchToProps = {
  setOpenCart,
  setCloseCart,

  setShippingCost,
  setPurchasingData,
};

export default connect(mapStateToProps, mapDispatchToProps)(MakePayment);
