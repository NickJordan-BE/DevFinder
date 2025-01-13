require("dotenv").config();

const { Pool } = require("pg");

const pool = new Pool({
    user: process.env.PGUSER,   
    host: process.env.PGHOST || 'localhost', 
    database: process.env.PGNAME,   
    password: process.env.PGPASSWORD,
    port: process.env.PGPORT || 5432,
});

module.exports = {
    query: (text: string, params: any) => pool.query(text, params),
}