import React from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import ShoppingCart from "../Shopping-Cart/ShoppingCart";

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      {children}
      <Footer />
      <ShoppingCart />
    </>
  );
};

export default Layout;
