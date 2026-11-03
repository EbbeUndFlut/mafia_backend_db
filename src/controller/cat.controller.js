import { allCats, createNewDon } from "../service/cat.service.js";

// Hier werden die http Requests und Responses behandelt
export async function getCats(req, res) {
    const cats = await allCats()
    res.status(200).json(cats)
}

export async function createDon(req, res) {
    const result = await createNewDon(req.body)
    res.status(201).json(result)
}