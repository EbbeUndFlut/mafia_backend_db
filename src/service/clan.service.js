import { clanDashboardOverview, createNewClan, findAll, findById, updateFische } from "../repositories/clan.repository.js"
import { findById as findByCatId, getClanCats } from "../repositories/cat.repository.js"
import { getClanRegion } from "../repositories/region.repository.js"

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

export async function buildDashboardClanData(clanId) {
    const [clan] = await findById(clanId)
    const [don] = await findByCatId(clan.don_id)
    const regions = await getClanRegion(clan.id)
    const mitglieder = await getClanCats(clan.id)
    const data = {
        clan,
        don,
        regions,
        mitglieder
    }
    console.log(data)
    return data
}

export async function earnFisch() {
    try {
        const clans = await findAll()
        for (const clan of clans) {
            const regions = await getClanRegion(clan.id)
            const amount = regions.reduce((fisch, ele) => fisch + ele.fish_rate, 0)
            await updateFische(amount, clan.id)
            console.log(`${clan.clan_name} hat jetzt ${amount} Fische dazu bekommen.`)
        }
    } catch (error) {
        console.log(error)
        throw error
    }
}