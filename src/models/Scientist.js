//Esta clase representa a un científico

import { ScientificEntity } from "./ScientificEntity";

export class Scientific extends ScientificEntity {
    constructor(data) {
        super(data);
        this.isNobel = data.extract?.toLowerCase().includes("nobel") || false; //Identifica si ha sido galardonado con el Nobel
        this.contributions = [];
    }
}
