import React, { useState, useRef, useEffect } from "react";
import { connect } from "react-redux";
import { setOpenCart, setCloseCart, setPurchasingData } from "../../actions";
import { NextSeo, LocalBusinessJsonLd } from "next-seo";
import { useShippingCost } from "../../hooks/useShippingCost";
import { sendEmail } from "../../utils/sendEmail";
import fetch from "isomorphic-unfetch";
import debounce from "just-debounce-it";

// Components
import PaymentItemPreview from "../../components/Payment-Item-Preview/PaymentItemPreview";
import PreviewItem from "../../components/Preview-Item/PreviewItem";
import PasarelaDePagos from "../../components/Pasarela-de-pagos/PasarelaDePagos";

// Styled-Components
import {
  MainStiled,
  MainTitle,
  BuyersData,
  FormStyled,
  ShippingAddress,
  ShippingData,
  Subtitle,
  DataSubtitle,
  InputBase,
  ZipCode,
  InputSameName,
  PhoneNumber,
  InputEmail,
  ProofOfPurchase,
  References,
  SelectCity,
  Street,
  FreeShippingText,
  InvoiceQuestion,
  Invoice,
  InvoiceInput,
  ShippingInvoice,
  InputRFC,
  SelectCFDI,
  // BuyButton,
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
  const { myCart, setCloseCart, shoppingCartPrices, setPurchasingData } = props;

  const formatter = new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  const [subTotal, setSubTotal] = useState(0);
  const [shippingName, setShippingName] = useState("");
  const [city, setCity] = useState("Xalapa");
  const [zipCode, setZipCode] = useState("");
  const [shippingCost, setShippingCost] = useState(50);
  const [invoiceRequired, setInvoiceRequired] = useState(false);
  const paymentForm = useRef(null);
  const invoiceCheck = useRef(null);
  const [cost, deliveryCities] = useShippingCost(zipCode, subTotal);
  // Activa la animación de carga en el botón de Cargar más
  const [load, setLoad] = useState(false);

  const [related, setRelated] = useState([]);

  const formFiserv = useRef(null);

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

  const handleChange = (e, func) => {
    func(e);
  };

  // Solicita articulos relacionados por nombre
  useEffect(async () => {
    if (myCart.length > 0) {
      const responseRelatedByName = await fetch(
        `/api/related-by-name/${myCart[myCart.length - 1].name
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

    // console.log("elementArr: ", e.data.elementArr);

    const status = e.data.elementArr.filter(
      (element) => element.name === "status"
    );

    const code = e.data.elementArr.filter(
      (element) => element.name === "approval_code"
    );

    if (status[0].value === "APROBADO") {
      const newOrder = new FormData(paymentForm.current);
      const order = {
        date: new Intl.DateTimeFormat("es-MX", {
          dateStyle: "medium",
          timeStyle: "short",
        }).format(new Date()),

        orderNumber: e.data.elementArr[4].value,
        approvalCode: e.data.elementArr[14].value,
        purchaseAmount: e.data.elementArr[11].value,
        terminatedCard: e.data.elementArr[27].value.slice(-4),

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

        subTotal: subTotal,
        shippingCost: shippingCost,
        total: shippingCost + subTotal,

        products: myCart,
      };

      // console.log("order: ", order);
      setPurchasingData(order);

      // sendEmail(order);
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
    window.location.href = e.data.redirectURL;
  };

  // Código de pasarela de pagos
  function forwardForm(responseObj, elementArr) {
    var newForm = document.createElement("form");
    newForm.setAttribute("method", "post");
    newForm.setAttribute("action", "");
    // newForm.setAttribute("action", responseObj.redirectURL);
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
      // document.getElementById("newForm").appendChild(input);
    }
    // document.getElementById("newForm").submit();
  }

  // Limita el numero de llamados a las funciones de
  // enviar mail y cambiar de pagina
  const handlePurchase = debounce(async (e, elementArr) => {
    forwardForm(e.data, elementArr);
    handleSubmit(e);
  }, 3000);

  const receiveMessage = (e) => {
    if (e.origin != "https://test.ipg-online.com") {
      return;
    }
    let elementArr = e.data.elementArr;
    handlePurchase(e, elementArr);
  };

  useEffect(() => {
    window.addEventListener("message", (e) => receiveMessage(e), false);
    return () => {
      window.removeEventListener("message", (e) => receiveMessage(e), false);
    };
  }, ["message"]);

  return (
    <>
      <NextSeo
        title="Realizar Pago | Materiales Vasquez Hermanos"
        description={`Todo listo para adquirir tus ${myCart.length} artículos en el carrito`}
        canonical="https://www.materialesvasquezhnos.com.mx/realizar-pago"
        openGraph={{
          url: "https://www.materialesvasquezhnos.com.mx/realizar-pago",
          title: "Realizar Pago | Materiales Vasquez Hermanos",
          description: `Todo listo para adquirir tus ${myCart.length} artículos en el carrito`,
          images: [
            {
              url: "https://res.cloudinary.com/duibtuerj/image/upload/v1630083340/brand/meta-image_rcclee.jpg",
              width: 200,
              height: 200,
              alt: "Logotipo de Materiales Vasquez Hermanos",
            },
          ],
          site_name: "Materiales Vasquez Hermanos",
        }}
        twitter={{
          handle: "@MaterialesVH",
          site: "@MaterialesVH",
          cardType: "summary",
        }}
      />
      <LocalBusinessJsonLd
        type="HomeGoodsStore"
        name="Realizar Pago | Materiales Vasquez Hermanos"
        description={`Todo listo para adquirir tus ${myCart.length} artículos en el carrito`}
        url="https://www.materialesvasquezhnos.com.mx/realizar-pago"
        telephone="+522288401919"
        address={{
          streetAddress: "Lázaro Cárdenas 274",
          addressLocality: "Xalapa",
          addressRegion: "MEX",
          postalCode: "91180",
          addressCountry: "MX",
        }}
      />
      <MainStiled>
        <MainTitle>Realizar Pago</MainTitle>
        <div ref={formFiserv}></div>

        <BuyersData>
          <FormStyled
            ref={paymentForm}
            id="customerDataForm"
            onSubmit={handleSubmit}
          >
            <ShippingData>
              <DataSubtitle>¿A quién se lo enviamos?</DataSubtitle>
              <InputSameName
                type="text"
                name="shippingName"
                placeholder="Nombre/s"
                maxLength="30"
                value={shippingName}
                onChange={(e) => setShippingName(e.target.value)}
              />
              <InputSameName
                type="text"
                name="shippingLastName"
                placeholder="Apellidos"
                maxLength="30"
              />
              <PhoneNumber
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
              <InputBase
                type="text"
                name="addressState"
                placeholder="Estado"
                maxLength="30"
                required
              />
              <ZipCode
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
          </FormStyled>
          <PasarelaDePagos shippingCost={shippingCost} subTotal={subTotal} />
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
  setPurchasingData,
};

export default connect(mapStateToProps, mapDispatchToProps)(MakePayment);
