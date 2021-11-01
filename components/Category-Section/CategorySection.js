import React, { useState, useEffect } from "react";

// Components
import PreviewItem from "../Preview-Item/PreviewItem";

// Styled-Components
import { ItemsContainer } from "./style";

const CategorySection = ({ data }) => {
  return (
    <ItemsContainer>
      {data.map((item) => (
        <PreviewItem key={item.articulo_id + item.price} {...item} />
      ))}
    </ItemsContainer>
  );
};

export default CategorySection;
