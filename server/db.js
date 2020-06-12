const Pool = require("pg").Pool;
const pool = new Pool({
    user: "postgres",
    password: "jackb1105",
    host: "localhost",
    port: 5432,
    database: "trelloclone"
})

module.exports = pool;