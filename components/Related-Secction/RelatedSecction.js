// Components
import RelatedItem from "../Related-Item/RelatedItem";

// Styled-Components
import { ItemsContainer } from "../Home-Sections/style";

const RelatedSecction = ({ data }) => {
  return (
    <ItemsContainer>
      {data.map((item) => (
        <RelatedItem key={item.articulo_id + item.price} {...item} />
      ))}
    </ItemsContainer>
  );
};

export default RelatedSecction;
