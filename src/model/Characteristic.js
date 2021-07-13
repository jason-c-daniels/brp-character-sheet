import DiceRoller from 'rpg-dice-roller';

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
    var diceRoller = new DiceRoller.DiceRoller();
    console.log("diceRoller.roll(\"3d6\")="+diceRoller.roll("3d6").total);
    return [
        new Characteristic("STR", diceRoller.roll("3d6").total, "Effort Roll"),
        new Characteristic("CON", diceRoller.roll("3d6").total, "Stamina Roll"),
        new Characteristic("SIZ", diceRoller.roll("2d6+6").total),
        new Characteristic("INT", diceRoller.roll("2d6+6").total, "Idea Roll"),
        new Characteristic("POW", diceRoller.roll("3d6").total, "Luck Roll"),
        new Characteristic("DEX", diceRoller.roll("3d6").total, "Agility Roll"),
        new Characteristic("APP", diceRoller.roll("3d6").total, "Charisma Roll")
    ];

}

export function getBlankCharacteristics() {
    let cs=getDefaultCharacteristics();
    cs.forEach(function(part) {
        part.value="";
        part.roll="";
    });
    return cs;
}