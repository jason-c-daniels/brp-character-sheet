import {getDefaultCharacteristics} from "./Characteristic";
import {getDefaultSkills} from "./Skill";
import {getItemByName} from "../components/shared/util/utilities";

export default class WeaponOrShield {
    name;
    value;
    damage;
    hands;
    hitPoints;
    range;
    constructor(
        name="",
        value="",
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

export function getDefaultWeaponsAndShields(skills = getDefaultSkills()) {
    let brawl = getItemByName(skills, "Brawl (25)");

    return [
        new WeaponOrShield("Brawl",brawl ? brawl.value : 25,"1D3+DB",1,"---","---"),
        new WeaponOrShield(),
        new WeaponOrShield(),
        new WeaponOrShield(),
        new WeaponOrShield(),
        new WeaponOrShield(),
        new WeaponOrShield(),
        new WeaponOrShield(),
        new WeaponOrShield(),
        new WeaponOrShield(),
        new WeaponOrShield(),
        new WeaponOrShield()
    ];
}

export function getBlankWeaponsAndShields() {
    let cs=getDefaultWeaponsAndShields();
    cs.forEach(function(part) {
        if (part.name !== "Brawl") {
            part.hands = "";
            part.value = "";
        }
        else {
            part.value ="";
        }
    });
    return cs;
}