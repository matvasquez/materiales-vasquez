const CosmosClient = require("@azure/cosmos").CosmosClient;
import config from "../../lib/config-cosmos";

// const { Connection, Request } = require("tedious");

// // Create connection to database
// const config = {
//   authentication: {
//     options: {
//       userName: "ponce",
//       password: "com20k%%-",
//     },
//     type: "default",
//   },
//   server: "materiales-vasquez.database.windows.net",
//   options: {
//     database: "Materiales Vasquez",
//     encrypt: true,
//   },
// };

export default async function getAllCategories(req, res) {
  // Run cors
  // await cors(req, res);
  if (req.method !== "GET") {
    res
      .status(500)
      .json({ message: "Lo sentimos, sólo aceptamos solicitudes GET" });
  }

  const { endpoint, key } = config;

  const client = new CosmosClient({ endpoint, key });
  const databaseID = client.database("articulos");
  const containerID = databaseID.container("categories");

  if (endpoint) {
    const querySpec = {
      query: "SELECT * FROM c",
    };

    const { resources: items } = await containerID.items
      .query(querySpec)
      .fetchAll();

    // return { CosmoData: items };

    res.status(200).json({
      name: "All Categories",
      method: req.method,
      data: items,
    });
  }

  // :::::::::::::::::::::::::::::::::::::::::::::::::::::::

  // const queryDatabase = () => {
  //   const request = new Request(`SELECT * FROM MENU`, (err, rowCount) => {
  //     if (err) {
  //       console.error(err.message);
  //     } else {
  //       console.log(`${rowCount} row(s) returned`);
  //     }
  //   });

  //   connection.execSql(request);

  //   let counter = 1;
  //   let response = {};

  //   request.on("row", (columns) => {
  //     response[counter] = {};
  //     columns.forEach((column) => {
  //       // console.log(`${column.metadata.colName} : ${column.value}`);
  //       response[counter][column.metadata.colName] = column.value;
  //     });
  //     counter += 1;
  //   });

  //   return response;
  // };

  // const connection = new Connection(config);

  // connection.on("connect", (err) => {
  //   if (err) {
  //     console.error(err.message);
  //   } else {
  //     console.log(`connect`);
  //     let result = queryDatabase();
  //     console.log(result);
  //   }
  // });

  // connection.connect();

  // res.status(200).json({
  //   name: "All Categories",
  //   method: req.method,
  // });
}
