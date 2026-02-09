import { connect } from "./apiClient.js";
import { Milestone } from "../models/Milestone.js";
import { Scientist } from "../models/Scientist.js";

function isProbablyScientistTitle(title = "") {
    const t = title.toLowerCase();

    // descartes obvios (ruido típico en links)
    const blacklist = [
        "academia",
        "universidad",
        "instituto",
        "sociedad",
        "premio",
        "nobel",
        "física",
        "matemática",
        "filosofía",
        "agua",
        "aceleración",
        "energía",
        "teoría",
        "experimento",
        "ecuación",
        "ley",
        "efecto",
    ];

    if (blacklist.some((w) => t.includes(w))) return false;

    // heurística simple: nombres propios suelen tener 2+ palabras y empiezan por mayúscula
    const words = title.trim().split(/\s+/);
    if (words.length < 2) return false;

    const startsWithUpper = /^[A-ZÁÉÍÓÚÑ]/.test(title.trim());
    return startsWithUpper;
}

function buildScientistCandidatesFromLinks(links = [], limit = 8) {
    const titles = links
        .map((l) => l?.title)
        .filter(Boolean)
        .filter(isProbablyScientistTitle);

    // quitar duplicados
    const unique = Array.from(new Set(titles)).slice(0, limit);

    // creamos objetos mínimos para instanciar Scientific
    return unique.map(
        (title) =>
            new Scientist({
                pageid: `link:${title}`, // id provisional (luego lo sustituiremos por el real)
                title,
                extract: "Pulsa para cargar biografía...",
                thumbnail: { source: "/placeholder-physics.jpg" },
            })
    );
}


/**
 * Búsqueda de Hitos (eventos, teorías, experimientos, etc.)
 */

//Función auxiliar para construir el texto que se enviará a la búsqueda de wikipedia
function buildMilestoneSearchTerm({ query = "", century = "", year = "" }) {

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

        //Se añaden links para poder extraer científicos relacionados
        prop: "extracts|pageimages|links",

        pageids: pageIds.join("|"),
        exintro: "1",
        explaintext: "1",
        piprop: "thumbnail",
        pithumbsize: "320",
        redirects: "1",

        //Configuración de links
        plnamespace: "0",
        pllimit: "20",

        utf8: "1",
    };

    const data = await connect(params);

    const pagesObj = data?.query?.pages ?? {};
    return Object.values(pagesObj);
}

//Función principal que consturye el string de búsqueda sesgado a hitos de la física.
export async function searchMilestones({ query = '', century = '', year = '', limit = 10 }) {

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

            // Guardamos criterios usados
            milestone.searchMeta = { query: query.trim(), century, year };

            // Candidatos a científicos desde links (heurística inicial)
            const links = page?.links ?? [];
            milestone.relatedScientists = buildScientistCandidatesFromLinks(links, 8);

            return milestone;
        });


    } catch (err) {
        throw new Error(`Error al buscar hitos: ${err?.message ?? "Error desconocido"}`);
    }

}

//Petición de datos para el scientist
    // Carga detalle REAL de un científico por título (Wikipedia ES)
export async function fetchScientistDetailsByTitle(title = "") {
    const cleanTitle = String(title).trim();
    if (!cleanTitle) {
        throw new Error("Título de científico vacío.");
    }

    const params = {
        action: "query",
        prop: "extracts|pageimages",
        titles: cleanTitle,
        exintro: "1",
        explaintext: "1",
        redirects: "1",
        piprop: "thumbnail",
        pithumbsize: "320",
        utf8: "1",
    };

    const data = await connect(params);

    const pagesObj = data?.query?.pages ?? {};
    const page = Object.values(pagesObj)[0];

    // MediaWiki devuelve pageid -1 si no encuentra título
    if (!page || page.pageid === -1) {
        throw new Error(`No se encontró la página de "${cleanTitle}".`);
    }

    return new Scientist(page);
}


