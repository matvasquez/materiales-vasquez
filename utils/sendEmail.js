//const nodemailer = require("nodemailer");

async function main(body) {
  window
    .fetch("/api/send-email", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
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
  main(JSON.stringify(body)).catch(console.error);
}
