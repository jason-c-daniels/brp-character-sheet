export default class WeaponOrShield {
    name;
    value;
    damage;
    hands;
    hitPoints;
    range;
    constructor(
        name="",
        value=0,
        damage="",
        hands="",
        hitPoints="",
        range=""
    ) {
        this.name = name;
        this.value = value;
        this.damage = damage;
        this.hands = hands;
        this.hitPoints = hitPoints;
        this.range = range;
    }
}

export function getDefaultWeaponsAndShields() {
    return [
        new WeaponOrShield("Brawl",0,"1D3+",1,"---","---"),
        new WeaponOrShield(),
        new WeaponOrShield(),
        new WeaponOrShield(),
        new WeaponOrShield(),
        new WeaponOrShield()
    ];
}