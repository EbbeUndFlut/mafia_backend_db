import { allCats, createNewDon, getFreeCats } from "../service/cat.service.js";

// Hier werden die http Requests und Responses behandelt
export async function getCats(req, res) {
    const cats = await allCats()
    res.status(200).json(cats)
}

export async function createDon(req, res) {
    const result = await createNewDon(req.body)
    res.status(201).json(result)
}

export async function getAllFreeCats(req, res) {
    try {
        const result = await getFreeCats()
        res.json(result)
    } catch (error) {
        res.status(500).json({ error: "Housten wir haben ein Problem" })
    }
}