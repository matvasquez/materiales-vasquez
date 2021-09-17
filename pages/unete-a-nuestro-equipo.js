import React, { useRef } from "react";
import Head from "next/head";
// import { sendEmail } from "../utils/sendEmail";

// Styled-Components
import {
  MainStiled,
  MainTitle,
  TextContainer,
  Text,
  Form,
  InputBase,
  Span,
  Experience,
  Curriculum,
  Notification,
  Send,
} from "../styles/unete-a-nuestro-equipo/style";

const Jobs = () => {
  const formJob = useRef(null);
  const inputFile = useRef(null);

  const handleChange = (e) => {
    console.log(e.target.value);
    console.log(inputFile.current);
    console.log(inputFile.current.files[0]);
  };

  const sendEmail = async (body) => {
    const bodyOfMessageToClient = {
      receiver: body.email,
      subject: "Interesado en unirse al equipo",
    };

    fetch(`/api/send-email`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(bodyOfMessageToClient),
    })
      .then((response) => response.json())
      .then(({ ok }) => {
        console.log(ok);
      })
      .catch((error) => {
        console.log("ERROR: ", error);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newJobApplication = new FormData(formJob.current);
    const aplication = {
      name: newJobApplication.get("name"),
      email: newJobApplication.get("email"),
      age: newJobApplication.get("age"),
      address: newJobApplication.get("address"),
      interest: newJobApplication.get("interest"),
      office: newJobApplication.get("office"),
      experience: newJobApplication.get("experience"),
      curriculum: newJobApplication.get("Curriculum"),
    };
    console.log(aplication);
    sendEmail(aplication);
  };

  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1"
        />
        <title>Unete a Nuestro Equipo | Materiales Vasquez Hermanos</title>
      </Head>
      <MainStiled>
        <MainTitle>Unete a Nuestro Equipo</MainTitle>
        <TextContainer>
          <Text>
            En Materiales Vasquez Hermanos tenemos como objetivo reclutar,
            seleccionar y tener el mejor talento. Sabemos que la clave del éxito
            de la compañía son las personas y por ello buscamos formar un equipo
            humano cualificado, diversificado y motivado que contribuya a lograr
            las metas del negocio.
          </Text>
          <Text>Mandanos tus datos</Text>
        </TextContainer>
        <Form ref={formJob} onSubmit={(e) => handleSubmit(e)}>
          <InputBase
            type="text"
            name="name"
            placeholder="Tu Nombre completo"
            maxLength="30"
            // required
          />
          {/* <InputBase
            type="text"
            name="lastName"
            placeholder="Apellidos"
            maxLength="50"
          /> */}
          <InputBase
            type="email"
            name="email"
            placeholder="Tu correo electrónico"
            // required
          />
          <InputBase
            type="text"
            name="age"
            inputMode="numeric"
            placeholder="Edad"
            maxLength="2"
            // required
          />
          <InputBase
            type="text"
            name="address"
            placeholder="Domicilio"
            maxLength="100"
          />
          <InputBase
            type="text"
            name="interest"
            placeholder="Área de interés"
            maxLength="50"
            // required
          />
          <InputBase
            type="text"
            name="office"
            placeholder="Oficina de interés"
            maxLength="50"
          />
          <Experience
            name="experience"
            placeholder="Experiencia profesional"
            maxLength="500"
          ></Experience>
          <Text>
            Curriculum Vitae <Span>(máximo 3 mb)</Span>
          </Text>
          <Curriculum
            type="file"
            name="Curriculum"
            accept="application/pdf"
            ref={inputFile}
            onChange={(e) => handleChange(e)}
          />
          <Notification>
            Al enviar tu información aceptas nuestro Aviso de privacidad.
          </Notification>
          <Send type="submit">Enviar solicitud</Send>
        </Form>
      </MainStiled>
    </>
  );
};

export default Jobs;
