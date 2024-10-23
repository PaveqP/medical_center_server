const mysql = require("mysql2/promise");

const db = mysql.createPool({
  host: "localhost", 
  user: "root", 
  password: "paveq123!", 
  database: "medical_center_db",
});

module.exports = db