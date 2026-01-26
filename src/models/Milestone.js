//Esta clase representea un Hito de la historia

import { ScientificEntity } from "./ScientificEntity";

export class Milestone extends ScientificEntity {
    constructor(data, year) {
        super(data);
        this.year = year;
        this.relatedScientifics = [];
    }

}