// Hier Datenzugriffsschicht Kommunikations mit der Datenbank
import { pool } from "../util/db.js"
export async function getAllCats() {
    const conn = await pool.getConnection()
    try {
        const res = await conn.query('SELECT * FROM cat')
        console.log(res)
        const [rows] = res
        return rows
    } catch (err) {
        throw err
    } finally {
        conn.release()
    }
}