import { pool } from "../util/db.js";

export async function findAll() {
    const conn = await pool.getConnection()
    try {
        const [rows] = await conn.query('SELECT *, region.id as region_id , clan.id as clan_id, exists(SELECT 1 FROM regionbattle rb WHERE rb.region_id = region.id AND rb.battle_ongoing = true) AS battle FROM region left join clan on clan.id = region.clan_id')
        return rows
    } catch (err) {
        console.log(err)
        throw err
    } finally {
        conn.release()
    }
}

export async function changeClanId(ids) {
    try {
        const sql = 'UPDATE region SET clan_id = ? WHERE id = ?'
        const [row] = await pool.execute(sql, [ids.clanId, ids.regionId])
        return row
    } catch (err) {
        console.log(err)
        throw err
    }
}

export async function findById(id) {
    try {
        const [row] = await pool.execute('SELECT * FROM region WHERE id = ?', [id])
        return row
    } catch (error) {
        console.log(error)
        throw error
    }
}

export async function getClanRegion(clanId) {
    try {
        const [row] = await pool.execute('SELECT * FROM region WHERE clan_id = ?', [clanId])
        return row
    } catch (error) {
        console.log(error)
        throw error
    }
}