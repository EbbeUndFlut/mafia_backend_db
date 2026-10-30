// Hier Datenzugriffsschicht Kommunikations mit der Datenbank
import { connection } from "../util/db.js"
export async function getAllCats() {
    const db = await connection()
    const [rows] = await db.query('SELECT * FROM cat')
    return rows
}