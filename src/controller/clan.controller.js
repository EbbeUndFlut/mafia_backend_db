import { buildDashboardClanData, getDashboardClans, newClan } from "../service/clan.service.js";

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

export function setClanCookie(req, res) {
    const clanId = req.params.id
    res.cookie("clan", clanId, {
        // partitioned: true,
        // secure: true,
        // sameSite: "none"
    })
    res.sendStatus(200)
}

export async function getDashboardData(req, res) {
    try {
        const clanId = req.cookies.clan
        const dashboardData = await buildDashboardClanData(clanId)
        res.json(dashboardData)
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Fehler" })
    }
}