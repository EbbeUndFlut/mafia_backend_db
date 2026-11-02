// Hier Datenzugriffsschicht Kommunikations mit der Datenbank
import { pool } from "../util/db.js"
export async function getAllCats() {
    const conn = await pool.getConnection()
    try {
        const [rows] = await conn.query('SELECT * FROM cat LIMIT 2')

        return rows
    } catch (err) {
        throw err
    } finally {
        conn.release()
    }
}