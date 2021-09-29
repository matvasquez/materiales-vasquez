import React, { useRef, useState, useEffect } from "react";
import { connect } from "react-redux";
import { setUpdateCart } from "../../actions";
import { useSession } from "next-auth/client";
import Link from "next/link";
import { useRouter } from "next/router";

// Components
import CarItemPreview from "../Car-Item-Preview/CarItemPreview";
import { CornerLeft } from "../IconsSVG/CornerLeft";
import { CornerRight } from "../IconsSVG/CornerRight";

// Styled-Components
import {
  ShoppingCartStyled,
  CornerLeftContainer,
  CornerRightContainer,
  CartPreview,
  OpenCloseButton,
  Title,
  CartItemsOpen,
  Totals,
  CarItemCounter,
  ApllyPromoCodeButton,
  NumberOfItems,
  PromoCodeInput,
  PromoCodeButton,
  DetailsPrice,
  SubPrice,
  TotalText,
  TotalPrice,
  BuyButtonContainer,
  BuyButton,
  FreeShippingText,
  Counter,
  ItemsContainer,
  ContainerScroll,
  Background,
} from "./style";

const ShoppingCart = (props) => {
  const { setUpdateCart, shoppingCartPrices, myCart } = props;

  const cart = useRef(false);
  const [subTotal, setSubTotal] = useState(0);
  const [changeCart, setChangeCart] = useState(false);
  const { pathname } = useRouter();
  const [session, loading] = useSession();
  //
  const [carIsEmpty, setCarIsEmpty] = useState(false);
  const [carIsOpen, setCarIsOpen] = useState(false);

  useEffect(() => {
    myCart.length > 0 ? setCarIsEmpty(true) : setCarIsEmpty(false);
  }, [myCart]);

  // Previene el scroll al abrir el carrtio de compras
  useEffect(() => {
    if (carIsOpen) {
      document.body.style.position = "fixed";
    } else {
      document.body.style.position = "initial";
    }
  }, [carIsOpen]);

  // Abre y cierra el carrito de compras
  const handleSetOpen = () => {
    setCarIsOpen(!carIsOpen);
  };

  // Dispara el evento de abrir o cerrar el carrtio
  // dependiendo el swipe que se realize
  const handleTouchMove = (e) => {
    handleSetOpen();
  };

  useEffect(() => {
    if (myCart.length === 1) {
      setChangeCart(true);
    } else {
      setChangeCart(false);
    }
  }, [myCart]);

  useEffect(() => {
    if (shoppingCartPrices.length > 0) {
      setSubTotal(
        shoppingCartPrices.reduce(
          (accumulator, currentValue) => accumulator + currentValue
        )
      );
    }
  }, [shoppingCartPrices]);

  const handleUpdateQuantity = (id, quantity) => {
    // Reemplaza el la cantidad del producto por la sleccionada
    // Se guarda en localStorage
    const newCart = myCart.map((element) => {
      if (element.articulo_id === id) {
        element.initialQuantity = parseFloat(quantity);
      }
      return element;
    });
    setUpdateCart(newCart);
  };

  const formatter = new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  return (
    <>
      <ShoppingCartStyled
        ref={cart}
        onTouchMove={(e) => handleTouchMove(e)}
        carIsOpen={carIsOpen}
        hide={pathname === "/registro-de-usuario" && true}
      >
        <CornerLeftContainer>
          <CornerLeft />
        </CornerLeftContainer>
        <CornerRightContainer>
          <CornerRight />
        </CornerRightContainer>
        <OpenCloseButton
          type="button"
          carIsOpen={carIsOpen}
          onClick={handleSetOpen}
        >
          {!carIsOpen && "Abrir"}
        </OpenCloseButton>
        <Title carIsOpen={carIsOpen}>Carrito</Title>
        {carIsOpen ? (
          <>
            <CartItemsOpen carIsOpen={carIsOpen}>
              {myCart &&
                myCart.map((item) => (
                  <CarItemPreview
                    key={item.name}
                    {...item}
                    handleUpdateQuantity={handleUpdateQuantity}
                    carIsOpen={carIsOpen}
                    changeCart={changeCart}
                    closeCart={handleSetOpen}
                  />
                ))}
            </CartItemsOpen>
            <Totals>
              <ApllyPromoCodeButton>
                <PromoCodeInput type="text" placeholder="Código de cupón" />
                <PromoCodeButton type="button">Aplicar</PromoCodeButton>
              </ApllyPromoCodeButton>
              <NumberOfItems>
                Tienes {myCart.length} diferentes artículos en tu carrito
              </NumberOfItems>
              <DetailsPrice>
                <p>Subtotal</p>
                <SubPrice>${formatter.format(subTotal)}</SubPrice>
              </DetailsPrice>
              <DetailsPrice>
                <p>Envío</p>
                <SubPrice>
                  {subTotal > 200
                    ? "Envío gratis*"
                    : `$${formatter.format(50)}`}
                </SubPrice>
              </DetailsPrice>
              <DetailsPrice className="DetailTotal">
                <TotalText>Total</TotalText>
                <TotalPrice>
                  {subTotal > 200
                    ? `$${formatter.format(subTotal)}`
                    : `$${formatter.format(subTotal + 50)}`}
                </TotalPrice>
              </DetailsPrice>
              <BuyButtonContainer>
                <Link
                  // href={session ? "/realizar-pago" : "/registro-de-usuario"}
                  href="/realizar-pago"
                  passHref
                >
                  <BuyButton>Continuar</BuyButton>
                </Link>
              </BuyButtonContainer>
              <FreeShippingText>
                Envío gratis dentro de Xalapa a partir de $200
              </FreeShippingText>
            </Totals>
          </>
        ) : (
          <CartPreview onTouchMove={(e) => handleTouchMove(e)}>
            <ItemsContainer>
              <ContainerScroll>
                {myCart &&
                  myCart.map((item) => (
                    <CarItemPreview key={item.articulo_id} {...item} />
                  ))}
              </ContainerScroll>
            </ItemsContainer>
            <CarItemCounter carIsEmpty={carIsEmpty}>
              <Counter>{myCart.length}</Counter>
            </CarItemCounter>
          </CartPreview>
        )}
      </ShoppingCartStyled>
      <Background carIsOpen={carIsOpen} />
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    myCart: state.myCart,
    shoppingCartPrices: state.shoppingCartPrices,
  };
};

const mapDispatchToProps = {
  setUpdateCart,
};

export default connect(mapStateToProps, mapDispatchToProps)(ShoppingCart);
