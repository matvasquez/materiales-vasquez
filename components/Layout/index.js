import React, { useEffect } from "react";
import { connect } from "react-redux";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import ShoppingCart from "../Shopping-Cart/ShoppingCart";
import { useRouter } from "next/router";

const Layout = ({ children, myCart }) => {
  const { pathname } = useRouter();

  // Regresa el scroll al remover el carrtio de compras
  useEffect(() => {
    if (myCart.length === 0 || pathname === "/realizar-pago") {
      document.body.style.position = "initial";
    }
  }, [myCart]);
  return (
    <>
      <Header />
      {children}
      <Footer />
      {pathname !== "/realizar-pago" && (
        <>
          {pathname !== "/pago-error" && (
            <>{myCart.length > 0 && <ShoppingCart />}</>
          )}
        </>
      )}
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

export default connect(mapStateToProps, null)(Layout);
