//Clase base, de ella heredan Milestone y Scientific

export class ScientificEntity {
    constructor(data) {
        this.id= data.pageid;
        this.name = data.title;
        this.summary = data.extract || "No contiene descripción";
        this.imgUrl = data.thumbnail?.source || "/placeholder-physics.jpg";
        this.wikiUrl = `https://es.wikipedia.org/?curid=${data.pageid}`;
    }

    //Devuelve un fragmento de la descripción, se usará en la vista previa.
    getShortSummary(length = 100) {
        return this.summary.length > length ? this.summary.substring(0, length) + "..." : this.summary;
    }
}