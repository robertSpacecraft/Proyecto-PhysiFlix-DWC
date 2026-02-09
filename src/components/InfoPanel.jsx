export default function InfoPanel({
    selectedMilestone,
    selectedScientist,
    onSelectScientist,

    // NUEVOS (vienen desde Explore)
    onBackScientist,
    scientistLoading,
    scientistError,
}) {
    // Estado inicial (sin selección)
    if (!selectedMilestone && !selectedScientist) {
        return (
            <section className="info">
                <h2>Bienvenido a PhysiFlix</h2>
                <p>Selecciona un hito para ver su detalle.</p>
            </section>
        );
    }

    // Vista Scientist (detalle)
    if (selectedScientist) {
        return (
            <section className="info">
                <button
                    className="info__back"
                    type="button"
                    onClick={onBackScientist}
                >
                    ← Volver
                </button>

                <h2>{selectedScientist.name}</h2>

                {scientistLoading && (
                    <p className="info__status">Cargando biografía...</p>
                )}

                {!scientistLoading && scientistError && (
                    <p className="info__status info__status--error">
                        {scientistError}
                    </p>
                )}

                {/* imagen opcional para evitar roturas si viene vacío */}
                {selectedScientist.imgUrl && (
                    <img
                        src={selectedScientist.imgUrl}
                        alt={selectedScientist.name}
                        width="220"
                    />
                )}

                <p>{selectedScientist.summary}</p>

                {selectedScientist.wikiUrl && (
                    <p>
                        <a
                            href={selectedScientist.wikiUrl}
                            target="_blank"
                            rel="noreferrer"
                        >
                            Ver en Wikipedia
                        </a>
                    </p>
                )}
            </section>
        );
    }

    // Vista Milestone (detalle)
    return (
        <section className="info">
            <h2>{selectedMilestone.name}</h2>

            {selectedMilestone.imgUrl && (
                <img
                    src={selectedMilestone.imgUrl}
                    alt={selectedMilestone.name}
                    width="220"
                />
            )}

            <p>{selectedMilestone.summary}</p>

            {selectedMilestone.wikiUrl && (
                <p>
                    <a
                        href={selectedMilestone.wikiUrl}
                        target="_blank"
                        rel="noreferrer"
                    >
                        Ver en Wikipedia
                    </a>
                </p>
            )}

            <hr />
            <h3>Personas relacionadas</h3>

            {(selectedMilestone.relatedScientists?.length ?? 0) === 0 ? (
                <p className="info__empty">
                    No se han detectado personas relacionadas.
                </p>
            ) : (
                <ul className="info__people">
                    {selectedMilestone.relatedScientists.map((s) => (
                        <li key={s.id} className="info__person">
                            <button
                                className="info__personBtn"
                                type="button"
                                onClick={() => onSelectScientist(s)}
                            >
                                {s.name}
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </section>
    );
}
