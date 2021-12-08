import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import Fetch from "isomorphic-unfetch";
import { connect } from "react-redux";
import { useGetStock } from "../../hooks/useGetStock";
import { useRouter } from "next/router";
import { useGetProductos } from "../../hooks/useGetProductos";
// import { useGetImage } from "../../hooks/useGetImage";
// import { useGetPrice } from "../../hooks/useGetPrice";
import { useMyItems } from "../../hooks/useMyItems";

//Actions
import { setMyCart, setIitemsIliked, setDeleteFavorite } from "../../actions";

// Components
import { Loading } from "../../components/Loaders/Loading";
import { Consulting } from "../../components/Loaders/Consulting";
import RelatedSecction from "../../components/Related-Secction/RelatedSecction";
import { HeartEmpty } from "../../components/IconsSVG/HeartEmpty";
import { HeartFull } from "../../components/IconsSVG/HeartFull";
import { Whatsapp } from "../../components/IconsSVG/Whatsapp";
import { ShoppingBag } from "../../components/IconsSVG/ShoppingBag";

// Data
// import { articulos } from "../../database/articulos";

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
  NotAvailable,
  InfoContainer,
  Description,
  Sku,
  ContainerSelector,
  SelectorButtons,
  SelectorDisplay,
  AddToCartButton,
  ViewShoppingCart,
  MessageContainer,
  MessageIconContainer,
  Message,
  Slide,
  LinkWhatsApp,
  ButtonLike,
  RelatedSection,
  Seeing,
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
  product,

  itemsIliked,
  myCart,
  setIitemsIliked,
  setDeleteFavorite,
  setMyCart,
  setPricesToCart,
}) => {
  const router = useRouter();
  if (router.isFallback) {
    return (
      <MainStyled>
        <Title>Consultando</Title>
        <Seeing>
          <Loading />
        </Seeing>
      </MainStyled>
    );
  }
  const id = router.query.id;
  // const [product, setProduct] = useState({});
  const [infoReady, setInfoReady] = useState(false);
  // const [image_url] = useGetImage(id);
  const [stock] = useGetStock(id);
  // const [price] = useGetPrice(id);
  const [articles] = useGetProductos();
  //Url Actual
  const [currentUrl, setCurrentUrl] = useState("");
  // Hook que verifica si el producto esta entre los favoritos
  const [yesItIsMineLike] = useMyItems(product.articulo_id, itemsIliked);
  // Hook que verifica si el producto esta en el carrito
  const [yesItIsMineCart] = useMyItems(product.articulo_id, myCart);
  // Relacionados
  const [relatedByName, setRelatedByName] = useState([]);
  const [relatedByCategory, setRelatedByCategory] = useState([]);
  // Catidad seleccionada
  const [initialQuantity, setInitialQuantity] = useState(1);

  useEffect(() => {
    setInitialQuantity(1);
  }, [product]);

  // useEffect(() => {
  //   if (articulos.length > 0 && id) {
  //     const data = articulos.filter((item) => item.articulo_id === id);
  //     console.log(data);
  //     if (data) {
  //       setProduct(data[0]);
  //       setInfoReady(true);
  //     }
  //   }
  // }, [id]);
  // console.log("product: ", product);

  // useEffect(() => {
  //   // Solicita articulos relacionados por nombre
  //   if (product) {
  //     const name = product.name.split(" ")[0];
  //     const data = articulos.filter(
  //       (item) => item.name.includes(name) && item.name !== product.name
  //     );
  //     setRelatedByName(data.slice(0, 12));
  //   }
  // }, [product]);

  useEffect(() => {
    // Solicita articulos relacionados por nombre
    if (product && articles.length > 0) {
      const name = product.name.split(" ")[0];
      console.log("name: ", name);

      const data = articles.filter(
        (item) =>
          item.description.includes(name) && item.description !== product.name
      );
      setRelatedByName(data.slice(0, 12));
    }
  }, [product, articles]);

  useEffect(() => {
    // Solicita articulos relacionados por categoria
    if (product && articles.length > 0) {
      const category = product.category;
      const data = articles.filter((item) => item.category === category);
      setRelatedByCategory(data.slice(0, 12));
    }
  }, [product, articles]);

  // Envia al Carrito y a la lista de precios
  const handleSetCart = () => {
    setMyCart({
      articulo_id: product.articulo_id,
      name: product.name,
      initialQuantity,
      price,
    });
    // setPricesToCart(price);
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

  useEffect(() => {
    if (window) {
      setCurrentUrl(window.location);
    }
  }, [product]);

  if (product) {
    // console.log(product.articulo_id);
    // console.log("====================================");

    const {
      articulo_id,
      brand,
      category,
      description,
      image_url,
      main_category,
      name,
      price,
    } = product;

    return (
      <MainStyled>
        <Title>{name.toLowerCase()}</Title>
        <SubDirectory>
          <Link href={`/categoria/${category.replace(/ /gi, "-")}`}>
            <a>
              /categoria/
              {category.replace(/ /gi, "-").toLowerCase()}
            </a>
          </Link>
          {main_category && (
            <Link
              href={`/categoria/${category.replace(
                / /gi,
                "-"
              )}/${main_category.replace(/ /gi, "-")}`}
            >
              <a>{`/${main_category.replace(/ /gi, "-").toLowerCase()}`}</a>
            </Link>
          )}
        </SubDirectory>
        <Product>
          <ImageContainer>
            <Image
              loader={loader}
              src={`data:image/jpg;base64,${image_url}`}
              alt={`Imagen de ${name}`}
              layout="fill"
              objectFit="contain"
              blurDataURL
            />
          </ImageContainer>
          <InfoContainer>
            <PriceContainer>
              <Price>${formatter.format(price)} </Price>
              <ButtonLike
                onClick={yesItIsMineLike ? handleDeleteFavorite : handleLike}
                aria-label="Botón para agregar a favoritos"
              >
                {yesItIsMineLike ? <HeartFull /> : <HeartEmpty />}
              </ButtonLike>
            </PriceContainer>

            {stock > 0 && (
              <Stock>
                <span>{stock}</span> disponibles
              </Stock>
            )}
            <Description>{description.toLowerCase()}</Description>
            <Sku>SKU: {articulo_id}</Sku>
            {stock > 0 && (
              <>
                {!yesItIsMineCart && (
                  <ContainerSelector>
                    <SelectorButtons
                      type="button"
                      onClick={() => {
                        if (initialQuantity > 1) {
                          setInitialQuantity(initialQuantity - 1);
                        }
                      }}
                    >
                      -
                    </SelectorButtons>
                    <SelectorDisplay>{initialQuantity}</SelectorDisplay>
                    <SelectorButtons
                      type="button"
                      onClick={() => {
                        if (initialQuantity < stock) {
                          setInitialQuantity(initialQuantity + 1);
                        }
                      }}
                    >
                      +
                    </SelectorButtons>
                  </ContainerSelector>
                )}
                {!yesItIsMineCart ? (
                  <AddToCartButton
                    type="button"
                    onClick={() => {
                      if (!yesItIsMineCart) {
                        handleSetCart();
                      }
                    }}
                  >
                    Añadir al carrito
                    <Slide />
                  </AddToCartButton>
                ) : (
                  <>
                    <Link href="/carrito-de-compras">
                      <ViewShoppingCart>Ver carrito</ViewShoppingCart>
                    </Link>
                    <MessageContainer>
                      <MessageIconContainer>
                        <ShoppingBag width="1.2rem" />
                      </MessageIconContainer>
                      <Message>
                        Envío gratis en Xalapa si agregas desde $200*
                      </Message>
                    </MessageContainer>
                  </>
                )}
              </>
            )}
            {currentUrl !== "" && (
              <LinkWhatsApp
                href={`https://api.whatsapp.com/send?phone=522288366283&text=Hola,%20quisiera%20obtener%20m%C3%A1s%20informaci%C3%B3n%20sobre%20este%20art%C3%ADculo:%20${currentUrl}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Enlace a WhatsApp"
                bg="#25d366"
              >
                <Whatsapp width="2rem" />
                Pregunta por este artículo
              </LinkWhatsApp>
            )}
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
      </MainStyled>
    );
  } else {
    return (
      <MainStyled>
        <Title>Consultando</Title>
        <Seeing>
          <Loading />
        </Seeing>
      </MainStyled>
    );
  }
};

const mapStateToProps = (state) => {
  return {
    myCart: state.myCart,
    itemsIliked: state.itemsIliked,
  };
};

const mapDispatchToProps = {
  setMyCart,
  setIitemsIliked,
  setDeleteFavorite,
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetails);

export const getStaticPaths = async () => {
  const getPaths = await Fetch(
    `${process.env.NEXT_PUBLIC_URL}/api/todos-los-articulos`
  );
  const { data } = await getPaths.json();

  // Obtener las rutas que queremos pre-renderizar
  const paths = data.map(({ articulo_id }) => ({
    params: { id: articulo_id },
  }));

  return { paths, fallback: true };
};

export const getStaticProps = async ({ params }) => {
  const getProduct = await Fetch(
    `${process.env.NEXT_PUBLIC_URL}/api/detalles//${params.id
      .replace(/ /g, "space")
      .replace(/\//gi, "slash")}`
  );
  const { data } = await getProduct.json();

  // console.log("====================================");
  // console.log(params);
  // console.log("====================================");

  return {
    props: {
      product: data[0],
    },
    revalidate: 10,
  };
};
