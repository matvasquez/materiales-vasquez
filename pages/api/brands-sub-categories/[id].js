import Cors from "cors";
import initMiddleware from "../../../lib/init-middleware";

const cors = initMiddleware(
  Cors({
    methods: ["GET"],
  })
);

const rest = new (require("rest-mssql-nodejs"))({
  user: process.env.NEXT_PUBLIC_USER,
  password: process.env.NEXT_PUBLIC_PASSWORD,
  server: process.env.NEXT_PUBLIC_HOST,
  database: process.env.NEXT_PUBLIC_DATABASE,
});

export default async function getBrandsSubCategories(req, res) {
  // http://localhost:3000/api/brands/ELECTRICO
  // Run cors
  await cors(req, res);
  if (req.method !== "GET") {
    res
      .status(500)
      .json({ message: "Lo sentimos, sólo aceptamos solicitudes GET" });
  }
  setTimeout(async () => {
    const query = req.query.id
      .replace(/-/g, " ")
      .replace(/space/g, " ")
      .replace(/slash/gi, "/")
      .replace(/'/gi, "''");

    const result = await rest.executeQuery(
      `SELECT DISTINCT RTRIM(m.DESC_MARCA) AS marca
      FROM MARCAS AS m
      LEFT OUTER JOIN ARTICULO AS a
          ON m.CVE_MARCA = a.CVE_MARCA
      LEFT OUTER JOIN ARTGIRO2 AS g2
          ON a.CLAVEGIR2 = g2.CLAVEGIR2
      WHERE g2.DESC_GIR2 = '${query}' AND a.HABVTAS = '';`
    );

    result &&
      res.status(200).json({
        name: "All Brands in a Category",
        method: req.method,
        total: result.data[0].length,
        brands: result.data[0],
      });
  }, 1000);
}
