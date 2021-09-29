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

export default async function getStockOfAProduct(req, res) {
  // http://localhost:3000/api/stock/100053433
  // Run cors
  await cors(req, res);
  if (req.method !== "GET") {
    res
      .status(500)
      .json({ message: "Lo sentimos, sólo aceptamos solicitudes GET" });
  }
  const query = req.query.id.replace(/space/g, " ").replace(/slash/gi, "/");

  setTimeout(async () => {
    const result =
      await rest.executeQuery(`SELECT SUM(s.EXISTE) - SUM(s.U_SURTIR) AS stock
  FROM ARTICULO AS a
  LEFT OUTER JOIN ARTLISTA AS l
      ON a.CLAVEART = l.CLAVEART
  LEFT OUTER JOIN ART_ALM AS s
      ON a.CLAVEART = s.CLAVEART
  WHERE a.CLAVEART = '${query}' AND a.HABVTAS = '' AND l.NO_LISTAP = '001' AND s.CVEALM IN ('0020','0007','0018','0014','0015','0002','0008','0023','0017','0028','0027');`);

    result &&
      res.status(200).json({
        name: "Stock of a Product",
        data: result.data[0],
      });
  }, 1000);
}
