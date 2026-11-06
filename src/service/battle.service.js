import { findAllOngoing, updateAfterBattle } from "../repositories/battle.repository.js";
import { changeClanId } from "../repositories/region.repository.js";

export async function resolveBattles() {
    const battles = await findAllOngoing()
    if (battles.length == 0) {
        console.log('Keine Battles zum resolven')
        return
    }
    console.log(`Es sind ${battles.length} Kämpfe am laufen`
    )
    const now = new Date()
    for (const battle of battles) {
        const battleDate = new Date(battle.battle_start_time)
        if (now.getTime() - battleDate.getTime() >= process.env.BATTLE_DURATION_MINUTES * 60 * 1000) {
            const winner = clanWars(battle.clanA_id, battle.clanB_id)
            await updateAfterBattle(winner, battle.id)
            await changeClanId({ clanId: winner, regionId: battle.region_id })
        }
    }
}


function clanWars(clanA_id, clanB_id) {
    return Math.random > 0.5 ? clanA_id : clanB_id
}