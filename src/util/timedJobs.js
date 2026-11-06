import { resolveBattles } from "../service/battle.service.js"
import { earnFisch } from "../service/clan.service.js"
try {
    setInterval(async () => await resolveBattles(), 5000)
    setInterval(async () => await earnFisch(), 9000)
} catch (error) {
    console.log(error)
}