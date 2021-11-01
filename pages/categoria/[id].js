import { useState, useEffect } from "react";
import { useRouter } from "next/router";

// Data
import { articulos } from "../../database/articulos";

// Components
import CategorySection from "../../components/Category-Section/CategorySection";

// Styles
import { MainStyled, Title } from "../../styles/categoria/style";

const Category = () => {
  const router = useRouter();
  const id = router.query.id;

  const [products, setProducts] = useState([]);

  useEffect(() => {
    if (articulos.length > 0 && id) {
      const data = articulos.filter(
        (item) => item.category === id.replace(/-/g, " ")
      );
      setProducts(data.slice(0, 50));
    }
  }, [id]);

  return (
    <MainStyled>
      {id && <Title>{id.replace(/-/g, " ").toLowerCase()}</Title>}
      {products.length > 0 && (
        <section>
          <CategorySection data={products} />
        </section>
      )}
    </MainStyled>
  );
};

export default Category;
