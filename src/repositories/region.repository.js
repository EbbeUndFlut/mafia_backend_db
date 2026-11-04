import { pool } from "../util/db.js";

export async function findAll() {
    const conn = await pool.getConnection()
    try {
        const [rows] = await conn.query('SELECT *, region.id as region_id , clan.id as clan_id FROM region left join clan on clan.id = region.clan_id')
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