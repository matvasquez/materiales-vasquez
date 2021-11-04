import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useGetStock } from "../../hooks/useGetStock";
import { useRouter } from "next/router";
import { useGetImage } from "../../hooks/useGetImage";
import { useGetPrice } from "../../hooks/useGetPrice";

// Components
import { Loading } from "../../components/Loaders/Loading";
import { Consulting } from "../../components/Loaders/Consulting";
import RelatedSecction from "../../components/Related-Secction/RelatedSecction";

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

const ProductDetails = () => {
  const router = useRouter();
  const id = router.query.id;
  const [product, setProduct] = useState({});
  const [infoReady, setInfoReady] = useState(false);
  const [image_url] = useGetImage(id);
  const [stock] = useGetStock(id);
  const [price] = useGetPrice(id);
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
              </PriceContainer>

              {stock && (
                <Stock>
                  <span>{stock}</span> disponibles
                </Stock>
              )}
              <Description>{product.description.toLowerCase()}</Description>
              <Sku>SKU: {product.articulo_id}</Sku>
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

export default ProductDetails;

// const mapStateToProps = (state) => {
//   return {
//     myCart: state.myCart,
//     articles: state.articles,
//     itemsIliked: state.itemsIliked,
//     carIsEmpty: state.carIsEmpty,
//     carIsOpen: state.carIsOpen,
//   };
// };

// const mapDispatchToProps = {
//   setMyCart,
//   setPricesToCart,
//   setIitemsIliked,
//   setDeleteFavorite,
// };

// export default connect(mapStateToProps, mapDispatchToProps)(ProductPage);
