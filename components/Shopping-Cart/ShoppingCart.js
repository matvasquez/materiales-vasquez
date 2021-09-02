import React, { useRef, useState, useEffect } from "react";
import { connect } from "react-redux";
import { setOpenCart, setCloseCart, setUpdateCart } from "../../actions";
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
  const {
    carIsEmpty,
    setOpenCart,
    setUpdateCart,
    shoppingCartPrices,
    shippingCost,
    setCloseCart,
    myCart,
    carIsOpen,
  } = props;

  const cart = useRef(false);
  const [pocition, setPocition] = useState(0);
  const [subTotal, setSubTotal] = useState(0);
  const [total, setTotal] = useState(0);
  const [changeCart, setChangeCart] = useState(false);
  const { pathname } = useRouter();
  const [session, loading] = useSession();

  // Previene el scroll al abrir el carrtio de compras
  useEffect(() => {
    let x = window.scrollX;
    let y = window.scrollY;

    if (carIsOpen) {
      document.body.style.position = "fixed";
    } else {
      document.body.style.position = "initial";
    }
  }, [carIsOpen]);

  // Abre el carrito de compras
  const handleSetOpen = () => {
    setOpenCart();
  };

  // Obtiene la pocicion del scroll al abrir el carrito de compras
  const handleTouchStart = (e) => {
    setPocition(e.changedTouches[0].screenY);
  };

  // Dispara el evento de abrir o cerrar el carrtio
  // dependiendo el swipe que se realize
  const handleTouchMove = (e) => {
    if (pocition > e.changedTouches[0].screenY) {
      handleSetOpen();
    } else if (pocition < e.changedTouches[0].screenY - 100) {
      setCloseCart();
    }
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

  useEffect(() => {
    setTotal(parseFloat(subTotal) + parseFloat(shippingCost));
  }, [subTotal, shippingCost]);

  const formatter = new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  return (
    <>
      <ShoppingCartStyled
        ref={cart}
        onTouchStart={(e) => handleTouchStart(e)}
        onTouchMove={(e) => handleTouchMove(e)}
        carIsEmpty={carIsEmpty}
        carIsOpen={carIsOpen}
        hide={pathname === "/realizar-pago" && true}
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
          onClick={
            carIsOpen
              ? (e) => {
                  setCloseCart(e);
                }
              : (e) => {
                  handleSetOpen(e);
                }
          }
        >
          {carIsOpen ? "Cerrar" : "Abrir"}
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
                    closeCart={setCloseCart}
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
              <DetailsPrice className="DetailShipping">
                <p>Envío</p>
                <SubPrice>
                  {subTotal > 200
                    ? "Envío Gratis*"
                    : `$${formatter.format(shippingCost)}`}
                </SubPrice>
              </DetailsPrice>
              <DetailsPrice className="DetailTotal">
                <TotalText>Total</TotalText>
                <TotalPrice>${formatter.format(total)}</TotalPrice>
              </DetailsPrice>
              <BuyButtonContainer onClick={() => setCloseCart()}>
                <Link
                  href={session ? "/realizar-pago" : "/registro-de-usuario"}
                  passHref
                >
                  <BuyButton>Continuar</BuyButton>
                </Link>
              </BuyButtonContainer>
              <FreeShippingText>
                Envío gratis en Xalapa a partir de $200
              </FreeShippingText>
            </Totals>
          </>
        ) : (
          <CartPreview
            onTouchStart={(e) => handleTouchStart(e)}
            onTouchMove={(e) => handleTouchMove(e)}
          >
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
      {carIsOpen && <Background carIsOpen={carIsOpen} />}
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    carIsEmpty: state.carIsEmpty,
    myCart: state.myCart,
    carIsOpen: state.carIsOpen,
    shoppingCartPrices: state.shoppingCartPrices,
    shippingCost: state.shippingCost,
  };
};

const mapDispatchToProps = {
  setOpenCart,
  setCloseCart,
  setUpdateCart,
};

export default connect(mapStateToProps, mapDispatchToProps)(ShoppingCart);
