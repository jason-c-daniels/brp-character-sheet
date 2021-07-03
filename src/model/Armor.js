export default class Armor {
    type;
    points;
    modifier;
    constructor(type="", points=0, modifier="") {
        this.type=type;
        this.points=points;
        this.modifier=modifier;
    }
}

export function getDefaultArmor() {
    return new Armor();
}