import { useState } from "react";
import useCenturyYears from "../hooks/useCenturyYears.js";

export default function SidebarFilter({ onSearch }) {
    const [centuryValue, setCenturyValue] = useState("");
    const [yearValue, setYearValue] = useState("");
    const [query, setQuery] = useState("");
    const [nobelOnly, setNobelOnly] = useState(false);

    const { centuryOptions, yearOptions, parseCenturyValue } = useCenturyYears(centuryValue);

    const showYearSelect = centuryValue !== "";
    const { roman: centuryRoman, era } = parseCenturyValue(centuryValue);

    function handleCenturyChange(e) {
        const nextCentury = e.target.value;
        setCenturyValue(nextCentury);
        setYearValue("");
    }

    function handleSubmit(e) {
        e.preventDefault();

        onSearch({
            century: centuryRoman,
            era,
            year: yearValue,
            yearLabel: yearValue ? (era === "BC" ? `${yearValue} a.C.` : yearValue) : "",
            query,
            nobelOnly,
        });
    }

    return (
        <aside className="sidebar">
            <form className="sidebar__form" onSubmit={handleSubmit}>
                <div className="sidebar__field">
                    <label className="sidebar__label" htmlFor="century">
                        Siglo
                    </label>
                    <select
                        id="century"
                        className="sidebar__select"
                        value={centuryValue}
                        onChange={handleCenturyChange}
                    >
                        {centuryOptions.map((opt) => (
                            <option key={opt.value || "all"} value={opt.value}>
                                {opt.label}
                            </option>
                        ))}
                    </select>
                </div>

                {showYearSelect && (
                    <div className="sidebar__field">
                        <label className="sidebar__label" htmlFor="year">
                            Año (opcional)
                        </label>
                        <select
                            id="year"
                            className="sidebar__select"
                            value={yearValue}
                            onChange={(e) => setYearValue(e.target.value)}
                        >
                            <option value="">-- Cualquiera --</option>
                            {yearOptions.map((opt) => (
                                <option key={opt.value} value={opt.value}>
                                    {opt.label}
                                </option>
                            ))}
                        </select>
                    </div>
                )}

                <div className="sidebar__field">
                    <label className="sidebar__label" htmlFor="query">
                        Buscar
                    </label>
                    <input
                        id="query"
                        className="sidebar__input"
                        type="text"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Newton, relatividad, fotoeléctrico..."
                    />
                </div>

                <div className="sidebar__field sidebar__field--checkbox">
                    <label className="sidebar__checkboxLabel">
                        <input
                            className="sidebar__checkbox"
                            type="checkbox"
                            checked={nobelOnly}
                            onChange={(e) => setNobelOnly(e.target.checked)}
                        />
                        Premio Nobel
                    </label>
                </div>

                <button className="sidebar__button" type="submit">
                    Buscar
                </button>
            </form>
        </aside>
    );
}
