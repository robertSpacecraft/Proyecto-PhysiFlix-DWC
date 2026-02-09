import { useState } from "react";
import SidebarFilter from "../components/SidebarFilter.jsx";
import Timeline from "../components/TimeLine.jsx";
import InfoPanel from "../components/InfoPanel.jsx";
import useMilestones from "../hooks/useMilestones.js";

// IMPORT NUEVO (lo crearemos en wikiService.js cuando toque)
import { fetchScientistDetailsByTitle } from "../api/wikiService.js";

export default function Explore() {
    const [selectedMilestone, setSelectedMilestone] = useState(null);
    const [selectedScientist, setSelectedScientist] = useState(null);

    // NUEVOS: estado de carga/error del panel Scientist
    const [scientistLoading, setScientistLoading] = useState(false);
    const [scientistError, setScientistError] = useState("");

    // Search es la función que dispara la llamada a apiClient cuando el usuario interactúe con los filtros.
    const { milestones, loading, error, message, search } = useMilestones();

    // Recojo el resultado de filtros desde SidebarFilter
    function handleSearch(filters) {
        console.log("SEARCH FILTERS:", filters);

        setSelectedMilestone(null);
        setSelectedScientist(null);

        // limpiamos estado del panel scientist también
        setScientistLoading(false);
        setScientistError("");

        search(filters);
    }

    // NUEVO: al pulsar una persona, cargamos su biografía automáticamente
    async function handleSelectScientist(s) {
        // Cambiamos a vista Scientist inmediatamente (para UX)
        setSelectedScientist(s);
        setScientistError("");
        setScientistLoading(true);

        try {
            // NOTA: esta función la implementaremos en wikiService.js
            const fullScientist = await fetchScientistDetailsByTitle(s.name);
            setSelectedScientist(fullScientist);
        } catch (e) {
            setScientistError(e?.message ?? "No se pudo cargar la biografía.");
        } finally {
            setScientistLoading(false);
        }
    }

    // NUEVO: volver desde Scientist a Milestone
    function handleBackScientist() {
        setSelectedScientist(null);
        setScientistLoading(false);
        setScientistError("");
    }

    return (
        <div className="explore-layout">
            <SidebarFilter onSearch={handleSearch} />

            <main className="explore-main">
                <Timeline
                    milestones={milestones}
                    loading={loading}
                    error={error}
                    message={message}
                    onSelectMilestone={(m) => {
                        setSelectedMilestone(m);
                        setSelectedScientist(null);

                        // limpiamos estado scientist al cambiar de hito
                        setScientistLoading(false);
                        setScientistError("");
                    }}
                />

                <InfoPanel
                    selectedMilestone={selectedMilestone}
                    selectedScientist={selectedScientist}
                    onSelectScientist={handleSelectScientist}
                    onBackScientist={handleBackScientist}
                    scientistLoading={scientistLoading}
                    scientistError={scientistError}
                />
            </main>
        </div>
    );
}
