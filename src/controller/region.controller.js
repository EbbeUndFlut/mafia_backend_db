import { allRegions, changeRegionClan } from "../service/region.service.js";

export async function getAllRegions(req, res) {
    try {
        const regions = await allRegions()
        res.json(regions)
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: 'Da hat was nicht geklappt' })
    }
}

export async function changeOwner(req, res) {
    try {
        const ids = {
            clanId: req.cookies.clan,
            regionId: req.params.id
        }
        const result = await changeRegionClan(ids)
        res.json(result)

    } catch (error) {
        console.log(error)
        res.status(500).json({ error: 'Da hat was nicht geklappt' })
    }
}