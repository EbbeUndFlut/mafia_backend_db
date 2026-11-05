export function toRegionWithClanDTO(row) {
    return {
        region: {
            id: row.region_id,
            name: row.region_name,
            fish_rate: row.fish_rate,
            battle: row.battle
        },
        clan: {
            id: row.clan_id,
            name: row.clan_name
        }
    }
}