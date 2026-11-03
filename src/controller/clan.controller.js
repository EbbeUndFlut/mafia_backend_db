import { getDashboardClans, newClan } from "../service/clan.service.js";

export async function createNewClan(req, res) {
    try {
        const result = await newClan(req.body)
        res.status(201).json(result)

    } catch (err) {
        res.sendStatus(500)
    }
}

export async function getClans(req, res) {
    try {
        const result = await getDashboardClans()
        res.status(200).json(result)
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
}