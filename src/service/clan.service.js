import { clanDashboardOverview, createNewClan } from "../repositories/clan.repository.js"

export async function newClan(data) {
    const [cat, clan] = data
    cat.rank = 10
    cat.avatar = "https://mafiacats.onrender.com/cats/4"
    clan.fische = 100
    return await createNewClan(clan, cat)
}

export async function getDashboardClans() {
    return await clanDashboardOverview()
}