//Esta clase representa a un científico

import { ScientificEntity } from "./ScientificEntity.js";

export class Scientist extends ScientificEntity {
    constructor(data) {
        super(data);
        this.isNobel = data.extract?.toLowerCase().includes("nobel") || false; //Identifica si ha sido galardonado con el Nobel
        this.contributions = [];
    }
}
