import React, { useState, useEffect } from "react";
import Image from "next/image";

// Components
import Modal from "../modal/modal";

// Styled Components
import { SectionText, SectionItems, Item, ImageConatiner } from "./style";

// Formatear precio
const formatter = new Intl.NumberFormat("en-US", {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

// Loader para componente Image
const loader = ({ src, width, quality }) => {
  return `${src}?w=${width}&q=${quality || 75}`;
};

const Alert = ({ isOpen, handleClose, cart, zipCode }) => {
  const [productsList, setProductsList] = useState([]);
  console.log("cart: ", cart);
  console.log("zipCode: ", zipCode);

  useEffect(() => {
    let ids = cart.map((item) => item.articulo_id);
    setProductsList(ids);
  }, [cart]);
  console.log("productsList: ", productsList);

  return (
    <Modal
      isOpen={isOpen}
      handleClose={handleClose}
      typeButton="button"
      click={handleClose}
      zipCode={zipCode}
      productsList={productsList}
    >
      <SectionText>
        <p>Lo sentimos, para poder enviarle a esa dirección postal,</p>
        <p>por favor comuníquese con nosotros</p>
      </SectionText>
      {cart && (
        <SectionItems>
          {cart.map((item) => (
            <Item key={item.articulo_id}>
              <p>{item.name}</p>
              <p>${formatter.format(item.price)}</p>
              <p>Cantidad: {item.initialQuantity}</p>
              <ImageConatiner>
                <Image
                  loader={loader}
                  src={`data:image/jpg;base64,${item.image_url}`}
                  width={80}
                  height={80}
                  alt={`Fotografía de ${item.name}`}
                  placeholder="blurDataURL"
                />
              </ImageConatiner>
            </Item>
          ))}
        </SectionItems>
      )}
    </Modal>
  );
};

export default Alert;
