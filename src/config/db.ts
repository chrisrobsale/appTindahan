import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

const pool = mysql.createPool({
  host: process.env?.DBHOST,
  port: process.env?.DBPORT ? parseInt(process.env.DBPORT, 10) : 53291,
  user: process.env?.DBUSER,
  password: process.env?.DBPASSWORD,
  database: process.env?.DBNAME,
  ssl: {
    rejectUnauthorized: false, // accept self-signed certs
  },
});

export default pool;
