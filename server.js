const mysql = require("mysql2");
const express = require("express");
const app = express();
app.use(express.json());

const mysqlConnection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: process.env.MYSQL_PW,
  database: "todos",
});

mysqlConnection.connect(function (err) {
  if (err) {
    console.error("error connecting: " + err.stack);
    return;
  }

  console.log("connected as id " + mysqlConnection.threadId);
});

app.post("/todo", (req, res) => {
  mysqlConnection.query(
    `INSERT INTO todoitem (label, note, completed) VALUES ('${req.body.label}', '${req.body.note}', '${req.body.completed}')`
  );

  res.send("Data Inserted");
});

app.get("/todos", (req, res) => {
  console.log(req.body);

  mysqlConnection.query(
    `SELECT * FROM todoitem`,
    function (err, results, fields) {
      console.log(results);
      console.log(fields);
    }
  );

  res.send();
});

app.listen(3000, () => {
  console.log("Running Express Server on Port 3000...");
});
