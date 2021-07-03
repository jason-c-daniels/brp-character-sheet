import Characteristics from "./Characteristic";

export default class DerivedCharacteristic {
    move;
    maxHitPoints;
    hitPoints;
    maxPowerPoints;
    powerPoints;
    damageBonus;

    constructor(
        characteristics=new Characteristics()
    ) {
        this.move=10;
        this.maxHitPoints=Math.round((characteristics.constitution+characteristics.size)/2);
        this.hitPoints=this.maxHitPoints;
        this.maxPowerPoints=characteristics.power;
        this.powerPoints=characteristics.power;
        let db=characteristics.strength+characteristics.size;
        if (db <= 12) {this.damageBonus="-1D6";}
        else if (db <= 16) {this.damageBonus="-1D4";}
        else if (db <= 24) {this.damageBonus="None";}
        else if (db <= 32) {this.damageBonus="+1D4";}
        else if (db <= 40) {this.damageBonus="+1D6";}
        else if (db <= 56) {this.damageBonus="+2D6";}
    }
}

export function getDefaultDerivedCharacteristics(characteristics=new Characteristics()) {
    return new DerivedCharacteristic(characteristics);
}

