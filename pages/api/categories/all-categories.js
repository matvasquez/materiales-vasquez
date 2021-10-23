import { rest } from "../../../lib/connection";
import Cors from "cors";
import initMiddleware from "../../../lib/init-middleware";

const cors = initMiddleware(
  Cors({
    methods: ["GET"],
  })
);

const { Connection, Request } = require("tedious");

console.log(`getAllCategories`);

const config = {
  authentication: {
    options: {
      userName: "ponce",
      password: "com20k%%-",
    },
    type: "default",
  },
  server: "materiales-vasquez.database.windows.net",
  options: {
    database: "Materiales Vasquez",
    encrypt: true,
  },
};

const queryDatabase = () => {
  console.log("Lectura de filas de la Tabla...");

  const request = new Request(`SELECT * FROM MENU`, (err, rowCount) => {
    if (err) {
      console.error("Error:", err.message);
    } else {
      console.log("Exito");
      console.log(`${rowCount} fila(s) devuelta(s)`);
      // res.status(200).json({
      //   name: "All Categories",
      //   method: req.method,
      //   total: result.data[0].length,
      //   data: result.data[0],
      // })
    }
  });

  request.on("row", (columns) => {
    columns.forEach((column) => {
      console.log("%s\t%s", column.metadata.colName, column.value);
    });
  });

  connection.execSql(request);
};

export default async function getAllCategories(req, res) {
  // Run cors
  await cors(req, res);
  if (req.method !== "GET") {
    res
      .status(500)
      .json({ message: "Lo sentimos, sólo aceptamos solicitudes GET" });
  }

  const connection = new Connection(config);

  connection.on("connect", (err) => {
    console.log("Connect");
    if (err) {
      console.log("Error: ", err.message);
    } else {
      queryDatabase();
    }
  });

  setTimeout(async () => {
    // const result = await rest.executeQuery(`SELECT * FROM MENU`);
    const result = await rest.executeQuery(
      `SELECT RTRIM(l.DESGIR) AS categorie, RTRIM(s.DESC_GIR2) AS subcategorie, RTRIM(s.CLAVEGIR2) AS id
    FROM ARTGIRO AS l
    RIGHT JOIN  ARTGIRO2 AS s
        ON s.CLAVEGIR = l.CLAVEGIR
    WHERE l.CO1 = '1'`
    );

    result &&
      res.status(200).json({
        name: "All Categories",
        method: req.method,
        total: result.data[0].length,
        data: result.data[0],
      });
  }, 800);
}
