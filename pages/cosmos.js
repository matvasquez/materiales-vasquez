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
    const getBestSellers = await Fetch(
      `/api/related-by-category/LO-MAacentoS-VENDIDOS?first=1&last=12`
    );
    const { data: BestSellers } = await getBestSellers.json();

    console.log("BestSellers: ", BestSellers[0]);

    const getLighting = await Fetch(
      `/api/related-by-subcategory/ILUMINACION?first=1&last=12`
    );
    const { data: LightingItems } = await getLighting.json();
    console.log("LightingItems: ", LightingItems[0]);

    const getHardware = await Fetch(
      `/api/related-by-category/FERRETERIA?first=1&last=12`
    );
    const { data: FerrItems } = await getHardware.json();
    console.log("FerrItems: ", FerrItems[0]);

    const getDoorsAndWindows = await Fetch(
      `/api/related-by-subcategory/PUERTAS-Y-VENTANAS?first=1&last=12`
    );
    const { data: DoorsItems } = await getDoorsAndWindows.json();
    console.log("DoorsItems: ", DoorsItems[0]);

    const getVentilationAndHeating = await Fetch(
      `/api/related-by-subcategory/VENTILACION-Y-CALEFACCIÓN?first=1&last=12`
    );
    const { data: VentilationItems } = await getVentilationAndHeating.json();
    console.log("VentilationItems: ", VentilationItems[0]);
    if (VentilationItems) {
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
