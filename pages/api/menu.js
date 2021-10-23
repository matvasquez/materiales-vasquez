const { Connection, Request } = require("tedious");
// // import { rest } from "../../lib/connection";
import Cors from "cors";
import initMiddleware from "../../lib/init-middleware";

const cors = initMiddleware(
  Cors({
    methods: ["GET"],
  })
);

// Create connection to database
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

export default function getAllCategories(req, res) {
  // Run cors
  // await cors(req, res);
  if (req.method !== "GET") {
    res
      .status(500)
      .json({ message: "Lo sentimos, sólo aceptamos solicitudes GET" });
  }

  const queryDatabase = () => {
    let data = [];
    const request = new Request(`SELECT * FROM MENU`, (err, rowCount) => {
      if (err) {
        console.error(err.message);
      } else {
        console.log(`${rowCount} row(s) returned`);
      }
    });

    request.on("row", (columns) => {
      let row = {};
      columns.forEach((column) => {
        row[column.metadata.colName] = column.value;
      });

      data.push(row);
      // console.log("row: ", row);
    });

    connection.execSql(request);
    return data;
  };

  const connection = new Connection(config);

  connection.on("connect", (err) => {
    if (err) {
      console.error(err.message);
    } else {
      let result = queryDatabase();
      console.log("result: ", result);
    }
  });

  connection.connect();

  res.status(200).json({
    name: "All Categories",
    method: req.method,
    // total: result.data[0].length,
    // data: queryDatabase,
  });
}

// setTimeout(async () => {
//   const result = await rest.executeQuery(`SELECT * FROM MENU`);

//   result &&
//     res.status(200).json({
//       name: "All Categories",
//       method: req.method,
//       // total: result.data[0].length,
//       // data: result.data[0],
//     });
// }, 1000);
