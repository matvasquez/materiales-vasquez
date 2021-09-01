import React from "react";

// Styled-Components
import { ItemContainer, ImageContainer, Text, Total, Price } from "./style";

const formatter = new Intl.NumberFormat("en-US", {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

const PaymentItemPreview = ({ name, price, image_url, initialQuantity }) => {
  return (
    <ItemContainer>
      <ImageContainer>
        <img
          src={`data:image/jpeg;base64,${image_url}`}
          width={300}
          height={300}
          alt={`Fotografía de ${name}`}
        />
      </ImageContainer>
      <Text>{name}</Text>
      <Text style={{ textAlign: "center" }}>x{initialQuantity}</Text>
      <div>
        <Total>${formatter.format(price * initialQuantity)}</Total>
        {initialQuantity > 1 && <Price>${formatter.format(price)}</Price>}
      </div>
    </ItemContainer>
  );
};

export default PaymentItemPreview;
