import React from "react";

// Styled-Components
import { Conatiner, Cricle } from "./style";

export const Seeking = () => {
  return (
    <Conatiner>
      <Cricle index={1}>
        <Cricle index={2}>
          <Cricle index={3}>
            <Cricle index={4}></Cricle>
          </Cricle>
        </Cricle>
      </Cricle>
    </Conatiner>
  );
};
