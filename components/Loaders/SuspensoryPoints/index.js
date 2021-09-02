// Styled-Components
import { Conatiner, Point } from "./style";

export const SuspensoryPoints = () => {
  return (
    <Conatiner>
      <Point />
      <Point delay={0.1} />
      <Point delay={0.2} />
    </Conatiner>
  );
};
