import  {getDefaultCharacteristics} from "./Characteristic";

export default class DerivedCharacteristic {
    move;
    maxHitPoints;
    hitPoints;
    maxPowerPoints;
    powerPoints;
    damageBonus;

    constructor(
        characteristics=getDefaultCharacteristics()
    ) {
        const str = getItemByName(characteristics, 'STR').value;
        const con = getItemByName(characteristics, 'CON').value;
        const pow = getItemByName(characteristics, 'POW').value;
        const siz = getItemByName(characteristics, 'SIZ').value;
        console.log('siz='+siz.toString());
        this.move=10;
        this.maxHitPoints=Math.round((con+siz)/2);
        this.hitPoints=this.maxHitPoints;
        this.maxPowerPoints=pow;
        this.powerPoints=pow;
        let db=str+siz;
        console.log('db='+db.toString());
        if (db <= 12) {this.damageBonus="-1D6";}
        else if (db <= 16) {this.damageBonus="-1D4";}
        else if (db <= 24) {this.damageBonus="None";}
        else if (db <= 32) {this.damageBonus="+1D4";}
        else if (db <= 40) {this.damageBonus="+1D6";}
        else if (db <= 56) {this.damageBonus="+2D6";}
    }
}

function getItemByName(array,nameKey) {
    for (let i=0; i < array.length; i++) {
        if (array[i].name === nameKey) {
            return array[i];
        }
    }
}

export function getDefaultDerivedCharacteristics(characteristics=getDefaultCharacteristics()) {
    return new DerivedCharacteristic(characteristics);
}

