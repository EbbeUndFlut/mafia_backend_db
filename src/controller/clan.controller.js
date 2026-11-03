import { newClan } from "../service/clan.service.js";

export async function createNewClan(req, res) {
    try {
        const result = await newClan(req.body)
        res.status(201).json(result)

    } catch (err) {
        res.sendStatus(500)
    }
}