import { toRegionWithClanDTO } from "../dto/region.dto.js";
import { createNewBattle } from "../repositories/battle.repository.js";
import { changeClanId, findAll, findById } from "../repositories/region.repository.js";

export async function allRegions() {
    const data = await findAll()

    const dtos = data.map(toRegionWithClanDTO)

    return dtos
}

export async function changeRegionClan(data) {
    // erst prüfen ob schon ein clan diese region besetzt
    const [region] = await findById(data.regionId)
    //wenn die region unbesetzt dann einfach nur dem clan zuweisen
    if (!region.clan_id) {
        const result = await changeClanId(data)
        return result
    } else {
        //wenn region schon besetzt ist, soll ein region kampf beginnen -> tabellen regionbattle und clan_regionbattle
        //

        const result = await createNewBattle(data.clanId, region.clan_id, region.id)
        return result
    }

}