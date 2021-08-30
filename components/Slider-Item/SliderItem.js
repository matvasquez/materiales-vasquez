import React from "react";
import Link from "next/link";

// Styled-Components
import { Item, Text, Filter } from "./style";

export const SliderItem = ({ text, image }) => {
  return (
    <Item>
      <Link href="#" passHref>
        <a aria-label={`Ver más sobre ${text}`}>
          {text != "" && (
            <>
              <Text>{text}</Text>
              <Filter />
            </>
          )}
          <img
            src={image}
            width={1024}
            height={600}
            alt={`Imagen de ${text}`}
          />
        </a>
      </Link>
    </Item>
  );
};
