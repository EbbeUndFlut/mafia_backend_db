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