import React from "react";
//import Image from "next/image";

// const loaderImageItem = ({ src, width, quality }) => {
//   return `${src}?w=${width}&q=${quality || 75}`;
// };

export const BrandItem = ({ name, logo }) => {
  return (
    <>
      <img src={logo} width={200} height={200} alt={`Imagen de ${name}`} />
      {/* <Image
        loader={loaderImageItem}
        src={logo}
        width={200}
        height={200}
        alt={`Imagen de ${name}`}
        layout="responsive"
        objectFit="contain"
        priority="true"
      /> */}
    </>
  );
};
