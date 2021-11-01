import Image from "next/image";
import Link from "next/link";
// import { useNearScreen } from "../../hooks/useNearScreen";
import { useGetImage } from "../../hooks/useGetImage";

// Components
import { Loading } from "../Loaders/Loading";

// Styled-Components
import {
  Item,
  ImageContainer,
  ItemInfo,
  ItemText,
  ItemPrice,
  Categoryes,
  Categorie,
} from "./style";

// Loader para componente Image
const loader = ({ src, width, quality }) => {
  return `${src}?w=${width}&q=${quality || 75}`;
};

// Formatear precio
const formatter = new Intl.NumberFormat("en-US", {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

const PreviewItem = ({ articulo_id, name, category, main_category, price }) => {
  // const { show, element } = useNearScreen();
  const [image_url] = useGetImage(articulo_id);

  return (
    <Link href={`/detalles/${articulo_id}`} passHref>
      <Item aria-label={`Ver detalles de ${name}`}>
        <ImageContainer>
          {image_url !== "" ? (
            <Image
              loader={loader}
              src={`data:image/jpg;base64,${image_url}`}
              width={300}
              height={300}
              alt={`Fotografía de ${name}`}
            />
          ) : (
            <Loading />
          )}
        </ImageContainer>
        <ItemInfo>
          <ItemText>{name.toLocaleLowerCase()}</ItemText>
          <ItemPrice>${formatter.format(price)}</ItemPrice>
          <Categoryes>
            {category && <Categorie>{category.toLocaleLowerCase()}</Categorie>}
            {main_category && (
              <Categorie>{main_category.toLocaleLowerCase()}</Categorie>
            )}
          </Categoryes>
        </ItemInfo>
      </Item>
    </Link>
  );
};

export default PreviewItem;
