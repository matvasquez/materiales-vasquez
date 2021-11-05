import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { connect } from "react-redux";
import { useGetStock } from "../../hooks/useGetStock";
import { useRouter } from "next/router";
import { useGetImage } from "../../hooks/useGetImage";
import { useGetPrice } from "../../hooks/useGetPrice";
import { useMyItems } from "../../hooks/useMyItems";

//Actions
import {
  setMyCart,
  setPricesToCart,
  setIitemsIliked,
  setDeleteFavorite,
} from "../../actions";

// Components
import { Loading } from "../../components/Loaders/Loading";
import { Consulting } from "../../components/Loaders/Consulting";
import RelatedSecction from "../../components/Related-Secction/RelatedSecction";
import { HeartEmpty } from "../../components/IconsSVG/HeartEmpty";
import { HeartFull } from "../../components/IconsSVG/HeartFull";

// Data
import { articulos } from "../../database/articulos";

// Styled-Components
import { MainStyled } from "../../styles/Inicio/style";
import {
  SubDirectory,
  Product,
  ImageContainer,
  Title,
  PriceContainer,
  Price,
  Stock,
  InfoContainer,
  Description,
  Sku,
  AddToCartButton,
  Slide,
  ButtonLike,
  RelatedSection,
} from "../../styles/detalles/style";

// Formatear precio
const formatter = new Intl.NumberFormat("en-US", {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

// Loader para componente Image
const loader = ({ src, width, quality }) => {
  return `${src}?w=${width}&q=${quality || 75}`;
};

const ProductDetails = ({
  itemsIliked,
  myCart,
  setIitemsIliked,
  setDeleteFavorite,
  setMyCart,
  setPricesToCart,
}) => {
  const router = useRouter();
  const id = router.query.id;
  const [product, setProduct] = useState({});
  const [infoReady, setInfoReady] = useState(false);
  const [image_url] = useGetImage(id);
  const [stock] = useGetStock(id);
  const [price] = useGetPrice(id);
  // Hook que verifica si el producto esta entre los favoritos
  const [yesItIsMineLike] = useMyItems(id, itemsIliked);
  // Hook que verifica si el producto esta en el carrito
  const [yesItIsMineCart] = useMyItems(id, myCart);
  // Relacionados
  const [relatedByName, setRelatedByName] = useState([]);
  const [relatedByCategory, setRelatedByCategory] = useState([]);

  useEffect(() => {
    id === undefined && setInfoReady(false);
  }, [id]);

  useEffect(() => {
    if (articulos.length > 0 && id) {
      const data = articulos.filter((item) => item.articulo_id === id);
      if (data) {
        setProduct(data[0]);
        setInfoReady(true);
      }
    }
  }, [id]);

  useEffect(() => {
    // Solicita articulos relacionados por nombre
    if (image_url && product) {
      const name = product.name.split(" ")[0];
      const data = articulos.filter(
        (item) => item.name.includes(name) && item.name !== product.name
      );
      setRelatedByName(data.slice(0, 12));
    }
  }, [id, product, image_url]);

  useEffect(() => {
    // Solicita articulos relacionados por categoria
    if (image_url && product) {
      const category = product.category;
      const data = articulos.filter((item) => item.category === category);
      setRelatedByCategory(data.slice(0, 12));
    }
  }, [id, product, image_url]);

  // console.log("myCart: ", myCart);

  // Envia al Carrito y a la lista de precios
  const handleSetCart = () => {
    let articulo_id = product.articulo_id;
    setMyCart({
      articulo_id,
      initialQuantity: 1,
    });
    setPricesToCart(price);
  };

  // Envia a favoritos
  const handleLike = () => {
    let articulo_id = product.articulo_id;
    setIitemsIliked({ articulo_id });
  };

  // Elimina de favoritos
  const handleDeleteFavorite = () => {
    setDeleteFavorite(product.articulo_id);
  };

  return (
    <MainStyled>
      {infoReady && product ? (
        <>
          <Title>{product.name.toLowerCase()}</Title>
          <SubDirectory>
            <Link href={`/categoria/${product.category.replace(/ /gi, "-")}`}>
              <a>
                /categoria/{product.category.replace(/ /gi, "-").toLowerCase()}
              </a>
            </Link>
            {product.main_category && (
              <Link
                href={`/categoria/${product.category.replace(
                  / /gi,
                  "-"
                )}/${product.main_category.replace(/ /gi, "-")}`}
              >
                <a>
                  {`/${product.main_category
                    .replace(/ /gi, "-")
                    .toLowerCase()}`}
                </a>
              </Link>
            )}
          </SubDirectory>
          <Product>
            <ImageContainer>
              {image_url ? (
                <Image
                  loader={loader}
                  src={`data:image/jpg;base64,${image_url}`}
                  width={300}
                  height={300}
                  alt={`Fotografía de ${product.name}`}
                />
              ) : (
                <Loading />
              )}
            </ImageContainer>
            <InfoContainer>
              <PriceContainer>
                {price ? (
                  <Price>${formatter.format(price)} </Price>
                ) : (
                  <Consulting />
                )}
                <ButtonLike
                  onClick={yesItIsMineLike ? handleDeleteFavorite : handleLike}
                  aria-label="Botón para agregar a favoritos"
                >
                  {yesItIsMineLike ? <HeartFull /> : <HeartEmpty />}
                </ButtonLike>
              </PriceContainer>

              {stock && (
                <>
                  {stock > 0 ? (
                    <Stock>
                      <span>{stock}</span> disponibles
                    </Stock>
                  ) : (
                    <Stock>
                      Por el momento no tenemos disponibles en línea, comunícate
                      con nosotros
                    </Stock>
                  )}
                </>
              )}
              <Description>{product.description.toLowerCase()}</Description>
              <Sku>SKU: {product.articulo_id}</Sku>
              <AddToCartButton
                type="button"
                onClick={() => console.log("Añadir al carrito")}
              >
                Añadir al carrito
                <Slide />
              </AddToCartButton>
            </InfoContainer>
          </Product>
          {relatedByName.length > 0 && (
            <RelatedSection>
              <h3>Relacionados</h3>
              <RelatedSecction data={relatedByName} />
            </RelatedSection>
          )}
          {relatedByCategory.length > 0 && (
            <RelatedSection>
              <h3>Puede que te interese</h3>
              <RelatedSecction data={relatedByCategory} />
            </RelatedSection>
          )}
        </>
      ) : (
        <>
          <h1>{id}</h1>
          <p>No hay nada con ese ID</p>
        </>
      )}
    </MainStyled>
  );
};

const mapStateToProps = (state) => {
  return {
    myCart: state.myCart,
    itemsIliked: state.itemsIliked,
  };
};

const mapDispatchToProps = {
  setMyCart,
  setPricesToCart,
  setIitemsIliked,
  setDeleteFavorite,
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetails);
