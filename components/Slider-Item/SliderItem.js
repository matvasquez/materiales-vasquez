import React from "react";
import Link from "next/link";

// Styled-Components
import { Item, Text, Filter } from "./style";

export const SliderItem = ({ text, image, link }) => {
  return (
    <Item>
      <a href={link ? link : "#"} aria-label={`Ver más sobre ${text}`}>
        <img
          src={`data:image/jpg;base64,${image}`}
          width={1024}
          height={600}
          alt={`Slider de ${text}`}
        />
      </a>
    </Item>
  );
};
