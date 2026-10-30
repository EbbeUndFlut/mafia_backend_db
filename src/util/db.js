import mysql from 'mysql2/promise'
// process.loadEnvFile('.env')
export const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    connectionLimit: 400,
    waitForConnections: true
})