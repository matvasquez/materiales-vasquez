import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import Fetch from "isomorphic-unfetch";

// Styled-Components
import { MainStyled } from "../styles/cosmos/style";

// Loader para componente Image
const loader = ({ src, width, quality }) => {
  return `${src}?w=${width}&q=${quality || 75}`;
};

// Formatear precio
const formatter = new Intl.NumberFormat("en-US", {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

const Cosmos = () => {
  const [loading, setLoading] = useState(true);

  const getData = async () => {
    const getDataApi = await Fetch(`/api/home`);
    const { slider, bests, lighting, ferr, doors, ventilation, status } =
      await getDataApi.json();

    console.log(slider, bests, lighting, ferr, doors, ventilation, status);

    if (status) {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);
  return (
    <MainStyled>
      <h1>Materiales Vasquez</h1>
      {loading ? <h3>Solicitando datos...</h3> : <h3>Listo!</h3>}
    </MainStyled>
  );
};

export default Cosmos;
