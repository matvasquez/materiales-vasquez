import { useState, useEffect } from "react";

// Data
import { cfdis } from "../../database/cfdis";

// Styled Components
import {
  Form,
  Fieldset,
  Legend,
  InputBase,
  InputMail,
  Report,
  InputRfc,
  Select,
  Textarea,
  PickUpButton,
  PickUpConatiner,
  PickUpLink,
  SubmitButton,
} from "./style";

const CheckoutForm = ({ cities, paymentForm, handleSubmit }) => {
  const [pickUp, setPickUp] = useState(false);
  const [activeSubmit, setActiveSubmit] = useState(false);
  const [required, setRequired] = useState(true);

  // Estados de todos los inputs
  const [shippingName, setShippingName] = useState("");
  const [shippingLastName, setShippingLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [shippingEmail, setShippingEmail] = useState("");
  const [verifyEmail, setVerifyEmail] = useState("");

  const [addressState, setAddressState] = useState("");
  const [addressCP, setAddressCP] = useState("");
  const [addressCity, setaddressCity] = useState(cities);
  const [addressSubdivision, setAddressSubdivision] = useState("");
  const [addressStreet, setAddressStreet] = useState("");
  const [addressNumber, setAddressNumber] = useState("");
  const [referencesText, setReferencesText] = useState("");

  const [invoiceRFC, setInvoiceRFC] = useState("");
  const [invoiceCompanyName, setInvoiceCompanyName] = useState("");
  const [invoicePhoneNumber, setInvoicePhoneNumber] = useState("");
  const [invoiceShippingEmail, setInvoiceShippingEmail] = useState("");
  const [cfdi, setCfdi] = useState(cfdis);

  //   console.log("shippingName: ", shippingName);
  //   console.log("shippingLastName: ", shippingLastName);
  //   console.log("phoneNumber: ", phoneNumber);
  //   console.log("shippingEmail: ", shippingEmail);
  //   console.log("verifyEmail: ", verifyEmail);
  //   console.log("addressState: ", addressState);
  //   console.log("addressCP: ", addressCP);
  //   console.log("addressCity: ", addressCity);
  //   console.log("addressSubdivision: ", addressSubdivision);
  //   console.log("addressStreet: ", addressStreet);
  //   console.log("addressNumber: ", addressNumber);
  //   console.log("referencesText: ", referencesText);
  //   console.log("invoiceRFC: ", invoiceRFC);
  //   console.log("invoiceCompanyName: ", invoiceCompanyName);
  //   console.log("invoicePhoneNumber: ", invoicePhoneNumber);
  //   console.log("invoiceShippingEmail: ", invoiceShippingEmail);
  //   console.log("cfdi: ", cfdi);

  useEffect(() => {
    if (
      shippingName.length > 3 &&
      shippingLastName.length > 3 &&
      phoneNumber.length > 3 &&
      shippingEmail.length > 3 &&
      verifyEmail.length > 3
    ) {
      if (!pickUp) {
        if (
          addressState.length > 3 &&
          addressCP.length > 4 &&
          addressSubdivision.length > 3 &&
          addressStreet.length > 3 &&
          addressNumber !== "" &&
          referencesText.length > 3
        ) {
          setActiveSubmit(true);
        }
      } else {
        setActiveSubmit(true);
      }
    } else {
      setActiveSubmit(false);
    }
  }, [
    shippingName,
    shippingLastName,
    phoneNumber,
    shippingEmail,
    verifyEmail,
    addressState,
    addressCP,
    addressCity,
    addressSubdivision,
    addressStreet,
    addressNumber,
    referencesText,
  ]);

  //   console.log("activeSubmit: ", activeSubmit);

  return (
    <Form ref={paymentForm} onSubmit={handleSubmit} autoComplete="off">
      <Fieldset>
        <Legend>¿A quién se lo enviamos?</Legend>
        <InputBase
          type="text"
          name="shippingName"
          placeholder={`Nombre/s ${required && "*"}`}
          maxLength="30"
          value={shippingName}
          onChange={(e) => setShippingName(e.target.value.toString())}
        />
        <InputBase
          type="text"
          name="shippingLastName"
          placeholder={`Apellidos ${required && "*"}`}
          maxLength="30"
          value={shippingLastName}
          onChange={(e) => setShippingLastName(e.target.value.toString())}
        />
        <InputBase
          type="tel"
          inputMode="numeric"
          name="phoneNumber"
          placeholder={`Numero de teléfono ${required && "*"}`}
          maxLength="10"
          pattern="[0-9]{10}"
          value={phoneNumber}
          onChange={(e) =>
            setPhoneNumber(e.target.value.replace(/\D/g, "").trim())
          }
        />
        <InputMail
          type="email"
          name="shippingEmail"
          placeholder={`Correo Electrónico ${required && "*"}`}
          maxLength="30"
          value={shippingEmail}
          onChange={(e) => setShippingEmail(e.target.value.toString())}
        />
        <InputMail
          type="email"
          name="verifyEmail"
          placeholder={`Verifica el Correo Electrónico ${required && "*"}`}
          maxLength="30"
          value={verifyEmail}
          onChange={(e) => setVerifyEmail(e.target.value.toString())}
        />
        <Report>A este correo se enviará su comprobante de compra</Report>
      </Fieldset>
      <Fieldset>
        <Legend>¿A dónde lo enviamos?</Legend>
        <PickUpButton type="button" onClick={() => setPickUp(!pickUp)}>
          Prefiero recogerlo en tienda
        </PickUpButton>
        {!pickUp ? (
          <>
            <InputBase
              type="text"
              name="addressState"
              placeholder={`Estado ${!pickUp && "*"}`}
              maxLength="30"
              value={addressState}
              onChange={(e) => setAddressState(e.target.value.toString())}
            />
            <Select
              name="addressCity"
              defaultValue="Xalapa"
              onChange={(e) => setaddressCity(e.target.value)}
            >
              {cities.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </Select>
            <InputBase
              type="text"
              inputMode="numeric"
              name="addressCP"
              placeholder={`Código Postal ${!pickUp && "*"}`}
              maxLength="7"
              value={addressCP}
              onChange={(e) =>
                setAddressCP(e.target.value.replace(/\D/g, "").trim())
              }
            />
            <InputBase
              type="text"
              name="addressSubdivision"
              placeholder={`Fraccionamiento ${!pickUp && "*"}`}
              maxLength="40"
              value={addressSubdivision}
              onChange={(e) => setAddressSubdivision(e.target.value.toString())}
            />
            <InputBase
              type="text"
              name="addressStreet"
              placeholder={`Calle ${!pickUp && "*"}`}
              maxLength="40"
              value={addressStreet}
              onChange={(e) => setAddressStreet(e.target.value.toString())}
            />
            <InputBase
              type="text"
              inputMode="numeric"
              name="addressNumber"
              placeholder={`Numero ${!pickUp && "*"}`}
              maxLength="4"
              value={addressNumber}
              onChange={(e) =>
                setAddressNumber(e.target.value.replace(/\D/g, "").trim())
              }
            />
            <Textarea
              name="referencesText"
              placeholder={`Referencias (Por favor proporciona detalles para encontrar tu domicilio) ${
                !pickUp && "*"
              }`}
              maxLength="350"
              value={referencesText}
              onChange={(e) => setReferencesText(e.target.value.toString())}
            />
          </>
        ) : (
          <PickUpConatiner>
            <p>
              Podrás recoger tu pedido en la sucursal{" "}
              <span>Lázaro Cárdenas</span>
            </p>
            <p>
              Av. Lázaro Cárdenas N.274 Col. Encinal c.p 91180 Xalapa, Veracruz
            </p>
            <PickUpLink
              href="https://goo.gl/maps/CS4JgsBKMByXvEHt5"
              target="_blank"
              rel="noopener noreferrer"
              itemProp="hasMap"
            >
              Ver ubicación
            </PickUpLink>
            <p>Nos pondremos en contacto contigo para coordinar tu entrega</p>

            <input type="hidden" name="addressState" readOnly />
            <input type="hidden" name="addressCP" readOnly />
            <input
              type="hidden"
              name="addressCity"
              value="Prefiero recogerlo en tienda"
              readOnly
            />
            <input type="hidden" name="addressStreet" readOnly />
            <input type="hidden" name="addressNumber" readOnly />
            <input
              type="hidden"
              name="referencesText"
              value="Prefiero recogerlo en tienda"
              readOnly
            />
          </PickUpConatiner>
        )}

        {/* <input type="hidden" name="addressState" value={""} readOnly /> */}
      </Fieldset>
      <Fieldset>
        <Legend>¿Requiere factura?</Legend>
        <InputRfc
          type="text"
          name="invoiceRFC"
          placeholder="RFC"
          maxLength="13"
          value={invoiceRFC}
          onChange={(e) => setInvoiceRFC(e.target.value.toString())}
        />
        <InputBase
          type="text"
          name="invoiceCompanyName"
          placeholder="Razón Social"
          maxLength="50"
          value={invoiceCompanyName}
          onChange={(e) => setInvoiceCompanyName(e.target.value.toString())}
        />
        <InputBase
          type="tel"
          inputMode="numeric"
          name="invoicePhoneNumber"
          placeholder="Numero de teléfono"
          maxLength="10"
          pattern="[0-9]{10}"
          value={invoicePhoneNumber}
          onChange={(e) =>
            setInvoicePhoneNumber(e.target.value.replace(/\D/g, "").trim())
          }
        />
        <InputMail
          type="email"
          name="invoiceShippingEmail"
          placeholder="Correo Electrónico"
          maxLength="30"
          value={invoiceShippingEmail}
          onChange={(e) => setInvoiceShippingEmail(e.target.value.toString())}
        />
        {cfdis.length && (
          <Select name="cfdi" onChange={(e) => setCfdi(e.target.value)}>
            {cfdis.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </Select>
        )}
      </Fieldset>
      {activeSubmit && <SubmitButton type="submit">Pagar</SubmitButton>}
    </Form>
  );
};

export default CheckoutForm;
