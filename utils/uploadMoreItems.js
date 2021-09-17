// Esta funcion es llamada en las secciones de las páginas de categorias
// con el boton "cargar mas"
import fetch from "isomorphic-unfetch";

const main = async (query, start, end, aupdateItem, setNoMore) => {
  const response = await fetch(`/api/${query}?first=${start}&last=${end}`);
  const { data: products } = await response.json();

  products !== undefined && aupdateItem(products);
  if (products === undefined) {
    setNoMore(true);
  } else if (products.length < 20 || products === undefined) {
    setNoMore(true);
  }
};

export const uploadMoreItems = (query, start, end, aupdateItem, setNoMore) => {
  main(query, start, end, aupdateItem, setNoMore);
};
