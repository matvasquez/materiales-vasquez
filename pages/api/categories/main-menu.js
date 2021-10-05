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

export default async function getMainCategories(req, res) {
  // Run cors
  await cors(req, res);
  if (req.method !== "GET") {
    res
      .status(500)
      .json({ message: "Lo sentimos, sólo aceptamos solicitudes GET" });
  }
  setTimeout(async () => {
    // const result = await rest.executeQuery(
    //   `SELECT DISTINCT RTRIM(DESCRIBECO) AS name
    //   FROM CAT_CLAS
    //   WHERE DESCRIBECO IN ('ACABADOS', 'BAÑOS', 'HOGAR', 'COCINA', 'ELECTRICO', 'HERRAMIENTAS', 'ILUMINACION', 'MATERIALES DE CONSTRUCCION', 'PLOMERIA');`
    // );
    const result = await rest.executeQuery(
      `SELECT DISTINCT RTRIM(DESCRIBECO) AS name 
      FROM CAT_CLAS
      WHERE HOJA = 'N'AND NIVEL = '3';`
    );

    result &&
      res.status(200).json({
        name: "Main Categories",
        method: req.method,
        total: result.data[0].length,
        data: result.data[0],
      });
  }, 1000);
}
