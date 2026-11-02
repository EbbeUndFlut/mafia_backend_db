import { allRegions } from "../service/region.service.js";

export async function getAllRegions(req, re) {
    try {
        const regions = await allRegions()
        re.status(200).json(regions)

    } catch (err) {
        re.sendStatus(500)
    }
}