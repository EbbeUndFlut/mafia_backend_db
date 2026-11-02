import { findAll } from "../repositories/region.repository.js";

export async function allRegions() {
    return await findAll()
}