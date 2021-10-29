const CosmosClient = require("@azure/cosmos").CosmosClient;
import config from "../lib/config-cosmos";
import Image from "next/image";

// Styled Components
import {
  MainStyled,
  FirstSection,
  Total,
  ItemsContainer,
  Item,
  ImageContainer,
  ItemInfo,
  ItemText,
  ItemPrice,
  Categoryes,
  Categorie,
} from "../styles/cosmos/style";

// Loader para componente Image
const loader = ({ src, width, quality }) => {
  return `${src}?w=${width}&q=${quality || 75}`;
};

Home.getInitialProps = async function () {
  const { endpoint, key } = config;

  const client = new CosmosClient({ endpoint, key });
  const databaseID = client.database("articulos");
  const containerID = databaseID.container("articulos_mv");

  if (endpoint) {
    const { resources: items } = await containerID.items
      .query(`SELECT * FROM c WHERE c.best_seller = "TRUE"`)
      .fetchAll();

    const { resources: materiales } = await containerID.items
      .query(
        `SELECT * FROM c WHERE c.category = "MATERIALES PARA CONSTRUCCION"`
      )
      .fetchAll();

    return {
      BestSellers: items,
      Materiales: materiales,
    };
  }
};

export default function Home({ BestSellers, Materiales }) {
  // Formatear precio
  const formatter = new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  return (
    <MainStyled>
      <FirstSection>
        Total de articulos: <Total>{BestSellers.length}</Total>
      </FirstSection>
      <ItemsContainer>
        {BestSellers.map(
          ({
            id,
            name,
            category,
            main_category,
            description,
            price,
            image_url,
          }) => (
            <Item key={id}>
              <ImageContainer>
                <Image
                  loader={loader}
                  src={`data:image/jpg;base64,${image_url}`}
                  width={300}
                  height={300}
                  alt={`Fotografía de ${name}`}
                  placeholder="blurDataURL"
                />
              </ImageContainer>
              <ItemInfo>
                <ItemText>{name.toLocaleLowerCase()}</ItemText>
                <ItemPrice>${formatter.format(price)}</ItemPrice>
                <Categoryes>
                  <Categorie>{category.toLocaleLowerCase()}</Categorie>
                  <Categorie>{main_category.toLocaleLowerCase()}</Categorie>
                </Categoryes>
              </ItemInfo>
            </Item>
          )
        )}
      </ItemsContainer>
    </MainStyled>
  );
}
