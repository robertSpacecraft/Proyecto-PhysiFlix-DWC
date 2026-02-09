import { useState } from "react";
import { searchMilestones } from "../api/wikiService.js";

export default function useMilestones() {
    const [milestones, setMilestones] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [message, setMessage] = useState(
        "Bienvenido a PhysiFlix, el lugar ideal para descubrir la historia de la física y sus protagonistas."
    );

    async function search(filters) {
        setLoading(true);
        setError("");
        setMessage("Buscando hitos...");
        setMilestones([]);

        try {
            const results = await searchMilestones(filters);

            if (!results.length) {
                setMessage("No se han encontrado hitos con los criterios seleccionados.");
            } else {
                setMilestones(results);
                setMessage("");
            }
        } catch (err) {
            setError(err?.message ?? "Error al buscar hitos.");
            setMessage("");
        } finally {
            setLoading(false);
        }
    }

    return {
        milestones,
        loading,
        error,
        message,
        search,
        setMessage, // opcional: por si Explore quiere cambiar mensajes puntuales
    };
}
