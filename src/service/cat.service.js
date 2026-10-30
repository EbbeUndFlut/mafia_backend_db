// Businesslayer Geschäftslogik

import { getAllCats } from "../repositories/cat.repository.js";

export async function allCats() {
    const cats = await getAllCats()
    return cats
}