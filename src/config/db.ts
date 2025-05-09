import mysql from "mysql2/promise";

const pool = mysql.createPool({
  host: "metro.proxy.rlwy.net",
  port: 53291,
  user: "root",
  password: "BpdOdaYeHhwPhvzMuzhurbvhdiaZZMbS",
  database: "railway",
  ssl: {
    rejectUnauthorized: false, // accept self-signed certs
  },
});

export default pool;
