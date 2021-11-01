import { rest } from "../../../lib/connection";
import Cors from "cors";
import initMiddleware from "../../../lib/init-middleware";

const cors = initMiddleware(
  Cors({
    methods: ["GET"],
  })
);

export default async function getImageOfAProduct(req, res) {
  // http://localhost:3000/api/image/100053433

  // Run cors
  await cors(req, res);

  if (req.method !== "GET") {
    res
      .status(500)
      .json({ message: "Lo sentimos, sólo aceptamos solicitudes GET" });
  }
  const claveart = req.query.id.replace(/space/g, " ").replace(/slash/gi, "/");

  const query = `SELECT TOP 1 cast('' as xml).value(
    'xs:base64Binary(sql:column("i.IMAGEN"))', 'varchar(max)'
) AS image_url
FROM ARTICULO AS a
LEFT OUTER JOIN IMAGENES AS i
ON a.CLAVEART = i.CAMPO1
WHERE a.CLAVEART = '${claveart}' AND a.HABVTAS = ''  AND i.SELECTO = 'S' 
GROUP BY a.CLAVEART, i.IMAGEN`;
  // console.log("Stock :", query);

  setTimeout(async () => {
    const result = await rest.executeQuery(query);

    result &&
      res.status(200).json({
        name: "Stock of a Product",
        data: result.data[0],
      });
  }, 900);
}
