//Esta clase representea un Hito de la historia

import { ScientificEntity } from "./ScientificEntity";

export class Milestone extends ScientificEntity {
    constructor(data, timeLabel) {
        super(data);
        this.timeLabel = timeLabel;
        this.relatedScientists = [];
    }

}