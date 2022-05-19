const mysql = require("mysql");
require("dotenv").config();

const db = mysql.createPool({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASS,
  database: process.env.DB,
  multipleStatements: true,
});

let query = function (sql, values) {
  return new Promise((resolve, reject) => {
    db.getConnection(function (err, connection) {
      if (err) {
        reject(err);
      } else {
        console.log("DB CONNECTED");
        connection.query(sql, values, (err, rows) => {
          if (err) {
            reject(err);
          } else {
            resolve(rows);
          }
          //* end sessión
          connection.release();
        });
      }
    });
  });
};

module.exports = query;
