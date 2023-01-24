const Pool = require("pg").Pool;
require("dotenv").config();

const pool = new Pool({
  user: process.env.USERNAME,
  password: "",
  host: "localhost",
  port: "5432",
  database: "todo-app",
});

module.exports = pool;
