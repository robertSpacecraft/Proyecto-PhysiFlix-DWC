import MilestoneCard from "./MilestoneCard.jsx";

export default function Timeline({
    milestones,
    loading,
    error,
    message,
    onSelectMilestone,
}) {
    return (
        <section className="timeline">
            <div className="timeline__header">
                <h2 className="timeline__title">Resultados</h2>
                {!loading && !error && milestones.length > 0 && (
                    <span className="timeline__count">{milestones.length}</span>
                )}
            </div>

            {loading && <p className="timeline__status">Cargando...</p>}

            {!loading && error && <p className="timeline__status timeline__status--error">{error}</p>}

            {!loading && !error && milestones.length === 0 && (
                <p className="timeline__status">{message}</p>
            )}

            {!loading && !error && milestones.length > 0 && (
                <div className="timeline__list">
                    {milestones.map((m) => (
                        <MilestoneCard key={m.id} milestone={m} onSelect={onSelectMilestone} />
                    ))}
                </div>
            )}
        </section>
    );
}
