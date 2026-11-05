// Hier Datenzugriffsschicht Kommunikations mit der Datenbank
import { pool } from "../util/db.js"
export async function getAllCats() {
    const conn = await pool.getConnection()
    try {
        const [rows] = await conn.query('SELECT * FROM cat')

        return rows
    } catch (err) {
        throw err
    } finally {
        conn.release()
    }
}

export async function insertNewCat(cat) {
    const [result] = await pool.execute('INSERT INTO cat (cat_name, cat_rank_id, avatar_url) VALUES (:name, :cat_rank_id, :avatar)', cat)
    return result
}

export async function getAllFreeCats() {
    try {
        const [rows] = await pool.execute('SELECT * FROM cat WHERE clan_id IS NULL')
        return rows
    } catch (error) {
        console.log(error)
        throw error
    }
}

export async function findById(id) {
    try {
        const [row] = await pool.execute('SELECT * FROM cat WHERE id = ?', [id])
        return row
    } catch (error) {
        console.log(error)
        throw error
    }
}

export async function catGetsHired(clan, cat) {
    const conn = await pool.getConnection()
    try {
        await conn.beginTransaction()
        const [clanRow] = await conn.execute('UPDATE clan set fische = fische - ? where id = ?', [cat.salary, clan.id])

        const [catRow] = await conn.execute('UPDATE cat set clan_id = ? where id = ?', [clan.id, cat.id])


        await conn.commit()
        return { clanRow, catRow }
    } catch (error) {
        await conn.rollback()
        throw error
    } finally {
        conn.release()
    }
}