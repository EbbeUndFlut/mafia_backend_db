// Businesslayer Geschäftslogik

import { getAllCats, insertNewCat } from "../repositories/cat.repository.js";

export async function allCats() {
    const cats = await getAllCats()
    return cats
}

export async function createNewDon(cat) {
    cat.cat_rank_id = 10 // Don ist die ID 10!
    cat.avatar = "https://mafiacats.onrender.com/cats/12"
    return await insertNewCat(cat)
}