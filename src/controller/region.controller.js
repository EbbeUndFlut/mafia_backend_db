import { allRegions } from "../service/region.service.js";

export async function getAllRegions(req, re) {
    try {
        const regions = await allRegions()
        re.json(regions)
    } catch (err) {
        console.log(err)
        re.status(500).json({ error: 'Da hat was nicht geklappt' })
    }
}