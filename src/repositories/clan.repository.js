import { pool } from "../util/db.js";

export async function createNewClan(clan, cat) {
    const conn = await pool.getConnection()

    try {
        await conn.beginTransaction()

        // 1. Katze anlegen als Don
        const [catRes] = await conn.execute('INSERT INTO cat (cat_name,cat_rank_id,avatar_url) VALUES (:name,:rank,:avatar)', cat)


        clan.don_id = catRes.insertId

        // 2. Clan anlegen
        const [clanRes] = await conn.execute('INSERT INTO clan (clan_name, don_id,fische) VALUES (:name,:don_id,:fische)', clan)
        const clanId = clanRes.insertId

        // 3. Katze updaten
        await conn.execute('UPDATE cat SET clan_id = ? WHERE id = ?', [clanId, clan.don_id])

        await conn.commit()
        return { catId: clan.don_id, clanId }
    } catch (err) {
        await conn.rollback()
        throw err
    } finally {
        conn.release()
    }
}

export async function findAll() {
    try {
        const [rows] = await pool.execute('SELECT * FROM clan')
        return rows
    } catch (error) {
        throw error
    }
}

export async function clanDashboardOverview() {

    const sql = `
    SELECT c.id, c.clan_name,c.fische,d.cat_name as donName, d.avatar_url as donAvatar, (SELECT COUNT(*) FROM cat m WHERE m.clan_id = c.id)as mitglieder, (SELECT COUNT(*) FROM region r where r.clan_id = c.id )as regionen FROM clan c LEFT JOIN cat d ON d.id = c.don_id GROUP BY c.id, c.clan_name, d.cat_name, d.avatar_url`
    try {
        const [rows] = await pool.execute(sql)
        return rows
    } catch (error) {
        throw error
    }
}

export async function findById(id) {
    try {
        const [row] = await pool.execute('SELECT * FROM clan WHERE id = ?', [id])
        return row
    } catch (error) {
        console.log(error)
        throw error
    }
}

export async function updateFische(amount, clanId) {
    try {
        const [row] = await pool.execute('UPDATE clan SET fische = fische + ? WHERE id = ?', [amount, clanId])
        return row
    } catch (error) {
        console.log(error)
        throw error
    }
}