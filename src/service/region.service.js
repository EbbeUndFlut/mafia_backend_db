import { toRegionWithClanDTO } from "../dto/region.dto.js";
import { changeClanId, findAll } from "../repositories/region.repository.js";

export async function allRegions() {
    const data = await findAll()

    const dtos = data.map(ele => toRegionWithClanDTO(ele))

    return dtos
}

export async function changeRegionClan(data) {
    const result = await changeClanId(data)
    return result
}