import React from "react";

// Components
import { Smartphone } from "../IconsSVG/Smartphone";
import { Email } from "../IconsSVG/Email";
import { Location } from "../IconsSVG/Location";

// Styled-Components
import {
  SectionStyled,
  ImageContainer,
  Image,
  InfoContainer,
  Title,
  Span,
  PhoneContainer,
  Anchor,
  ButtonsContainer,
  AnchorButton,
} from "./style";

const Branch = ({
  branch,
  address,
  photo,
  phone,
  extent,
  email,
  hours,
  location,
}) => {
  return (
    <SectionStyled>
      <ImageContainer>
        <img src={photo} alt={`Fotografía de sucursal ${branch}`} />
      </ImageContainer>
      <InfoContainer>
        <Title>{branch}</Title>
        <p itemProp="address">{address}</p>
        <div>
          <p>Horario</p>
          <p itemProp="openingHours" content={`Mo-Fr ${hours[0]}-${hours[1]}`}>
            Lunes a Viernes de{" "}
            <Span>
              {hours[0]} a {hours[1]}
            </Span>
          </p>
          <p itemProp="openingHours" content={`Sa ${hours[0]}-${hours[2]}`}>
            Sábado de{" "}
            <Span>
              {hours[0]} a {hours[2]}
            </Span>
          </p>
          <p>Domingo: Cerrado</p>
        </div>
        <PhoneContainer>
          <Anchor
            href={`tel:+${phone}`}
            target="_blank"
            rel="noopener noreferrer"
            itemProp="telephone"
          >
            {phone}
          </Anchor>
          <p>
            Extent{" "}
            {extent
              .map((ext) => <span key={ext}>{ext}</span>)
              .reduce((prev, curr) => [prev, " - ", curr])}
          </p>
        </PhoneContainer>
        <ButtonsContainer>
          <AnchorButton
            href={`tel:${phone}`}
            target="_blank"
            rel="noopener noreferrer"
            itemProp="telephone"
          >
            <Smartphone width="2.2rem" />
          </AnchorButton>
          <AnchorButton
            href={`mailto:${email}?subject=Sitio%20Web&body=Hola%20me%20podr%C3%ADan%20dar%20m%C3%A1s%20informaci%C3%B3n%20sobre`}
            target="_blank"
            rel="noopener noreferrer"
            itemProp="email"
          >
            <Email width="2.2rem" />
          </AnchorButton>
          <AnchorButton
            href={location}
            target="_blank"
            rel="noopener noreferrer"
            itemProp="hasMap"
          >
            <Location width="2.2rem" />
          </AnchorButton>
        </ButtonsContainer>
      </InfoContainer>
    </SectionStyled>
  );
};

export default Branch;
