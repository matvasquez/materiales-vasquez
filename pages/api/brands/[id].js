import { rest } from "../../../lib/connection";
import Cors from "cors";
import initMiddleware from "../../../lib/init-middleware";

const cors = initMiddleware(
  Cors({
    methods: ["GET"],
  })
);

export default async function getBrands(req, res) {
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
      .replace(/'/gi, "''")
      .replace(/enne/gi, "Ñ");

    const result = await rest.executeQuery(
      `SELECT DISTINCT RTRIM(m.DESC_MARCA) AS marca
      FROM MARCAS AS m
      LEFT OUTER JOIN ARTICULO AS a
          ON m.CVE_MARCA = a.CVE_MARCA
      LEFT OUTER JOIN ARTGIRO AS g
          ON a.CLAVEGIR = g.CLAVEGIR
      WHERE g.DESGIR = '${query}' AND a.HABVTAS = '';`
    );

    result &&
      res.status(200).json({
        name: "All Brands in a Category",
        method: req.method,
        total: result.data[0].length,
        brands: result.data[0],
      });
  }, 800);
}
