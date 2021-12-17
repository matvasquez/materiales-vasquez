import Image from "next/image";
import Link from "next/link";
// Hooks
import { useGetImage } from "../../hooks/useGetImage";
import { useGetPrice } from "../../hooks/useGetPrice";

// Components
import { Loading } from "../Loaders/Loading";
import { Consulting } from "../Loaders/Consulting";

// CSS
import styles from "@/styles/components/SearchItem.module.css";

// Loader para componente Image
const loader = ({ src, width, quality }) => {
  return `${src}?w=${width}&q=${quality || 75}`;
};

// Formatear precio
const formatter = new Intl.NumberFormat("en-US", {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

const SearchItem = ({ articulo_id, main_category, name }) => {
  const {
    item,
    imageContainer,
    iconContainer,
    itemInfo,
    itemText,
    itemPrice,
    itemCategory,
  } = styles;
  const [image_url] = useGetImage(articulo_id);
  const [price] = useGetPrice(articulo_id);

  return (
    <Link href={`/detalles/${articulo_id}`} passHref>
      <a aria-label={`Ver detalles de ${name}`} className={item}>
        <div className={imageContainer}>
          {image_url ? (
            <Image
              loader={loader}
              src={`data:image/jpg;base64,${image_url}`}
              alt={`Imagen de producto no disponible`}
              width="200"
              height="200"
              blurDataURL
            />
          ) : (
            <div className={iconContainer}>
              <Loading />
            </div>
          )}
        </div>
        <div className={itemInfo}>
          {name && <p className={itemText}>{name.toLocaleLowerCase()}</p>}
          {price !== "" ? (
            <p className={itemPrice}>${formatter.format(price)}</p>
          ) : (
            <Consulting />
          )}
          {main_category && (
            <p className={itemCategory}>{main_category.toLocaleLowerCase()}</p>
          )}
        </div>
      </a>
    </Link>
  );
};

export default SearchItem;
