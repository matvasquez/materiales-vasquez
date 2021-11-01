const CosmosClient = require("@azure/cosmos").CosmosClient;
import config from "../../../../lib/config-cosmos";

export default async function getAllCategories(req, res) {
  if (req.method !== "GET") {
    res
      .status(500)
      .json({ message: "Lo sentimos, sólo aceptamos solicitudes GET" });
  }

  const { endpoint, key } = config;

  const client = new CosmosClient({ endpoint, key });
  const databaseID = client.database("articulos");
  const containerID = databaseID.container("articulos_mv");

  if (endpoint) {
    const querySpec = {
      query: `SELECT *
      FROM c 
      WHERE c.main_category = "${req.query.id.replace(/-/gi, " ")}"
      OFFSET 9 LIMIT 16`,
    };

    const { resources: items } = await containerID.items
      .query(querySpec)
      .fetchAll();

    res.status(200).json({
      name: "All Categories",
      method: req.method,
      total: items.length,
      data: items,
    });
  }
}
