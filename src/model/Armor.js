export default class Armor {
    type;
    points;
    modifier;
    constructor(type="", points="", modifier="") {
        this.type=type;
        this.points=points;
        this.modifier=modifier;
    }
}

export function getDefaultArmor() {
    return new Armor();
}