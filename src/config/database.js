import pg from "pg";
import dotenv from "dotenv";

dotenv.config();

const { Pool } = pg;

const pool = new Pool({
    user: process.env.PGUSER,
    host: process.env.PGHOST,
    database: process.env.PGDATABASE,
    password: process.env.PGPASSWORD,
    port: process.env.PGPORT,
});

const resultado = await pool.query("SELECT NOW()");

console.log("Banco conectado com sucesso!");
console.log("Horário do banco:", resultado.rows[0].now);

export default pool;
