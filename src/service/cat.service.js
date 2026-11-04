// Businesslayer Geschäftslogik

import { toFreeCatDto } from "../dto/cat.dto.js";
import { getAllCats, getAllFreeCats, insertNewCat } from "../repositories/cat.repository.js";

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