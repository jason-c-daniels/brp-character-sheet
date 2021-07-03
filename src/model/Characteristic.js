export default class Characteristic {
    name;
    value;
    roll;
    rollName;
    constructor( name="", value=0, rollName=""
    ) {
        this.name=name;
        this.value=value;
        this.rollName=rollName;
        this.roll=this.value*5;
    }
}

export function getDefaultCharacteristics() {

    return [
        new Characteristic("STR", 0, "Effort Roll"),
        new Characteristic("CON", 0, "Stamina Roll"),
        new Characteristic("SIZ", 10),
        new Characteristic("INT", 0, "Idea Roll"),
        new Characteristic("POW", 0, "Luck Roll"),
        new Characteristic("DEX", 0, "Agility Roll"),
        new Characteristic("APP", 0, "Charisma Roll")
    ];

}