export function toFreeCatDto(row) {
    return {
        id: row.id,
        catName: row.cat_name,
        skill: row.skill,
        avatarUrl: row.avatar_url,
        salary: row.salary

    }
}