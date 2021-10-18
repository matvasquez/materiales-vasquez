import React, { useEffect, useState, useRef } from "react";
import { connect } from "react-redux";
import {
  setUpdatePrices,
  setRemovedFromCart,
  setCloseCart,
  setEmptyCart,
} from "../../actions";
import Link from "next/link";
import { useGetStock } from "../../hooks/useGetStock";

// Components
import { Seeking } from "../Loaders/Seeking";

// Styled-Components
import {
  ItemConatiner,
  CartItem,
  ImageContainer,
  ImageItem,
  SelectContainer,
  SelectValue,
  SelectStyled,
  NameContainer,
  Name,
  PriceContainer,
  PriceTotal,
  Price,
  SpanPrice,
} from "./style";

const CarItemPreview = ({
  articulo_id,
  name,
  price,
  image_url,
  initialQuantity,

  closeCart,

  changeCart,
  carIsOpen,

  handleUpdateQuantity,
  shoppingCartPrices,
  setUpdatePrices,
  setRemovedFromCart,
  setEmptyCart,
}) => {
  const selectQ = useRef(null);
  const [quantityInInventory, setQuantityInInventory] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [totalPrice, setTotalPrice] = useState(0);
  const [stock] = useGetStock(articulo_id);

  // El precio del producto, multiplicado por la cantidad
  useEffect(() => {
    setTotalPrice(parseFloat(price) * quantity);
  }, [price, quantity]);

  // Crea las opciones de cantidad que se puede seleccionar
  // de acuero al inventario real en tienda
  // añade como ultima opcion "Eliminar"
  const generateOptions = (max) => {
    setQuantityInInventory([]);
    for (let i = 1; i <= stock && i <= max; i++) {
      setQuantityInInventory((quantityInInventory) => [
        ...quantityInInventory,
        i,
      ]);
    }
    setQuantityInInventory((quantityInInventory) => [
      ...quantityInInventory,
      "Eliminar",
    ]);
  };

  useEffect(() => {
    if (stock) {
      if (stock > 50 && stock <= 100) {
        generateOptions(60);
      } else {
        generateOptions(20);
      }
    }
  }, [stock]);

  // Captura la cantidad de el mismo producto
  useEffect(() => {
    setQuantity(initialQuantity);
  }, [initialQuantity]);

  // Actualiza el array con los precios, para aplicar un reduce y optener el total
  const updateListPrices = (selected, totalPrice) => {
    if (shoppingCartPrices.includes(parseFloat(totalPrice))) {
      const newsPrices = shoppingCartPrices.map((element) => {
        if (element === parseFloat(totalPrice)) {
          element = parseFloat(price) * selected;
        }
        return element;
      });

      setUpdatePrices(newsPrices);
    }
  };

  const handleChange = () => {
    // Optiene el valor del select (la cantidad de prosuctos seleccionados)
    const selected = selectQ.current.value;

    // Verifica si la ioción seleccionada es "Eliminar"
    if (selected === "Eliminar") {
      // Verifica si es el ultimo elemento del carrito
      if (changeCart) {
        // Vacia el carrito
        setEmptyCart();
      }
      // Remueve el elemento seleccionado del carrito
      setRemovedFromCart(articulo_id);

      // Verifica que el precio este en la lista de precios (la cuenta de todos los precios)
      if (shoppingCartPrices.includes(parseFloat(totalPrice))) {
        // Si esta en la lista lo elimina
        const newsPrices = shoppingCartPrices.filter(
          (element) => element !== parseFloat(totalPrice)
        );

        setUpdatePrices(newsPrices);
      }
    } else {
      // Si no está lo agrega
      setQuantity(parseFloat(selected));
      updateListPrices(selected, parseFloat(totalPrice));
      handleUpdateQuantity(articulo_id, parseFloat(selected));
    }
  };

  const formatter = new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  return (
    <>
      {carIsOpen ? (
        <CartItem>
          <ImageContainer>
            <Link href={`/detalles/${articulo_id}`} passHref>
              <ImageItem aria-label={`Ver detalles de ${name}`}>
                <img
                  src={`data:image/jpg;base64,${image_url}`}
                  width={200}
                  height={200}
                  alt={`Fotografía de ${name}`}
                />
              </ImageItem>
            </Link>
          </ImageContainer>
          <SelectContainer>
            {quantityInInventory.length > 0 ? (
              <>
                <SelectValue>{initialQuantity}</SelectValue>
                <SelectStyled ref={selectQ} onChange={(e) => handleChange(e)}>
                  {quantityInInventory.map((value, i) => (
                    <option
                      selected={i === 0 ? true : quantity === i + 1 && true}
                      key={value * parseFloat(price)}
                      value={value}
                    >
                      {value}
                    </option>
                  ))}
                </SelectStyled>
              </>
            ) : (
              <div>
                <Seeking bg={true} />
              </div>
            )}
          </SelectContainer>
          <NameContainer onClick={closeCart}>
            <Link
              href={`/detalles/${articulo_id
                .replace(/ /gi, "space")
                .replace(/\//gi, "slash")}`}
              passHref
            >
              <Name>{name.toLowerCase()}</Name>
            </Link>
          </NameContainer>
          <PriceContainer>
            {quantity > 1 ? (
              <>
                <PriceTotal>${formatter.format(totalPrice)}</PriceTotal>
                <Price>
                  <SpanPrice>c/u</SpanPrice> ${formatter.format(price)}
                </Price>
              </>
            ) : (
              <PriceTotal>${formatter.format(price)}</PriceTotal>
            )}
          </PriceContainer>
        </CartItem>
      ) : (
        <ItemConatiner>
          <img
            src={`data:image/jpg;base64,${image_url}`}
            width={200}
            height={200}
            alt={`Fotografía de ${name}`}
          />
        </ItemConatiner>
      )}
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    shoppingCartPrices: state.shoppingCartPrices,
    myCart: state.myCart,
  };
};

const mapDispatchToProps = {
  setUpdatePrices,
  setRemovedFromCart,
  setCloseCart,
  setEmptyCart,
};

export default connect(mapStateToProps, mapDispatchToProps)(CarItemPreview);
