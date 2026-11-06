import { pool } from "../util/db.js";

export async function createNewBattle(clanA, clanB, region) {
    const conn = await pool.getConnection()
    try {
        await conn.beginTransaction()
        // erst daten in die region battle table schreiben
        const [battle] = await conn.execute("INSERT INTO regionbattle (battle_ongoing, battle_start_time,region_id) VALUES (true,NOW(),?)", [region])
        const battleId = battle.insertId
        //wir beschränken uns erstmal auf genau 2 Clans -> wir können es auch mit arrays lösen aber dazu lieber später mehr :D
        const [row] = await conn.execute('INSERT INTO clan_regionbattle (clan_id,regionbattle_id) VALUES (?,?),(?,?)', [clanA, battleId, clanB, battleId])


        await conn.commit()

        return { battle, row }

    } catch (error) {
        await conn.rollback()
        console.log(error)
        throw error
    } finally {
        conn.release()
    }
}

export async function findAllOngoing() {
    try {
        const [rows] = await pool.execute('SELECT rb.*, MIN(crb.clan_id) AS clanA_id, MAX(crb.clan_id)AS clanB_id from regionbattle rb JOIN clan_regionbattle crb on crb.regionbattle_id = rb.id WHERE battle_ongoing = true group by rb.id')
        return rows
    } catch (error) {
        console.log(error)
        throw error
    }
}

export async function updateAfterBattle(winnerId, battleId) {
    try {
        const [row] = await pool.execute('UPDATE regionbattle set battle_ongoing = false, winner_id=? where id = ? ', [winnerId, battleId])
        return row
    } catch (error) {
        console.log(error)
        throw error
    }
}