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