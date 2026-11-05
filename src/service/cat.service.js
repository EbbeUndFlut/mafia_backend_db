// Businesslayer Geschäftslogik

import { toFreeCatDto } from "../dto/cat.dto.js";
import { catGetsHired, findById, getAllCats, getAllFreeCats, insertNewCat } from "../repositories/cat.repository.js";
import { findById as findClanById } from "../repositories/clan.repository.js";

export async function allCats() {
    const cats = await getAllCats()
    return cats
}

export async function createNewDon(cat) {
    cat.cat_rank_id = 10 // Don ist die ID 10!
    cat.avatar = "https://mafiacats.onrender.com/cats/12"
    return await insertNewCat(cat)
}

export async function getFreeCats() {
    const rows = await getAllFreeCats()
    return rows.map(toFreeCatDto)
}

export async function hireCat(data) {
    const [cat] = await findById(data.catId)
    const [clan] = await findClanById(data.clanId)
    if (clanHasEnoughMoney(cat, clan)) {
        await catGetsHired(clan, cat)
    } else {
        throw new Error('Clan hat nicht genug Fische')
    }
    console.log(cat, clan)
    return
}

function clanHasEnoughMoney(cat, clan) {
    return clan.fische >= cat.salary
}