import React, { useState, useRef, useEffect } from "react";
import { connect } from "react-redux";
import Link from "next/link";
import debounce from "just-debounce-it";
import { useShippingCost } from "../hooks/useShippingCost";
import { sendEmail } from "../utils/sendEmail";

// Actions
import { setPurchasingData } from "../actions";

//Components
import CheckoutForm from "../components/Checkout-Form/CheckoutForm";
import Alert from "../components/Alert";
import PasarelaDePagos from "../components/Pasarela-de-pagos/PasarelaDePagos";

// Styled-Components
import { MainStyled } from "../styles/Inicio/style";
import {
  Title,
  Report,
  DetailsSection,
  Details,
  Totals,
} from "../styles/realizar-pago/style";

// Formatear precio
const formatter = new Intl.NumberFormat("en-US", {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

const Checkout = ({ myCart, setPurchasingData }) => {
  const [addressCP, setAddressCP] = useState("");
  //Lista de precios
  const [listPrices, setListPrices] = useState([]);
  // Total del costo sin envio
  const [total, setTotal] = useState(0);
  //Referencia al formulario
  const paymentForm = useRef(null);
  const paymentGateway = useRef(null);
  // Datos del formulario
  const [formData, setFormData] = useState({});
  const [paymentData, setPaymentData] = useState({});
  // Obtiene el costo de envío y las ciudades disponibles según el código postal
  const [cost, deliveryCities] = useShippingCost(addressCP, total);
  // Estado del modal de alerta
  const [modalOpen, setModalOpen] = useState(false);
  const [showForm, setShowForm] = useState(true);

  useEffect(() => {
    if (myCart.length > 0) {
      let prices = myCart.map((item) => item.price * item.initialQuantity);
      setListPrices(prices);
    }
  }, [myCart]);

  useEffect(() => {
    if (listPrices.length > 0) {
      let total = listPrices.reduce(
        (accumulator, currentValue) => accumulator + currentValue
      );
      setTotal(total);
    }
  }, [listPrices]);

  useEffect(() => {
    deliveryCities[0] === "contact" ? setModalOpen(true) : setModalOpen(false);
  }, [deliveryCities]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const newOrder = new FormData(paymentForm.current);
    const order = {
      date: new Intl.DateTimeFormat("es-MX", {
        dateStyle: "medium",
        timeStyle: "short",
      }).format(new Date()),

      shippingName: newOrder.get("shippingName"),
      shippingLastName: newOrder.get("shippingLastName"),

      phoneNumber: newOrder.get("phoneNumber"),
      shippingEmail: newOrder.get("shippingEmail"),

      addressState: newOrder.get("addressState"),
      addressCP: newOrder.get("addressCP"),
      addressCity: newOrder.get("addressCity"),
      addressStreet: newOrder.get("addressStreet"),
      addressNumber: newOrder.get("addressNumber"),
      addressReferences: newOrder.get("referencesText"),

      requiredInvoice: newOrder.get("invoiceRequiredInput"),
      invoiceRFC: newOrder.get("invoiceRFC"),
      invoiceCompanyName: newOrder.get("invoiceCompanyName"),
      cfdi: newOrder.get("cfdi"),
      invoicePhoneNumber: newOrder.get("invoicePhoneNumber"),
      invoiceShippingEmail: newOrder.get("invoiceShippingEmail"),

      subTotal: newOrder.get("subTotal"),
      shippingCost: newOrder.get("shippingCost"),
      total: newOrder.get("total"),

      products: myCart,
    };

    setFormData(order);
    paymentGateway.current.click();
  };

  useEffect(() => {
    if (paymentData.orderNumber) {
      let order = { ...formData, ...paymentData };
      console.log("listo: ");
      sendEmail(order);
      setPurchasingData(order);
    }
  }, [formData, paymentData]);

  const paymentGatewayResponse = (e) => {
    e.preventDefault();

    const status = e.data.elementArr.filter(
      (element) => element.name === "status"
    );

    const code = e.data.elementArr.filter(
      (element) => element.name === "approval_code"
    );

    if (status[0].value === "APROBADO") {
      const orderSucces = {
        orderNumber: e.data.elementArr[4].value,
        approvalCode: e.data.elementArr[14].value,
        purchaseAmount: e.data.elementArr[11].value,
        terminatedCard: e.data.elementArr[27].value.slice(-4),
      };

      setPaymentData(orderSucces);
    } else {
      const failReason = e.data.elementArr.filter(
        (element) => element.name === "fail_reason"
      );
      const chargetotal = e.data.elementArr.filter(
        (element) => element.name === "chargetotal"
      );
      const orderFail = {
        status: status[0].value,
        failReason: failReason.length !== 0 ? failReason[0].value : "",
        chargeTotal: chargetotal.length !== 0 ? chargetotal[0].value : "",
        approval_code: code[0].value,
      };
      setPurchasingData(orderFail);
    }
    console.log("redirectURL: ", e.data.redirectURL);
    setTimeout(() => {
      window.location.href = e.data.redirectURL;
    }, 800);
  };

  // Código de pasarela de pagos
  function forwardForm(responseObj, elementArr) {
    var newForm = document.createElement("form");
    newForm.setAttribute("method", "post");
    newForm.setAttribute("action", "");
    newForm.setAttribute("action", responseObj.redirectURL);
    newForm.setAttribute("id", "newForm");
    newForm.setAttribute("name", "newForm");
    document.body.appendChild(newForm);
    for (var i = 0; i < elementArr.length; i++) {
      var element = elementArr[i];
      var input = document.createElement("input");
      input.setAttribute("type", "hidden");
      input.setAttribute("name", element.name);
      input.setAttribute("value", element.value);
      // document.newForm.appendChild(input);
      document.getElementById("newForm").appendChild(input);
    }
    // document.getElementById("newForm").submit();
  }

  // Limita el numero de llamados a las funciones de
  // enviar mail y cambiar de pagina
  const handlePurchase = debounce(async (e, elementArr) => {
    paymentGatewayResponse(e);
    forwardForm(e.data, elementArr);
  }, 3000);

  const receiveMessage = (e) => {
    if (
      e.origin === "https://www2.ipg-online.com" ||
      e.origin === "https://test.ipg-online.com"
    ) {
      let elementArr = e.data.elementArr;
      handlePurchase(e, elementArr);
    } else {
      return;
    }
  };

  useEffect(() => {
    window.addEventListener("message", (e) => receiveMessage(e), false);
    return () => {
      window.removeEventListener("message", (e) => receiveMessage(e), false);
    };
  }, ["message"]);

  return (
    <>
      <MainStyled>
        <Title>Datos de compra</Title>
        <CheckoutForm
          showForm={showForm}
          addressCP={addressCP}
          setAddressCP={setAddressCP}
          cities={deliveryCities}
          paymentForm={paymentForm}
          handleSubmit={handleSubmit}
          total={total}
          cost={cost}
        />
        <Report>Los datos marcados con (*) son obligatorios</Report>
        <DetailsSection>
          <Details>
            <p>Subtotal</p>
            <p>${formatter.format(total)}</p>
          </Details>
          <Details>
            <p>Envío</p>
            {cost === 0 ? <p>GRATIS*</p> : <p>${formatter.format(cost)}</p>}
          </Details>
          <Details>
            <p>Tu total</p>
            <Totals>${formatter.format(total + cost)}</Totals>
          </Details>
        </DetailsSection>
        <PasarelaDePagos
          total={total + cost}
          pay={deliveryCities[0] === "contact" ? false : true}
          setShowForm={setShowForm}
          paymentGateway={paymentGateway}
        />
      </MainStyled>
      {modalOpen && (
        <Alert
          isOpen={modalOpen}
          handleClose={setModalOpen}
          cart={myCart}
          zipCode={addressCP}
        />
      )}
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    myCart: state.myCart,
  };
};

const mapDispatchToProps = {
  setPurchasingData,
};

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);

// import React, { useState, useRef, useEffect } from "react";
// import { connect } from "react-redux";
// import { setOpenCart, setCloseCart, setPurchasingData } from "../actions";
// // import { NextSeo, LocalBusinessJsonLd } from "next-seo";
// // import { useShippingCost } from "../hooks/useShippingCost";
// // import { sendEmail } from "../utils/sendEmail";
// // import fetch from "isomorphic-unfetch";
// // import debounce from "just-debounce-it";

// // Components
// // import PaymentItemPreview from "../../components/Payment-Item-Preview/PaymentItemPreview";
// // import PreviewItem from "../../components/Preview-Item/PreviewItem";
// // import PasarelaDePagos from "../../components/Pasarela-de-pagos/PasarelaDePagos";
// // import Alert from "../../components/Alert";

// // Styled-Components
// import {
//   MainStiled,
//   MainTitle,
//   BuyersData,
//   FormStyled,
//   ShippingAddress,
//   ShippingData,
//   Subtitle,
//   DataSubtitle,
//   InputBase,
//   PickUpQuestion,
//   PickUpInput,
//   PickUp,
//   PickUpConatiner,
//   PickUpLink,
//   ZipCode,
//   InputSameName,
//   PhoneNumber,
//   InputEmail,
//   ProofOfPurchase,
//   References,
//   SelectCity,
//   Street,
//   FreeShippingText,
//   InvoiceQuestion,
//   Invoice,
//   InvoiceInput,
//   ShippingInvoice,
//   InputRFC,
//   SelectCFDI,
//   MyListOfItems,
//   CostDetails,
//   CostContainer,
//   InputCost,
//   RelatedArticles,
//   RelatedTitle,
//   PreviewItemContainer,
// } from "../styles/realizar-pago/style";

// //Data
// const cfdis = [
//   "G01	ADQUISICIÓN DE MERCANCIAS",
//   "G02	DEVOLUCIONES, DESCUENTOS O BONIFICACIONES",
//   "G03	GASTOS EN GENERAL",
//   "I01	CONSTRUCCIONES",
//   "I02	MOBILIARIO Y EQUIPO DE OFICINA POR INVERSIONES",
//   "I03	EQUIPO DE TRANSPORTE ",
//   "I04	EQUIPO DE COMPUTO Y ACCESORIOS",
//   "I05	DAODS, TROQUELES, MOLDES, MATRICES Y HERRAMENTAL",
//   "I06	COMUNICACIONES TELEFÓNICAS",
//   "I07	COMUNICACIONES SATELITALES",
//   "I08	OTRA MAQUINARIA Y EQUIPO",
//   "D01	HONORARIOS MÉDICOS, DENTALES Y GASTOS HOSPITALARIOS",
//   "D02	GASTOS MÉDICOS POR INCAPACIDAD O DISCAPACIDAD",
//   "D03	GASTOS FUNERALES",
//   "D04	DONATIVOS",
//   "D05	INTERESES REALES EFECTIVAMENTE PAGADAS POR CRÉDITOS HIPOTECARIOS (CASA HABITACIÓN)",
//   "D06 	APORTACIONES VOLUNTARIAS AL SAR",
//   "D07	PRIMAS POR SEGUROS DE GASTOS MÉDICOS",
//   "D08	GASTOS DE TRANSPORTACIÓN ESCOLAR OBLIGATORIA",
//   "D09	DEPÓSITOS EN CUENTAS PARA EL AHORRO, PRIMAS QUE TENGAN COMO BASE PLANES DE PENSIONES ",
//   "D10	PAGO POR SERVICIOS EDUCATIVOS (COLEGIATURAS)",
//   "P01	POR DEFINIR",
// ];

// const MakePayment = (props) => {
//   return (
//     <main>
//       <h1>Realizar pago</h1>
//     </main>
//   );
//   // const { myCart, setCloseCart, shoppingCartPrices, setPurchasingData } = props;

//   // const formatter = new Intl.NumberFormat("en-US", {
//   //   minimumFractionDigits: 2,
//   //   maximumFractionDigits: 2,
//   // });

//   // const [subTotal, setSubTotal] = useState(0);
//   // const pickUpCheck = useRef(null);
//   // const [pickUp, setPickUp] = useState(false);
//   // const [city, setCity] = useState("Xalapa");
//   // const [zipCode, setZipCode] = useState("");
//   // const [referencesText, setReferencesText] = useState("");
//   // const [shippingCost, setShippingCost] = useState(50);
//   // const [invoiceRequired, setInvoiceRequired] = useState(false);
//   // const paymentForm = useRef(null);
//   // const invoiceCheck = useRef(null);
//   // const [cost, deliveryCities] = useShippingCost(zipCode, subTotal);
//   // // Activa la animación de carga en el botón de Cargar más
//   // const [load, setLoad] = useState(false);

//   // // Estado del modal de notificacio
//   // const [modalOpen, setModalOpen] = useState(false);

//   // // Retira de la vista el formulario principal- despues de click en el boton pagar
//   // const [showForm, setShowForm] = useState(true);

//   // // Comprovacion de datos minimos necesarios
//   // const [name, setName] = useState("");
//   // const [lastName, setLastName] = useState("");
//   // const [phone, setPhone] = useState("");
//   // const [mail, setMail] = useState("");

//   // const [rfc, setRfc] = useState("");
//   // const [reazon, setReazon] = useState("");
//   // const [invoicePhone, setInvoicePhone] = useState("");
//   // const [invoiceMail, setInvoiceMail] = useState("");

//   // const [formReady, setFormReady] = useState(false);

//   // useEffect(() => {
//   //   if (name !== "" && lastName !== "" && phone !== "" && mail !== "") {
//   //     if (invoiceRequired) {
//   //       if (
//   //         rfc !== "" &&
//   //         reazon !== "" &&
//   //         invoicePhone !== "" &&
//   //         invoiceMail !== ""
//   //       ) {
//   //         setFormReady(true);
//   //       } else {
//   //         setFormReady(false);
//   //       }
//   //     } else {
//   //       setFormReady(true);
//   //     }
//   //   } else {
//   //     setFormReady(false);
//   //   }
//   // }, [
//   //   name,
//   //   lastName,
//   //   phone,
//   //   mail,
//   //   invoiceRequired,
//   //   rfc,
//   //   reazon,
//   //   invoicePhone,
//   //   invoiceMail,
//   // ]);

//   // // const [related, setRelated] = useState([]);

//   // useEffect(() => {
//   //   setCloseCart();
//   //   window.onscroll = null;
//   // }, []);

//   // useEffect(() => {
//   //   setShippingCost(cost);
//   // }, [cost]);

//   // useEffect(() => {
//   //   deliveryCities[0] === "contact" ? setModalOpen(true) : setModalOpen(false);
//   // }, [deliveryCities]);

//   // useEffect(() => {
//   //   if (shoppingCartPrices.length > 0) {
//   //     setSubTotal(
//   //       shoppingCartPrices.reduce(
//   //         (accumulator, currentValue) => accumulator + currentValue
//   //       )
//   //     );
//   //   }
//   // }, [shoppingCartPrices]);

//   // const handleChange = (e, func) => {
//   //   func(e);
//   // };

//   // // Solicita articulos relacionados por nombre
//   // // useEffect(async () => {
//   // //   if (myCart.length > 0) {
//   // //     const responseRelatedByName = await fetch(
//   // //       `/api/related-by-name/${myCart[myCart.length - 1].name
//   // //         .split(" ")[0]
//   // //         .replace(/\//gi, "slash")}?first=1&last=4`
//   // //     );
//   // //     const { data: related } = await responseRelatedByName.json();
//   // //     setRelated(related);
//   // //   }
//   // // }, [myCart]);

//   // useEffect(() => {
//   //   paymentForm.current.reset();
//   // }, [myCart]);

//   // useEffect(() => {
//   //   pickUp ? setZipCode("pickUp") : setZipCode("");
//   //   pickUp
//   //     ? setReferencesText("Prefiero recogerlo en tienda")
//   //     : setReferencesText("");
//   // }, [pickUp]);

//   // const handleSubmit = (e) => {
//   //   e.preventDefault();
//   //   setLoad(true);

//   //   // console.log("elementArr: ", e.data.elementArr);
//   //   const status = e.data.elementArr.filter(
//   //     (element) => element.name === "status"
//   //   );

//   //   const code = e.data.elementArr.filter(
//   //     (element) => element.name === "approval_code"
//   //   );

//   //   if (status[0].value === "APROBADO") {
//   //     const newOrder = new FormData(paymentForm.current);
//   //     const order = {
//   //       date: new Intl.DateTimeFormat("es-MX", {
//   //         dateStyle: "medium",
//   //         timeStyle: "short",
//   //       }).format(new Date()),

//   //       orderNumber: e.data.elementArr[4].value,
//   //       approvalCode: e.data.elementArr[14].value,
//   //       purchaseAmount: e.data.elementArr[11].value,
//   //       terminatedCard: e.data.elementArr[27].value.slice(-4),

//   //       shippingName: newOrder.get("shippingName"),
//   //       shippingLastName: newOrder.get("shippingLastName"),

//   //       phoneNumber: newOrder.get("phoneNumber"),
//   //       shippingEmail: newOrder.get("shippingEmail"),

//   //       addressState: newOrder.get("addressState"),
//   //       addressCP: newOrder.get("addressCP"),
//   //       addressCity: newOrder.get("addressCity"),
//   //       addressStreet: newOrder.get("addressStreet"),
//   //       addressNumber: newOrder.get("addressNumber"),
//   //       addressReferences: newOrder.get("referencesText"),

//   //       requiredInvoice: newOrder.get("invoiceRequiredInput"),
//   //       invoiceRFC: newOrder.get("invoiceRFC"),
//   //       invoiceCompanyName: newOrder.get("invoiceCompanyName"),
//   //       cfdi: newOrder.get("cfdi"),
//   //       invoicePhoneNumber: newOrder.get("invoicePhoneNumber"),
//   //       invoiceShippingEmail: newOrder.get("invoiceShippingEmail"),

//   //       subTotal: shoppingCartPrices.reduce(
//   //         (accumulator, currentValue) => accumulator + currentValue
//   //       ),
//   //       shippingCost: newOrder.get("shippingCost"),
//   //       total: newOrder.get("totalCost"),

//   //       products: myCart,
//   //     };

//   //     console.log(order);
//   //     setPurchasingData(order);

//   //     sendEmail(order);
//   //   } else {
//   //     const failReason = e.data.elementArr.filter(
//   //       (element) => element.name === "fail_reason"
//   //     );
//   //     const chargetotal = e.data.elementArr.filter(
//   //       (element) => element.name === "chargetotal"
//   //     );
//   //     const orderFail = {
//   //       status: status[0].value,
//   //       failReason: failReason.length !== 0 ? failReason[0].value : "",
//   //       chargeTotal: chargetotal.length !== 0 ? chargetotal[0].value : "",
//   //       approval_code: code[0].value,
//   //     };
//   //     setPurchasingData(orderFail);
//   //   }
//   //   setTimeout(() => {
//   //     window.location.href = e.data.redirectURL;
//   //   }, 500);
//   // };

//   // // Código de pasarela de pagos
//   // function forwardForm(responseObj, elementArr) {
//   //   var newForm = document.createElement("form");
//   //   newForm.setAttribute("method", "post");
//   //   newForm.setAttribute("action", "");
//   //   newForm.setAttribute("action", responseObj.redirectURL);
//   //   newForm.setAttribute("id", "newForm");
//   //   newForm.setAttribute("name", "newForm");
//   //   document.body.appendChild(newForm);
//   //   for (var i = 0; i < elementArr.length; i++) {
//   //     var element = elementArr[i];
//   //     var input = document.createElement("input");
//   //     input.setAttribute("type", "hidden");
//   //     input.setAttribute("name", element.name);
//   //     input.setAttribute("value", element.value);
//   //     // document.newForm.appendChild(input);
//   //     document.getElementById("newForm").appendChild(input);
//   //   }
//   //   // document.getElementById("newForm").submit();
//   // }

//   // // Limita el numero de llamados a las funciones de
//   // // enviar mail y cambiar de pagina
//   // const handlePurchase = debounce(async (e, elementArr) => {
//   //   handleSubmit(e);
//   //   forwardForm(e.data, elementArr);
//   // }, 3000);

//   // const receiveMessage = (e) => {
//   //   if (
//   //     e.origin === "https://www2.ipg-online.com" ||
//   //     e.origin === "https://test.ipg-online.com"
//   //   ) {
//   //     let elementArr = e.data.elementArr;
//   //     handlePurchase(e, elementArr);
//   //   } else {
//   //     return;
//   //   }
//   // };

//   // useEffect(() => {
//   //   window.addEventListener("message", (e) => receiveMessage(e), false);
//   //   return () => {
//   //     window.removeEventListener("message", (e) => receiveMessage(e), false);
//   //   };
//   // }, ["message"]);

//   // return (
//   //   <>
//   //     <NextSeo
//   //       title="Realizar Pago | Materiales Vasquez Hermanos"
//   //       description={`Todo listo para adquirir tus ${myCart.length} artículos en el carrito`}
//   //       canonical="https://www.materialesvasquezhnos.com.mx/realizar-pago"
//   //       openGraph={{
//   //         url: "https://www.materialesvasquezhnos.com.mx/realizar-pago",
//   //         title: "Realizar Pago | Materiales Vasquez Hermanos",
//   //         description: `Todo listo para adquirir tus ${myCart.length} artículos en el carrito`,
//   //         images: [
//   //           {
//   //             url: "https://res.cloudinary.com/duibtuerj/image/upload/v1630083340/brand/meta-image_rcclee.jpg",
//   //             width: 200,
//   //             height: 200,
//   //             alt: "Logotipo de Materiales Vasquez Hermanos",
//   //           },
//   //         ],
//   //         site_name: "Materiales Vasquez Hermanos",
//   //       }}
//   //       twitter={{
//   //         handle: "@MaterialesVH",
//   //         site: "@MaterialesVH",
//   //         cardType: "summary",
//   //       }}
//   //     />
//   //     <LocalBusinessJsonLd
//   //       type="HomeGoodsStore"
//   //       name="Realizar Pago | Materiales Vasquez Hermanos"
//   //       description={`Todo listo para adquirir tus ${myCart.length} artículos en el carrito`}
//   //       url="https://www.materialesvasquezhnos.com.mx/realizar-pago"
//   //       telephone="+522288401919"
//   //       address={{
//   //         streetAddress: "Lázaro Cárdenas 274",
//   //         addressLocality: "Xalapa",
//   //         addressRegion: "MEX",
//   //         postalCode: "91180",
//   //         addressCountry: "MX",
//   //       }}
//   //     />
//   //     <MainStiled>
//   //       <MainTitle>Realizar Pago</MainTitle>

//   //       <BuyersData>
//   //         <FormStyled
//   //           ref={paymentForm}
//   //           id="customerDataForm"
//   //           onSubmit={handleSubmit}
//   //         >
//   //           <ShippingData showForm={showForm}>
//   //             {!pickUp ? (
//   //               <DataSubtitle>¿A quién se lo enviamos?</DataSubtitle>
//   //             ) : (
//   //               <DataSubtitle>¿Quien hace la compra?</DataSubtitle>
//   //             )}
//   //             <InputSameName
//   //               type="text"
//   //               name="shippingName"
//   //               placeholder="Nombre/s"
//   //               maxLength="30"
//   //               required
//   //               onChange={(e) => setName(e.target.value.toString().trim())}
//   //             />
//   //             <InputSameName
//   //               type="text"
//   //               name="shippingLastName"
//   //               placeholder="Apellidos"
//   //               maxLength="30"
//   //               required
//   //               onChange={(e) => setLastName(e.target.value.toString().trim())}
//   //             />
//   //             <PhoneNumber
//   //               type="tel"
//   //               name="phoneNumber"
//   //               placeholder="Numero de teléfono"
//   //               maxLength="10"
//   //               inputMode="numeric"
//   //               pattern="[0-9]{10}"
//   //               required
//   //               onChange={(e) => setPhone(e.target.value.toString().trim())}
//   //             />
//   //             <InputEmail
//   //               type="email"
//   //               name="shippingEmail"
//   //               placeholder="Correo Electrónico"
//   //               maxLength="30"
//   //               required
//   //               onChange={(e) => setMail(e.target.value.toString().trim())}
//   //             />
//   //             <ProofOfPurchase>
//   //               A este correo enviaremos tu comprobante de compra
//   //             </ProofOfPurchase>
//   //           </ShippingData>
//   //           <ShippingAddress invoice={invoiceRequired} showForm={showForm}>
//   //             {!pickUp && <Subtitle>¿A dónde lo enviamos?</Subtitle>}
//   //             <PickUpQuestion>
//   //               <PickUpInput
//   //                 type="checkbox"
//   //                 id="pickUp"
//   //                 name="pickUp"
//   //                 ref={pickUpCheck}
//   //                 onChange={() => setPickUp(!pickUp)}
//   //               />
//   //               <PickUp htmlFor="pickUp" bg={pickUp}>
//   //                 Prefiero recogerlo en tienda
//   //               </PickUp>
//   //             </PickUpQuestion>
//   //             {!pickUp ? (
//   //               <>
//   //                 <InputBase
//   //                   type="text"
//   //                   name="addressState"
//   //                   placeholder="Estado"
//   //                   maxLength="30"
//   //                   required
//   //                 />
//   //                 <ZipCode
//   //                   type="text"
//   //                   name="addressCP"
//   //                   inputMode="numeric"
//   //                   placeholder="Código Postal"
//   //                   value={zipCode}
//   //                   onChange={(e) =>
//   //                     handleChange(
//   //                       e.target.value.replace(/\D/g, "").trim(),
//   //                       setZipCode
//   //                     )
//   //                   }
//   //                   maxLength="7"
//   //                   required
//   //                 />
//   //                 <SelectCity
//   //                   name="addressCity"
//   //                   defaultValue="Xalapa"
//   //                   onChange={(e) => handleChange(e.target.value, setCity)}
//   //                   required
//   //                 >
//   //                   {deliveryCities.map((city) => (
//   //                     <option key={city} value={city}>
//   //                       {city}
//   //                     </option>
//   //                   ))}
//   //                 </SelectCity>
//   //                 <FreeShippingText>
//   //                   Envío gratis en Xalapa a partir de $200
//   //                 </FreeShippingText>
//   //                 <InputBase
//   //                   type="text"
//   //                   name="addressStreet"
//   //                   placeholder="Calle"
//   //                   maxLength="40"
//   //                   required
//   //                 />
//   //                 <InputBase
//   //                   type="text"
//   //                   name="addressNumber"
//   //                   inputMode="numeric"
//   //                   placeholder="Numero"
//   //                   maxLength="4"
//   //                   required
//   //                 />
//   //                 <References
//   //                   name="referencesText"
//   //                   placeholder="Referencias"
//   //                   maxLength="350"
//   //                   required
//   //                   value={referencesText}
//   //                   onChange={(e) =>
//   //                     handleChange(e.target.value.toString(), setReferencesText)
//   //                   }
//   //                 />
//   //               </>
//   //             ) : (
//   //               <PickUpConatiner>
//   //                 <p>
//   //                   Podrás recoger tu pedido en la sucursal{" "}
//   //                   <span>Lázaro Cárdenas</span>
//   //                 </p>
//   //                 <p>
//   //                   Av. Lázaro Cárdenas N.274 Col. Encinal c.p 91180 Xalapa,
//   //                   Veracruz
//   //                 </p>
//   //                 <PickUpLink
//   //                   href="https://goo.gl/maps/CS4JgsBKMByXvEHt5"
//   //                   target="_blank"
//   //                   rel="noopener noreferrer"
//   //                   itemProp="hasMap"
//   //                 >
//   //                   Ver ubicación
//   //                 </PickUpLink>
//   //                 <p>
//   //                   Nos pondremos en contacto contigo para coordinar tu entrega
//   //                 </p>

//   //                 <input
//   //                   type="hidden"
//   //                   name="addressState"
//   //                   value={""}
//   //                   readOnly
//   //                 />
//   //                 <input type="hidden" name="addressCP" value={""} readOnly />
//   //                 <input type="hidden" name="addressCity" value={""} readOnly />
//   //                 <input
//   //                   type="hidden"
//   //                   name="addressStreet"
//   //                   value={""}
//   //                   readOnly
//   //                 />
//   //                 <input
//   //                   type="hidden"
//   //                   name="addressNumber"
//   //                   value={""}
//   //                   readOnly
//   //                 />
//   //                 <input
//   //                   type="hidden"
//   //                   name="referencesText"
//   //                   value={referencesText}
//   //                   readOnly
//   //                 />
//   //               </PickUpConatiner>
//   //             )}

//   //             <InvoiceQuestion>
//   //               <InvoiceInput
//   //                 type="checkbox"
//   //                 id="invoice"
//   //                 name="invoice"
//   //                 ref={invoiceCheck}
//   //                 defaultChecked={invoiceRequired}
//   //                 onChange={() => setInvoiceRequired(!invoiceRequired)}
//   //               />
//   //               <Invoice htmlFor="invoice" bg={invoiceRequired}>
//   //                 ¿Requiere factura?
//   //               </Invoice>
//   //             </InvoiceQuestion>
//   //           </ShippingAddress>
//   //           <ShippingInvoice hide={invoiceRequired} showForm={showForm}>
//   //             <input
//   //               type="hidden"
//   //               name="invoiceRequiredInput"
//   //               value={
//   //                 invoiceRequired
//   //                   ? "Datos para facturación"
//   //                   : "No Requiere factura"
//   //               }
//   //               readOnly
//   //             />
//   //             <InputRFC
//   //               type="text"
//   //               name="invoiceRFC"
//   //               placeholder="RFC"
//   //               maxLength="13"
//   //               onChange={(e) => setRfc(e.target.value.toString().trim())}
//   //             />
//   //             <InputRFC
//   //               type="text"
//   //               name="invoiceCompanyName"
//   //               placeholder="Razón Social"
//   //               maxLength="50"
//   //               onChange={(e) => setReazon(e.target.value.toString().trim())}
//   //             />
//   //             <InputBase
//   //               type="tel"
//   //               name="invoicePhoneNumber"
//   //               placeholder="Numero de teléfono"
//   //               maxLength="10"
//   //               inputMode="numeric"
//   //               pattern="[0-9]{10}"
//   //               onChange={(e) =>
//   //                 setInvoicePhone(e.target.value.toString().trim())
//   //               }
//   //             />
//   //             <InputEmail
//   //               type="email"
//   //               name="invoiceShippingEmail"
//   //               placeholder="Correo Electrónico"
//   //               maxLength="30"
//   //               onChange={(e) =>
//   //                 setInvoiceMail(e.target.value.toString().trim())
//   //               }
//   //             />
//   //             <SelectCFDI name="cfdi" required>
//   //               {cfdis.map((cfdi) => (
//   //                 <option key={cfdi} value={cfdi}>
//   //                   {cfdi}
//   //                 </option>
//   //               ))}
//   //             </SelectCFDI>
//   //           </ShippingInvoice>
//   //           {myCart && (
//   //             <MyListOfItems showForm={showForm}>
//   //               {myCart.map((item) => (
//   //                 <PaymentItemPreview key={item.articulo_id} {...item} />
//   //               ))}
//   //             </MyListOfItems>
//   //           )}
//   //           <CostDetails invoice={invoiceRequired} showForm={showForm}>
//   //             <CostContainer>
//   //               <p>Subtotal:</p>
//   //               <InputCost
//   //                 type="text"
//   //                 name="subTotal"
//   //                 value={`$${formatter.format(subTotal)}`}
//   //                 readOnly
//   //               />
//   //             </CostContainer>
//   //             <CostContainer>
//   //               <p>Costo de envío:</p>
//   //               <input
//   //                 type="hidden"
//   //                 name="shippingCost"
//   //                 value={shippingCost}
//   //                 readOnly
//   //               />
//   //               <InputCost
//   //                 type="text"
//   //                 value={`$${formatter.format(shippingCost)}`}
//   //                 readOnly
//   //               />
//   //             </CostContainer>
//   //             <CostContainer>
//   //               <p>Total:</p>
//   //               <input
//   //                 type="hidden"
//   //                 name="totalCost"
//   //                 value={shippingCost + subTotal}
//   //                 readOnly
//   //               />
//   //               <InputCost
//   //                 type="text"
//   //                 value={`$${formatter.format(shippingCost + subTotal)}`}
//   //                 readOnly
//   //               />
//   //             </CostContainer>
//   //           </CostDetails>
//   //           {/* <button type="submit">Enviar</button> */}
//   //         </FormStyled>
//   //         <PasarelaDePagos
//   //           shippingCost={shippingCost}
//   //           subTotal={subTotal}
//   //           pay={deliveryCities[0] === "contact" ? false : true}
//   //           setShowForm={setShowForm}
//   //           formReady={formReady}
//   //         />
//   //       </BuyersData>

//   //       {/* {related.length > 0 && (
//   //         <RelatedArticles>
//   //           <RelatedTitle>Puede que te interese</RelatedTitle>
//   //           <PreviewItemContainer>
//   //             <>
//   //               {related.map((article) => (
//   //                 <PreviewItem
//   //                   key={article.articulo_id}
//   //                   {...article}
//   //                   isRelated={true}
//   //                 />
//   //               ))}
//   //             </>
//   //           </PreviewItemContainer>
//   //         </RelatedArticles>
//   //       )} */}
//   //     </MainStiled>
//   //     {modalOpen && (
//   //       <Alert
//   //         isOpen={modalOpen}
//   //         handleClose={setModalOpen}
//   //         cart={myCart}
//   //         zipCode={zipCode}
//   //       />
//   //     )}
//   //   </>
//   // );
// // };

// // const mapStateToProps = (state) => {
// //   return {
// //     carIsEmpty: state.carIsEmpty,
// //     myCart: state.myCart,
// //     carIsOpen: state.carIsOpen,
// //     shoppingCartPrices: state.shoppingCartPrices,
// //     shippingCost: state.shippingCost,
// //     purchasingData: state.purchasingData,
// //   };
// // };

// // const mapDispatchToProps = {
// //   setOpenCart,
// //   setCloseCart,
// //   setPurchasingData,
// // };

// // export default connect(mapStateToProps, mapDispatchToProps)(MakePayment);
