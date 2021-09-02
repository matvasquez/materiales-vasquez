// Esta funcion es llamada en las secciones de las páginas de categorias
// con el boton "cargar mas"
import fetch from "isomorphic-unfetch";

const main = async (category, start, end, aupdateItem, setNoMore) => {
  const response = await fetch(
    `https://api-vasquez.herokuapp.com/api/related-by-category/${category}?first=${start}&last=${end}`
  );
  const { productsByCategory: products } = await response.json();

  aupdateItem(products);
  if (products.length < 20) {
    setNoMore(true);
  }
};

export const uploadMoreItems = (
  category,
  start,
  end,
  aupdateItem,
  setNoMore
) => {
  main(category, start, end, aupdateItem, setNoMore);
};
