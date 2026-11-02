import { pool } from "../util/db.js";

export async function findAll() {
    const conn = await pool.getConnection()
    try {
        const [rows] = await conn.query('SELECT * FROM region')
        return rows
    } catch (err) {
        throw err
    } finally {
        conn.release()
    }
}