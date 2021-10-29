const CosmosClient = require("@azure/cosmos").CosmosClient;
import config from "../../lib/config-cosmos";
import { useRouter } from "next/router";

// Components
import HomeSection from "../../components/Home-Sections";

// Styles
import {
  MainStyled,
  FirstSection,
  Total,
  Section,
} from "../../styles/Inicio/style";

export const getServerSideProps = async ({ params }) => {
  const id = params?.id;

  const { endpoint, key } = config;

  const client = new CosmosClient({ endpoint, key });
  const databaseID = client.database("articulos");
  const containerID = databaseID.container("articulos_mv");

  if (endpoint) {
    const { resources: items } = await containerID.items
      .query(
        `SELECT TOP 50 * FROM c WHERE c.category = "${id.replace(/-/g, " ")}"`
      )
      .fetchAll();

    return {
      props: {
        items,
      },
    };
  }
};

const Category = ({ items }) => {
  const router = useRouter();
  const { id: Category } = router.query;

  return (
    <MainStyled>
      <FirstSection>
        Total de articulos: <Total>{items.length}</Total>
      </FirstSection>
      {items.length > 0 && (
        <Section>
          <h1>{Category.replace(/-/g, " ").toLocaleLowerCase()}</h1>
          <HomeSection items={items} />
        </Section>
      )}
    </MainStyled>
  );
};

export default Category;
