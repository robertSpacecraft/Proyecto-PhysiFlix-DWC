import { useMemo } from "react";

const CENTURY_OPTIONS = [
    { value: "", label: "Todos" },

    // a.C. (ampliable)
    { value: "IV_BC", label: "IV a.C." },
    { value: "II_BC", label: "II a.C." },

    // d.C.
    { value: "I_AD", label: "I" },
    { value: "II_AD", label: "II" },
    { value: "III_AD", label: "III" },
    { value: "IV_AD", label: "IV" },
    { value: "V_AD", label: "V" },
    { value: "VI_AD", label: "VI" },
    { value: "VII_AD", label: "VII" },
    { value: "VIII_AD", label: "VIII" },
    { value: "IX_AD", label: "IX" },
    { value: "X_AD", label: "X" },
    { value: "XI_AD", label: "XI" },
    { value: "XII_AD", label: "XII" },
    { value: "XIII_AD", label: "XIII" },
    { value: "XIV_AD", label: "XIV" },
    { value: "XV_AD", label: "XV" },
    { value: "XVI_AD", label: "XVI" },
    { value: "XVII_AD", label: "XVII" },
    { value: "XVIII_AD", label: "XVIII" },
    { value: "XIX_AD", label: "XIX" },
    { value: "XX_AD", label: "XX" },
    { value: "XXI_AD", label: "XXI" },
];

function romanToInt(roman) {
    const map = { I: 1, V: 5, X: 10, L: 50, C: 100, D: 500, M: 1000 };
    let total = 0;
    let prev = 0;

    for (let i = roman.length - 1; i >= 0; i--) {
        const curr = map[roman[i]] ?? 0;
        if (curr < prev) total -= curr;
        else total += curr;
        prev = curr;
    }
    return total;
}

export function parseCenturyValue(value) {
    if (!value) return { roman: "", era: "", isBC: false };

    const [roman, era] = value.split("_"); // "IV_BC" -> ["IV","BC"]
    return { roman, era, isBC: era === "BC" };
}

function buildYearOptions(centuryValue) {
    const { roman, isBC } = parseCenturyValue(centuryValue);
    if (!roman) return [];

    const c = romanToInt(roman);
    if (!c) return [];

    let start;
    let end;

    if (isBC) {
        start = c * 100;
        end = c * 100 - 99; // IV a.C.: 400..301
    } else {
        start = (c - 1) * 100;
        end = (c - 1) * 100 + 99;
    }

    const years = [];
    if (isBC) {
        for (let y = start; y >= end; y--) years.push(y);
    } else {
        for (let y = start; y <= end; y++) years.push(y);
    }

    return years.map((y) => ({
        value: String(y),
        label: isBC ? `${y} a.C.` : String(y),
    }));
}

/**
 * Hook para obtener:
 * - opciones de siglo
 * - opciones de año (dependen del siglo seleccionado)
 * - parseCenturyValue para extraer era/romano
 */
export default function useCenturyYears(centuryValue) {
    const yearOptions = useMemo(() => buildYearOptions(centuryValue), [centuryValue]);

    return {
        centuryOptions: CENTURY_OPTIONS,
        yearOptions,
        parseCenturyValue,
    };
}
