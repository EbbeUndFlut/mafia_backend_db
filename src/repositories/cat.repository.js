// Hier Datenzugriffsschicht Kommunikations mit der Datenbank
import { connection } from "../util/db.js"
export async function getAllCats() {
    const db = await connection()
    try {
        const [rows] = await db.query('SELECT * FROM cat')
        return rows
    } catch (error) {
        throw error
    } finally {
        db.end()
    }
}