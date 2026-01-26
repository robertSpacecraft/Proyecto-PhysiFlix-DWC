import { connect } from "./apiClient.js";
import { Milestone } from "../models/Milestone.js";

/**
 * Búsqueda de Hitos (eventos, teorías, experimientos, etc.)
 */

//Función auxiliar para construir el texto que se enviará a la búsqueda de wikipedia
function buildMilestoneSearchTerm({query = "", century = "", year = ""}){

    const trimmed = query.trim();

    let term = "historia de la física"; //Para que solo busque temas relacionados con la historia de la física.

    if (trimmed) {
        term += ` ${trimmed}`; 
    }

    if (year) {
        term += ` ${year}`;

    } else if (century) {

        term += ` siglo ${century}`;
    }

    term += " (teoría OR experimento OR efecto OR ley OR descubrimiento OR ecuación)"; //Definido así es más probable que los resultados de la búsqueda sean hitos.

    return term;
}

//Función para obtener detalles completos de las páginas filtradas en una sola llamada.
async function fetchPagesDetailsByIds(pageIds = []) {

    if (!pageIds.length) return [];

    const params = {
        action: "query",
        prop: "extracts|pageimages",
        pageids: pageIds.join("|"),
        exintro: "1",
        explaintext: "1",
        piprop: "thumbnail",
        pithumbsize: "320",
        redirects: "1",
        utf8: "1",
    };

    const data = await connect(params);

    const pagesObj = data?.query?.pages ?? {};
    return Object.values(pagesObj);
}

//Función principal que consturye el string de búsqueda sesgado a hitos de la física.
export async function searchMilestones({query  = '', century = '', year = '', limit = 10}) {

    try {
        const searchTerm = buildMilestoneSearchTerm({ query, century, year });

        const searchParams = {
            action: "query",
            list: "search",
            srsearch: searchTerm,
            srlimit: String(limit),
            utf8: "1",
        };

        const searchData = await connect(searchParams);
        const searchResults = searchData?.query?.search ?? [];

        const pageIds = searchResults.map((item) => item.pageid).filter(Boolean);

        const pages = await fetchPagesDetailsByIds(pageIds);

        const pagesById = new Map(pages.map((p) => [p.pageid, p]));
        const orderedPages = pageIds.map((id) => pagesById.get(id)).filter(Boolean);

        const timeLabel = year
        ? String(year)
        : century
            ? `siglo ${century}`
            : '';
        
        return orderedPages.map((page) => {
            const milestone = new Milestone(page, timeLabel);

            milestone.searchMeta = { query: query.trim(), century, year };
            return milestone;
        });

    } catch (err) {
        throw new Error(`Error al buscar hitos: ${err?.message ?? "Error desconocido"}`);
    }
}


