import fetch from "isomorphic-unfetch";

const URL = `https://api-vasquez.herokuapp.com/api/send-email`;
// const URL = `http://localhost:3015/api/send-email`;

// const responseDetails = await fetch(URL, {
//   method: "POST",
//   headers: {
//     "Content-Type": "application/json",
//   },
//   body: encodeFormURL({ ...data, api_token: TOKEN, id: ID }),
// });
// const { data: product } = await responseDetails.json();

const main = async (body) => {
  console.log("Se envia");
  fetch(URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  })
    .then((response) => response.json())
    .then(({ ok }) => {
      console.log(ok);
    })
    .catch((error) => {
      console.log("ERROR: ", error);
    });
};

export const sendEmail = (order) => {
  const message = order;
  const bodyOfMessageToClient = {
    receiver: message.shippingEmail,
    subject: "Recibo de compra desde Materiales Vasquez Hermanos",
    html: `<!DOCTYPE html>
  <html>
  <head>
  <title></title>
  <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  <style type="text/css">
  /* CLIENT-SPECIFIC STYLES */
  body, table, td, a { -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; }
  table, td { mso-table-lspace: 0pt; mso-table-rspace: 0pt; }
  img { -ms-interpolation-mode: bicubic; }
  
  /* RESET STYLES */
  img { border: 0; height: auto; line-height: 100%; outline: none; text-decoration: none; }
  table { border-collapse: collapse !important; }
  body { height: 100% !important; margin: 0 !important; padding: 0 !important; width: 100% !important; }
  
  /* iOS BLUE LINKS */
  a[x-apple-data-detectors] {
      color: inherit !important;
      text-decoration: none !important;
      font-size: inherit !important;
      font-family: inherit !important;
      font-weight: inherit !important;
      line-height: inherit !important;
  }
  
  /* MEDIA QUERIES */
  @media screen and (max-width: 480px) {
      .mobile-hide {
          display: none !important;
      }
      .mobile-center {
          text-align: center !important;
      }
  }
  
  /* ANDROID CENTER FIX */
  div[style*="margin: 16px 0;"] { margin: 0 !important; }
  </style>
  </head>
  <body style="margin: 0 !important; padding: 0 !important; background-color: #e7e7e7;" bgcolor="#e7e7e7">
  
  <!-- TEXTO OCULTO DEL PREÁMBULO -->
  <div style="display: none; font-size: 1px; color: #00144c; line-height: 1px; font-family: Open Sans, Helvetica, Arial, sans-serif; max-height: 0px; max-width: 0px; opacity: 0; overflow: hidden;">
    Nueva compra desde E-commerce!
  </div>
  
  <table border="0" cellpadding="0" cellspacing="0" width="100%">
      <tr>
          <td align="center" style="background-color: #e7e7e7;" bgcolor="#e7e7e7">
          <!--[if (gte mso 9)|(IE)]>
          <table align="center" border="0" cellspacing="0" cellpadding="0" width="600">
          <tr>
          <td align="center" valign="top" width="600">
          <![endif]-->
          <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width:600px;">
              <tr>
                  <td align="center" valign="top" style="font-size:0; padding: 35px;" bgcolor="#ffffff">
                  <!--[if (gte mso 9)|(IE)]>
                  <table align="center" border="0" cellspacing="0" cellpadding="0" width="600">
                  <tr>
                  <td align="left" valign="top" width="300">
                  <![endif]-->
                  <div style="display:inline-block; min-width:100px; vertical-align:top; width:100%;">
                      <table align="left" border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #e7e7e7;" bgcolor="#e7e7e7">
                          <tr width="100%">
                              <td width="40%" align="left" valign="top" bgcolor="#ffffff" class="mobile-center">
                                  <a href="https://www.materialesvasquezhnos.com.mx/">
                                    <img
                                        style="width: 120px; margin: 0"
                                        src="https://www.materialesvasquezhnos.com.mx/wp-content/uploads/2020/09/Logo_Home_Center-02.png"
                                        alt="Logotipo de Materiales Vasquez Hermanos"
                                      />
                                  </a>
                              </td>
                              <td align="right" valign="top" bgcolor="#ffffff"" class="mobile-center">
                                  <table cellspacing="0" cellpadding="0" border="0" width="100%">
                                      <tr>
                                          <td width="60%" align="right" style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 14px; font-weight: 400; line-height: 16px; padding: 10px 5px; color: #00144c;">
                                              <a href="tel:2288401919"
                                              target="_blank"
                                              rel="noopener noreferrer"
                                              style="margin: 5px 0; color: #00144c; text-decoration: none; white-space: nowrap; cursor: pointer;"
                                              >Tel: (228) 8-40-19-19 Ext. 838 y 839</a>
                                              <a href="mailto:ventas.sucursal@grupovasquez.com.mx"
                                              target="_blank"
                                              rel="noopener noreferrer"
                                              style="margin: 5px 0; color: #00144c; text-decoration: none; white-space: nowrap; cursor: pointer;"
                                              >E-mail: ventas.sucursal@grupovasquez.com.mx</a>
                                          </td>
                                      </tr>
                                  </table>
                              </td>
                          </tr>
                      </table>
                  </div>
                  <!--[if (gte mso 9)|(IE)]>
                  </td>
                  </tr>
                  </table>
                  <![endif]-->
                  </td>
              </tr>
              <tr>
                  <td align="center" style="padding: 30px 20px; background-color: #e7e7e7;" bgcolor="#e7e7e7">
                  <!--[if (gte mso 9)|(IE)]>
                  <table align="center" border="0" cellspacing="0" cellpadding="0" width="600">
                  <tr>
                  <td align="center" valign="top" width="600">
                  <![endif]-->
                  <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width:600px;">
                      <tr>
                          <td align="left" style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 400; line-height: 24px; padding-top: 25px;">
                              <h3 style="font-size: 18px; font-weight: 800; line-height: 20px; color: #00144c; margin: 0;">
                                  Recibo de compra
                              </h3>
                          </td>
                      </tr>
  
                      </tr>
  
                      <tr>
                          <td align="center" valign="top" style="font-size:0; padding: 20px 0;" bgcolor="#e7e7e7">
                          <!--[if (gte mso 9)|(IE)]>
                          <table align="center" border="0" cellspacing="0" cellpadding="0" width="600">
                          <tr>
                          <td align="left" valign="top" width="300">
                          <![endif]-->
                          <div style="display:inline-block; min-width:100px; vertical-align:top; width:100%;">
                              <table align="left" border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #e7e7e7;" bgcolor="#e7e7e7">
                                  <tr width="70%">
                                      <td width="60%" align="left" style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 14px; font-weight: 600; line-height: 14px; padding: 5px 0; color: #00144c;">
                                          <p style="margin: 5px 0; color: #00144c; text-decoration: none; cursor: pointer;">${
                                            message.shippingName
                                          } ${message.shippingLastName}</p>
                                      </td>
                                      <td width="30%" align="right" style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 12px; font-weight: 400; line-height: 14px; padding: 5px 0; color: #00144c;">
                                          ${message.date
                                            .toLowerCase()
                                            .slice(0, -6)}
                                      </td>
                                  </tr>
                              </table>
                          </div>
                          <!--[if (gte mso 9)|(IE)]>
                          </td>
                          </tr>
                          </table>
                          <![endif]-->
                          </td>
                      </tr>
                      <tr>
                          <td>
                              <div width="100%" style="display:inline-block; min-width:100px; vertical-align:top; width:100%;">
                                  <table width="100%" align="left" border="0" cellpadding="0" cellspacing="0" width="100%" >
                                      <tr width="100%">
                                          <td width="50%" align="left" valign="top" class="mobile-center" style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 14px; font-weight: 600; border: 2px solid #00144c;">
                                              Nombre
                                          </td>
                                          <td width="25%" align="center" valign="top" class="mobile-center" style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 14px; font-weight: 600; border: 2px solid #00144c;">
                                              Cantidad
                                          </td>
                                          <td width="25%" align="right" valign="top" class="mobile-center" style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 14px; font-weight: 600; border: 2px solid #00144c;">
                                              Precio
                                          </td>
                                      </tr>
                                      ${message.products
                                        .map(
                                          (product) => `
                                            <tr width="100%">
                                              <td width="50%" align="left" valign="top" class="mobile-center" style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 12px; font-weight: 400; border: 2px solid #00144c;">
                                                  ${product.name.toLowerCase()}
                                              </td>
                                              <td width="25%" align="center" valign="top" class="mobile-center" style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 12px; font-weight: 400; border: 2px solid #00144c;">
                                                  ${product.initialQuantity}
                                              </td>
                                              <td width="25%" align="right" valign="top" class="mobile-center" style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 12px; font-weight: 400; border: 2px solid #00144c;">
                                                  $${product.price}
                                              </td>
                                          </tr>
                                          `
                                        )
                                        .join("")}
                                  </table>
                              </div>
                          </td>
                      </tr>
                      <tr>
                          <td>
                              <br>
                          </td>
                      </tr>
                      <tr>
                          <td>
                              <div width="100%" style="display:inline-block; min-width:100px; vertical-align:top; width:100%;">
                                  <table width="100%" align="left" border="0" cellpadding="0" cellspacing="0" width="100%" >
                                      <tr width="100%">
                                          <td width="50%" align="left" valign="top" class="mobile-center" style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 14px; font-weight: 600; border: 2px solid #00144c;">
                                              Subtotal
                                          </td>
                                          <td width="25%" align="center" valign="top" class="mobile-center" style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 14px; font-weight: 600; border: 2px solid #00144c;">
                                              $${message.subTotal}
                                          </td>
                                      </tr>
                                      <tr width="100%">
                                          <td width="50%" align="left" valign="top" class="mobile-center" style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 14px; font-weight: 600; border: 2px solid #00144c;">
                                              Costo de envío
                                          </td>
                                          <td width="25%" align="center" valign="top" class="mobile-center" style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 14px; font-weight: 600; border: 2px solid #00144c;">
                                              $${message.shippingCost}
                                          </td>
                                      </tr>
                                      <tr width="100%">
                                          <td width="50%" align="left" valign="top" class="mobile-center" style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 14px; font-weight: 600; border: 2px solid #00144c;">
                                              Método de pago
                                          </td>
                                          <td width="25%" align="center" valign="top" class="mobile-center" style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 14px; font-weight: 600; border: 2px solid #00144c;">
                                              Fiserv Gateway
                                          </td>
                                      </tr>
                                      <tr width="100%">
                                          <td width="50%" align="left" valign="top" class="mobile-center" style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 14px; font-weight: 600; border: 2px solid #00144c;">
                                              Total
                                          </td>
                                          <td width="25%" align="center" valign="top" class="mobile-center" style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 14px; font-weight: 600; border: 2px solid #00144c;">
                                              $${message.total}
                                          </td>
                                      </tr>
                                  </table>
                              </div>
                          </td>
                      </tr>
                      <tr>
                          <td>
                              <br>
                          </td>
                      </tr>
                      <tr>
                          <td>
                              <div width="100%" style="display:inline-block; min-width:100px; vertical-align:top; width:100%;">
                                  <table width="100%" align="left" border="0" cellpadding="0" cellspacing="0" width="100%" >
                                      <tr width="100%">
                                          <td width="100%" align="left" valign="top" class="mobile-center" style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 14px; font-weight: 600; border: 2px solid #00144c;">
                                              Dirección de envío
                                          </td>
                                      </tr>
                                      <tr width="100%">
                                          <td width="50%" align="left" valign="top" class="mobile-center" style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 14px; font-weight: 400; border: 2px solid #00144c;">
                                              Ciudad: ${message.addressCity} ${
      message.addressState
    }
                                          </td>
                                      </tr>
                                      <tr width="100%">
                                          <td width="50%" align="left" valign="top" class="mobile-center" style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 14px; font-weight: 400; border: 2px solid #00144c;">
                                              Calle y Numero: ${
                                                message.addressStreet
                                              } ${message.addressNumber}
                                          </td>
                                      </tr>
                                      <tr width="100%">
                                          <td width="50%" align="left" valign="top" class="mobile-center" style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 14px; font-weight: 400; border: 2px solid #00144c;">
                                              Código Postal: ${
                                                message.addressCP
                                              }
                                          </td>
                                      </tr>
                                      <tr width="100%">
                                          <td width="50%" align="left" valign="top" class="mobile-center" style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 14px; font-weight: 400; border: 2px solid #00144c;">
                                              Número de teléfono: ${
                                                message.phoneNumber
                                              }
                                          </td>
                                      </tr>
                                      <tr width="100%">
                                          <td width="50%" align="left" valign="top" class="mobile-center" style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 14px; font-weight: 400; border: 2px solid #00144c;">
                                              Correo Electrónico: ${
                                                message.shippingEmail
                                              }
                                          </td>
                                      </tr>
                                  </table>
                              </div>
                          </td>
                      </tr>
                      <tr>
                          <td>
                              <br>
                          </td>
                      </tr>
                      <tr>
                          <td>
                              <div width="100%" style="display:inline-block; min-width:100px; vertical-align:top; width:100%;">
                                  <table width="100%" align="left" border="0" cellpadding="0" cellspacing="0" width="100%" >
                                      ${
                                        message.invoiceRFC ===
                                        "No requiere Factura"
                                          ? `
                                          <tr width="100%">
                                              <td width="50%" align="left" valign="top" class="mobile-center" style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 14px; font-weight: 400; border: 2px solid #00144c;">
                                                  ${message.invoiceRFC}
                                              </td>
                                          </tr>
                                          `
                                          : `
                                            <tr width="100%">
                                              <td width="100%" align="left" valign="top" class="mobile-center" style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 14px; font-weight: 600; border: 2px solid #00144c;">
                                                  Dirección de facturación
                                              </td>
                                            </tr>
                                            <tr width="100%">
                                                <td width="50%" align="left" valign="top" class="mobile-center" style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 14px; font-weight: 400; border: 2px solid #00144c;">
                                                    RFC: ${message.invoiceRFC}
                                                </td>
                                            </tr>
                                            <tr width="100%">
                                                <td width="50%" align="left" valign="top" class="mobile-center" style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 14px; font-weight: 400; border: 2px solid #00144c;">
                                                    Razón Social: ${message.invoiceCompanyName}
                                                </td>
                                            </tr>
                                            <tr width="100%">
                                                <td width="50%" align="left" valign="top" class="mobile-center" style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 14px; font-weight: 400; border: 2px solid #00144c;">
                                                    CFDI: ${message.cfdi}
                                                </td>
                                            </tr>
                                            <tr width="100%">
                                                <td width="50%" align="left" valign="top" class="mobile-center" style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 14px; font-weight: 400; border: 2px solid #00144c;">
                                                    Número de teléfono: ${message.invoicePhoneNumber}
                                                </td>
                                            </tr>
                                            <tr width="100%">
                                                <td width="50%" align="left" valign="top" class="mobile-center" style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 14px; font-weight: 400; border: 2px solid #00144c;">
                                                    Correo Electrónico: ${message.invoiceShippingEmail}
                                                </td>
                                            </tr>
                                                `
                                      }
                                  </table>
                              </div>
                          </td>
                      </tr>
                  </table>
                  <!--[if (gte mso 9)|(IE)]>
                  </td>
                  </tr>
                  </table>
                  <![endif]-->
                  </td>
              </tr>
              
  
                  </table>
                  <!--[if (gte mso 9)|(IE)]>
                  </td>
                  </tr>
                  </table>
                  <![endif]-->
                  </td>
              </tr>
              <tr>
                  <td align="center" valign="top" style="font-size:0; padding: 20px;" bgcolor="#00144c">
                  <!--[if (gte mso 9)|(IE)]>
                  <table align="center" border="0" cellspacing="0" cellpadding="0" width="600">
                  <tr>
                  <td align="left" valign="top" width="300">
                  <![endif]-->
                  <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width:600px;">
                      <tr>
                          <td align="center" valign="top" style="font-size:0; padding: 20px;">
                              <div style="display:inline-block; min-width:100px; vertical-align:top; width:100%;">
                                  <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;" >
                                      <tr width="100%">
                                          <td width="100%" align="center" style="padding: 20px; font-family: Helvetica, Arial, sans-serif; font-size: 14px; font-weight: 400; line-height: 16px;" >
                                              <p style="margin: 0; color: #ffffff;">Gracias por comprar con nosotros <a href="https://www.materialesvasquezhnos.com.mx/" style="color: #ffc947; text-decoration: none; cursor: pointer;">materialesvasquezhnos.com.mx</a></p>
                                          </td>
                                      </tr>
                                      <tr width="100%">
                                          <td width="100%" bgcolor="#00144c" align="center" style="padding: 10px; font-family: Helvetica, Arial, sans-serif; font-size: 10px; font-weight: 400; line-height: 12px;" >
                                              <p style="margin: 0; color: #ffffff;">Materiales Vasquez Hermanos — Todos los derechos reservados.</p>
                                          </td>
                                      </tr>
                                  </table>
                              </div>
                          </td>
                      </tr>
                  </table>
                  <!--[if (gte mso 9)|(IE)]>
                  </td>
                  </tr>
                  </table>
                  <![endif]-->
                  </td>
              </tr>
          </table>
          <!--[if (gte mso 9)|(IE)]>
          </td>
          </tr>
          </table>
          <![endif]-->
          </td>
      </tr>
  </table>
  </body>
  </html>         
  `,
  };

  const bodyOfMessageToCompany = {
    receiver: `matvasquezh@gmail.com, ${process.env.NEXT_PUBLIC_MAIL_SMTP}`,
    subject: `Nueva compra desde E-commerce! ${message.date
      .toLowerCase()
      .slice(0, -6)}`,
    html: `<!DOCTYPE html>
  <html>
  <head>
  <title></title>
  <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  <style type="text/css">
  /* CLIENT-SPECIFIC STYLES */
  body, table, td, a { -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; }
  table, td { mso-table-lspace: 0pt; mso-table-rspace: 0pt; }
  img { -ms-interpolation-mode: bicubic; }
  
  /* RESET STYLES */
  img { border: 0; height: auto; line-height: 100%; outline: none; text-decoration: none; }
  table { border-collapse: collapse !important; }
  body { height: 100% !important; margin: 0 !important; padding: 0 !important; width: 100% !important; }
  
  /* iOS BLUE LINKS */
  a[x-apple-data-detectors] {
      color: inherit !important;
      text-decoration: none !important;
      font-size: inherit !important;
      font-family: inherit !important;
      font-weight: inherit !important;
      line-height: inherit !important;
  }
  
  /* MEDIA QUERIES */
  @media screen and (max-width: 480px) {
      .mobile-hide {
          display: none !important;
      }
      .mobile-center {
          text-align: center !important;
      }
  }
  
  /* ANDROID CENTER FIX */
  div[style*="margin: 16px 0;"] { margin: 0 !important; }
  </style>
  </head>
  <body style="margin: 0 !important; padding: 0 !important; background-color: #e7e7e7;" bgcolor="#e7e7e7">
  
  <!-- TEXTO OCULTO DEL PREÁMBULO -->
  <div style="display: none; font-size: 1px; color: #00144c; line-height: 1px; font-family: Open Sans, Helvetica, Arial, sans-serif; max-height: 0px; max-width: 0px; opacity: 0; overflow: hidden;">
    Nueva compra desde E-commerce!
  </div>
  
  <table border="0" cellpadding="0" cellspacing="0" width="100%">
      <tr>
          <td align="center" style="background-color: #e7e7e7;" bgcolor="#e7e7e7">
          <!--[if (gte mso 9)|(IE)]>
          <table align="center" border="0" cellspacing="0" cellpadding="0" width="600">
          <tr>
          <td align="center" valign="top" width="600">
          <![endif]-->
          <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width:600px;">
              <tr>
                  <td align="center" valign="top" style="font-size:0; padding: 35px;" bgcolor="#ffffff">
                  <!--[if (gte mso 9)|(IE)]>
                  <table align="center" border="0" cellspacing="0" cellpadding="0" width="600">
                  <tr>
                  <td align="left" valign="top" width="300">
                  <![endif]-->
                  <div style="display:inline-block; max-width:50%; min-width:100px; vertical-align:top; width:100%;">
                      <table align="left" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width:300px; background-color: #e7e7e7;" bgcolor="#e7e7e7"">
                          <tr>
                              <td align="center" valign="top" style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 36px; font-weight: 800; line-height: 48px; background-color: #ffffff;" bgcolor="#ffffff"" class="mobile-center">
                                  <a href="https://www.materialesvasquezhnos.com.mx/">
                                    <img
                                        style="width: 120px; margin: 0"
                                        src="https://www.materialesvasquezhnos.com.mx/wp-content/uploads/2020/09/Logo_Home_Center-02.png"
                                        alt="Logotipo de Materiales Vasquez Hermanos"
                                      />
                                  </a>
                              </td>
                          </tr>
                      </table>
                  </div>
                  <!--[if (gte mso 9)|(IE)]>
                  </td>
                  </tr>
                  </table>
                  <![endif]-->
                  </td>
              </tr>
              <tr>
                  <td align="center" style="padding: 30px 20px; background-color: #e7e7e7;" bgcolor="#e7e7e7">
                  <!--[if (gte mso 9)|(IE)]>
                  <table align="center" border="0" cellspacing="0" cellpadding="0" width="600">
                  <tr>
                  <td align="center" valign="top" width="600">
                  <![endif]-->
                  <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width:600px;">
                      <tr>
                          <td align="center" style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 400; line-height: 24px; padding-top: 25px;">
                              <h3 style="font-size: 18px; font-weight: 800; line-height: 20px; color: #00144c; margin: 0;">
                                  Nueva compra desde E-commerce! ${message.date
                                    .toLowerCase()
                                    .slice(0, -6)}
                              </h3>
                          </td>
                      </tr>
                      <tr>
                          <td align="left" style="padding-top: 20px;">
                              <table cellspacing="0" cellpadding="0" border="0" width="100%">
                                  <tr>
                                      <td width="100%" align="left" style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 800; line-height: 18px; padding: 10px 5px; color: #00144c;">
                                          Datos de contacto del comprador
                                      </td>
                                  </tr>
                                  <tr>
                                      <td width="100%" align="left" style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 14px; font-weight: 400; line-height: 16px; padding: 5px; color: #00144c;">
                                          <span style="font-size: 15px; font-weight: 600;">Nombre:</span> ${
                                            message.shippingName
                                          } ${message.shippingLastName}
                                      </td>
                                  </tr>
                                  <tr>
                                      <td width="100%" align="left" style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 14px; font-weight: 400; line-height: 16px; padding: 5px; color: #00144c;">
                                          <span style="font-size: 15px; font-weight: 600;">Email:</span> ${
                                            message.shippingEmail
                                          }
                                      </td>
                                  </tr>
                                  <tr>
                                      <td width="75%" align="left" style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 14px; font-weight: 400; line-height: 16px; padding: 5px; color: #00144c;">
                                          <span style="font-size: 15px; font-weight: 600;">Numero de telefono:</span> ${
                                            message.phoneNumber
                                          }
                                      </td>
                                  </tr>
                              </table>
                          </td>
                          
                          
                      </tr>
                  </table>
                  <!--[if (gte mso 9)|(IE)]>
                  </td>
                  </tr>
                  </table>
                  <![endif]-->
                  </td>
              </tr>
              
               <tr>
                  <td align="center" style="padding: 20px; background-color: #e7e7e7;" bgcolor="#e7e7e7">
                  <!--[if (gte mso 9)|(IE)]>
                  <table align="center" border="0" cellspacing="0" cellpadding="0" width="600">
                  <tr>
                  <td align="center" valign="top" width="600">
                  <![endif]-->
                  <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width:600px;">
                      <tr>
                          <td align="left" style="padding-top: 0;">
                              <table cellspacing="0" cellpadding="0" border="0" width="100%">
                                  <tr>
                                      <td width="100%" align="left" style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 800; line-height: 18px; padding: 10px 5px; color: #00144c;">
                                          Dirección Del Comprador
                                      </td>
                                  </tr>
                                  <tr>
                                      <td width="100%" align="left" style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 14px; font-weight: 400; line-height: 16px; padding: 5px; color: #00144c;">
                                          <span style="font-size: 16px; font-weight: 600;">Ciudad:</span> ${
                                            message.addressCity
                                          } ${message.addressState}
                                      </td>
                                  </tr>
                                  <tr>
                                      <td width="100%" align="left" style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 14px; font-weight: 400; line-height: 16px; padding: 5px; color: #00144c;">
                                          <span style="font-size: 16px; font-weight: 600;">Código Postal:</span> ${
                                            message.addressCP
                                          }
                                      </td>
                                  </tr>
                                  <tr>
                                      <td width="75%" align="left" style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 14px; font-weight: 400; line-height: 16px; padding: 5px; color: #00144c;">
                                          <span style="font-size: 16px; font-weight: 600;">Calle y Numero:</span> ${
                                            message.addressStreet
                                          } ${message.addressNumber}
                                      </td>
                                  </tr>
                              </table>
                          </td>
                          
                          
                      </tr>
                  </table>
                  <!--[if (gte mso 9)|(IE)]>
                  </td>
                  </tr>
                  </table>
                  <![endif]-->
                  </td>
              </tr>
              
              
               <tr>
                  <td align="center" height="100%" valign="top" width="100%" style="padding: 0 35px 35px 35px; background-color: #ffffff;" bgcolor="#ffffff">
                  <!--[if (gte mso 9)|(IE)]>
                  <table align="center" border="0" cellspacing="0" cellpadding="0" width="600">
                  <tr>
                  <td align="center" valign="top" width="600">
                  <![endif]-->
                  <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width:660px;">
                      <tr width="100%">
                          <td width="100%" align="center" valign="top" style="font-size:0;">
                              <!--[if (gte mso 9)|(IE)]>
                              <table align="center" border="0" cellspacing="0" cellpadding="0" width="600">
                              <tr>
                              <td align="left" valign="top" width="300">
                              <![endif]-->
                              <div style="display:inline-block; min-width:240px; vertical-align:top; width:100%;">
  
                                  <table align="left" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width:300px;">
                                      <tr>
                                          <td align="left" valign="top" style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 400; line-height: 18px;">
                                              <p style="font-weight: 800;">Referencias</p>
                                              <p align="left" style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 14px; font-weight: 400; line-height: 16px; padding: 5px; color: #00144c;">${
                                                message.addressReferences
                                              }</p>
  
                                          </td>
                                      </tr>
                                  </table>
                              </div>
                              <!--[if (gte mso 9)|(IE)]>
                              </td>
                              </tr>
                              </table>
                              <![endif]-->
                          </td>
                      </tr>
                  </table>
                  <!--[if (gte mso 9)|(IE)]>
                  </td>
                  </tr>
                  </table>
                  <![endif]-->
                  </td>
              </tr>
              <tr>
                  <td align="center" style=" padding: 20px; background-color: #00144c;" bgcolor="#00144c">
                  <!--[if (gte mso 9)|(IE)]>
                  <table align="center" border="0" cellspacing="0" cellpadding="0" width="600">
                  <tr>
                  <td align="center" valign="top" width="600">
                  <![endif]-->
                  <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width:600px;">
                      <tr>
                          <td align="center" style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 16px; font-weight: 400; line-height: 18px; padding-top: 10px;">
                              <h2 style="padding: 5px; font-size: 16px; font-weight: 800; line-height: 18px; text-align: left; color: #ffffff; margin: 0;">
                                  Costos
                              </h2>
                          </td>
                      </tr>
                      <tr>
                        <td width="100%" align="left" style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 14px; font-weight: 400; line-height: 16px; padding: 5px; color: #ffffff;">
                              <span style="font-size: 16px; font-weight: 600;">Subtotal:</span> $${
                                message.subTotal
                              }
                          </td>
                      </tr>
                      <tr>
                        <td width="100%" align="left" style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 14px; font-weight: 400; line-height: 16px; padding: 5px; color: #ffffff;">
                              <span style="font-size: 16px; font-weight: 600;">Costo de envío:</span> $${
                                message.shippingCost
                              }
                          </td>
                      </tr>
                       <tr>
                        <td width="100%" align="left" style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 14px; font-weight: 400; line-height: 16px; padding: 5px; color: #ffffff;">
                              <span style="font-size: 16px; font-weight: 600;">Total cobrado:</span> $${
                                message.total
                              }
                          </td>
                      </tr>
                  </table>
                  <!--[if (gte mso 9)|(IE)]>
                  </td>
                  </tr>
                  </table>
                  <![endif]-->
                  </td>
              </tr>
              <tr>
                  <td align="center" style="padding: 35px; background-color: #ffffff;" bgcolor="#ffffff">
                  <!--[if (gte mso 9)|(IE)]>
                  <table align="center" border="0" cellspacing="0" cellpadding="0" width="600">
                  <tr>
                  <td align="center" valign="top" width="600">
                  <![endif]-->
                  <table align="left" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width:600px;">
                      <tr>
                          <td align="center" style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 14px; font-weight: 400; line-height: 24px; padding: 0;">
                              <p style="font-size: 16px; font-weight: 800; line-height: 18px; color: #00144c;">
                                  ${message.requiredInvoice}
                              </p>
                          </td>
                      </tr>
                      <tr>
                           <td width="100%" align="left" style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 14px; font-weight: 400; line-height: 16px; padding: 5px 0; color: #00144c;">
                              <span style="font-size: 16px; font-weight: 600;">RFC:</span> ${
                                message.invoiceRFC
                              }
                          </td>
                      </tr>
                      <tr>
                           <td width="100%" align="left" style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 14px; font-weight: 400; line-height: 16px; padding: 5px 0; color: #00144c;">
                              <span style="font-size: 16px; font-weight: 600;">Razón Social:</span> ${
                                message.invoiceCompanyName
                              }
                          </td>
                      </tr>
                      <tr>
                           <td width="100%" align="left" style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 14px; font-weight: 400; line-height: 16px; padding: 5px 0; color: #00144c;">
                              <span style="font-size: 16px; font-weight: 600;">CFDI:</span> ${
                                message.cfdi
                              }
                          </td>
                      </tr>
                      <tr>
                           <td width="100%" align="left" style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 14px; font-weight: 400; line-height: 16px; padding: 5px 0; color: #00144c;">
                              <span style="font-size: 16px; font-weight: 600;">Número de teléfono:</span> ${
                                message.invoicePhoneNumber
                              }
                          </td>
                      </tr>
                      <tr>
                           <td width="100%" align="left" style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 14px; font-weight: 400; line-height: 16px; padding: 5px 0; color: #00144c;">
                              <span style="font-size: 16px; font-weight: 600;">Correo Electrónico:</span> ${
                                message.invoiceShippingEmail
                              }
                          </td>
                      </tr>
                  </table>
                  <!--[if (gte mso 9)|(IE)]>
                  </td>
                  </tr>
                  </table>
                  <![endif]-->
                  </td>
              </tr>
              <tr>
                  <td align="center" style="padding: 20px 10px; background-color: #ffffff;" bgcolor="#ffffff">
                  <!--[if (gte mso 9)|(IE)]>
                  <table align="center" border="0" cellspacing="0" cellpadding="0" width="600">
                  <tr>
                  <td align="center" valign="top" width="600">
                  <![endif]-->
                  <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width:600px;">
                      <tr>
                          <td align="center" style="font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 14px; font-weight: 400; line-height: 24px; padding: 5px 0 10px 0;">
                              <p style="font-size: 16px; font-weight: 800; line-height: 18px; color: #00144c;">
                                  Productos Comprados
                              </p>
                          </td>
                      </tr>
                      ${message.products
                        .map(
                          (product) => `
                      <tr align="center" border="0" cellpadding="1" cellspacing="1" width="100%" style="padding: 0; max-width:600px; background-color: #ffc947;" bgcolor="#ffc947">
                           <td width="100%" align="left" style="padding: 0 5px; font-family: Open Sans, Helvetica, Arial, sans-serif; font-size: 14px; font-weight: 400; line-height: 16px; color: #00144c;">
                               <p style="margin: 4px 0;" ><span style="font-size: 14px; font-weight: 600;">Nombre: </span> ${product.name.toLowerCase()}</p>
                               
                               <p style="margin: 4px 0;" ><span style="font-size: 14px; font-weight: 600;">Clave de artículo: </span> ${
                                 product.articulo_id
                               }</p>
                               
                               <p style="margin: 4px 0;" ><span style="font-size: 14px; font-weight: 600;">Precio unitario: </span> $${
                                 product.price
                               }</p>
                               
                               <p style="margin: 4px 0;" ><span style="font-size: 14px; font-weight: 600;">Cantidad: </span> ${
                                 product.initialQuantity
                               }</p>
                               
                          </td>
                      </tr>
                      <tr>
                          <td>
                            <br>
                          </td>
                      </tr>`
                        )
                        .join("")}
  
                  </table>
                  <!--[if (gte mso 9)|(IE)]>
                  </td>
                  </tr>
                  </table>
                  <![endif]-->
                  </td>
              </tr>
          </table>
          <!--[if (gte mso 9)|(IE)]>
          </td>
          </tr>
          </table>
          <![endif]-->
          </td>
      </tr>
  </table>
      <!-- LITMUS ATTRIBUTION -->
      <table border="0" cellpadding="0" cellspacing="0" width="100%">
          <tr>
              <td bgcolor="#ffffff" align="center">
                  <!--[if (gte mso 9)|(IE)]>
  <table align="center" border="0" cellspacing="0" cellpadding="0" width="600">
  <tr>
  <td align="center" valign="top" width="600">
  <![endif]-->
                  <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;" >
                      <tr>
                          <td bgcolor="#00144c" align="center" style="padding: 30px 30px 30px 30px; font-family: Helvetica, Arial, sans-serif; font-size: 14px; font-weight: 400; line-height: 18px;" >
                              <p style="margin: 0; color: #ffffff;">Este email se envió de forma automática desde <a href="https://www.materialesvasquezhnos.com.mx/" style="color: #ffc947; text-decoration: none; cursor: pointer;">materialesvasquezhnos.com.mx</a></p>
                          </td>
                      </tr>
                  </table>
                  <!--[if (gte mso 9)|(IE)]>
  </td>
  </tr>
  </table>
  <![endif]-->
              </td>
          </tr>
      </table>
  </body>
  </html>`,
  };

  main(bodyOfMessageToClient).catch((error) =>
    console.log("sendEmail error: ", error)
  );
  main(bodyOfMessageToCompany).catch((error) =>
    console.log("sendEmail error: ", error)
  );
};
