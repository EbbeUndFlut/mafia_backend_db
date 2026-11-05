import { toRegionWithClanDTO } from "../dto/region.dto.js";
import { changeClanId, findAll } from "../repositories/region.repository.js";

export async function allRegions() {
    const data = await findAll()

    const dtos = data.map(ele => toRegionWithClanDTO(ele))

    return dtos
}

export async function changeRegionClan(data) {
    // erst prüfen ob schon ein clan diese region besetzt

    //wenn die region unbesetzt dann einfach nur dem clan zuweisen
    const result = await changeClanId(data)

    //wenn region schon besetzt ist, soll ein region kampf beginnen -> tabellen regionbattle und clan_regionbattle
    return result
}