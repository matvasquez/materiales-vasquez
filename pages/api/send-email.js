// import Cors from "cors";
// import initMiddleware from "../../lib/init-middleware";

// const cors = initMiddleware(
//   Cors({
//     methods: ["POST"],
//   })
// );

// const rest = new (require("rest-mssql-nodejs"))({
//   user: process.env.NEXT_PUBLIC_USER,
//   password: process.env.NEXT_PUBLIC_PASSWORD,
//   server: process.env.NEXT_PUBLIC_HOST,
//   database: process.env.NEXT_PUBLIC_DATABASE,
// });

import nodemailer from "nodemailer";

export default async function sentEmail(req, res) {
  if (req.method !== "POST") {
    res
      .status(500)
      .json({ message: "Lo sentimos, sólo aceptamos solicitudes POST" });
  }

  console.log("req.body: ", req.body);
  console.log("NEXT_PUBLIC_MAIL_HOST: ", process.env.NEXT_PUBLIC_MAIL_HOST);
  console.log(
    "NEXT_PUBLIC_MAIL_PASSWORD: ",
    process.env.NEXT_PUBLIC_MAIL_PASSWORD
  );

  const messageReceiver = req.body.receiver;
  const messageSubject = req.body.subject;
  const messageHtml = req.body.html;

  const transporter = nodemailer.createTransport({
    host: process.env.NEXT_PUBLIC_MAIL_HOST,
    port: 587,
    secure: false, // true para 465, false para otros puertos
    auth: {
      user: process.env.NEXT_PUBLIC_MAIL_SMTP, // generated ethereal user
      pass: process.env.NEXT_PUBLIC_MAIL_PASSWORD, // generated ethereal password
    },
  });

  // matvasquezh@gmail.com,

  const info = await transporter.sendMail({
    from: process.env.NEXT_PUBLIC_MAIL_SMTP, // dirección del remitente
    to: messageReceiver, // lista de receivers
    subject: messageSubject, // Asunto
    html: messageHtml, // html body
  });

  transporter
    .verify()
    .then(() => {
      console.log("Message sent: ", info.messageId);
    })
    .catch((err) => console.log("Error sending message: ", err));

  res.status(200).json({
    ok: "Send Email",
    message: info.messageId,
  });
}
