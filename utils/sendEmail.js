//const nodemailer = require("nodemailer");

async function main(body) {
  console.log("Ejecución de main");
  window
    .fetch("https://api-vasquez.herokuapp.com/api/send-email", {
      // .fetch("http://localhost:3015/api/send-email", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: body,
    })
    .then((response) => response.json())
    .then(({ name }) => {
      console.log(name);
    })
    .catch((error) => {
      console.log("ERROR: ", error);
    });
}

export function sendEmail(body) {
  main(JSON.stringify(body)).catch((error) =>
    console.log("sendEmail error: ", error)
  );
}
