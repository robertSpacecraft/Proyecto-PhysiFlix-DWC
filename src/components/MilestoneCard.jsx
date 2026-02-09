export default function MilestoneCard({ milestone, onSelect }) {
    return (
        <button
            type="button"
            className="milestoneCard"
            onClick={() => onSelect(milestone)}
        >
            <img
                className="milestoneCard__img"
                src={milestone.imgUrl}
                alt={milestone.name}
                width="260"
            />

            <h3 className="milestoneCard__title">{milestone.name}</h3>

            <p className="milestoneCard__summary">
                {milestone.getShortSummary(180)}
            </p>
        </button>
    );
}
