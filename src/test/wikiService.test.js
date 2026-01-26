import { searchMilestones } from "../api/wikiService.js";

export async function testSearchMilestones() {
    const results = await searchMilestones({
        query: "relatividad",
        year: "1905",
        century: "",
        limit: 5,
    });

    console.log("TEST searchMilestones results:", results);

    // Comprobación rápida: mostrar 1er resultado resumido
    if (results.length) {
        const first = results[0];
        console.log("FIRST MILESTONE:", {
            id: first.id,
            name: first.name,
            summary: first.summary,
            imgUrl: first.imgUrl,
            wikiUrl: first.wikiUrl,
        });
    }

    return results;
}
