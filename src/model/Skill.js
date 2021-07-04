import {getDefaultCharacteristics} from "./Characteristic";
import {getItemByName} from "./DerivedCharacteristic";

export default class Skill {
    name;
    value;
    used;
    constructor(name="", value=0, used=0) {
        this.name = name;
        this.value = value;
        this.used = used;
    }
}

export function getDefaultSkills(characteristics=getDefaultCharacteristics()) {
    let int=getItemByName(characteristics,'INT').value;
    let pow=getItemByName(characteristics,'POW').value;
    let dex=getItemByName(characteristics,'DEX').value;
    console.log("dex="+dex);
    return [
        new Skill("Appraise (15)", 15),
        new Skill("Art (___________) (05)", 5),
        new Skill("Artillery (___________) (var)"),
        new Skill("Bargain (05)",5),
        new Skill("Brawl (25)",25),
        new Skill("Climb (40)",40),
        new Skill("Command (05)",5),
        new Skill("Craft (___________) (05)",5),
        new Skill("Demolition (01)", 1),
        new Skill("Disguise (01)", 1),
        new Skill("Dodge (DEX×2)", dex*2),
        new Skill("Drive (___________) (var)"),
        new Skill("Energy Weapon (______) (var)"),
        new Skill("Etiquette (05)",5),
        new Skill("Fast Talk (05)",5),
        new Skill("Fine Manipulation (05)",5),
        new Skill("Firearm (___________) (var)"),
        new Skill("First Aid (var)"),
        new Skill("Fly (var)"),
        new Skill("Gaming (INT+POW)",int+pow),
        new Skill("Grapple (25)",25),
        new Skill("Heavy Machine (______) (01)",1),
        new Skill("Heavy Weapon (______) (var)"),
        new Skill("Hide (10)",10),
        new Skill("Insight (05)",5),
        new Skill("Jump (25)",25),
        new Skill("Knowledge (__________) (var)"),
        new Skill("Lang., Own (______) (INT×5)",int*5),
        new Skill("Lang., Other (_________) (00)",0),
        new Skill("Listen (25)",25),
        new Skill("Literacy (___________) (var)"),
        new Skill("Martial Arts (01)",1),
        new Skill("Medicine (05% or 00)"),
        new Skill("Melee Weapon (_______) (var)"),
        new Skill("Missile Weapon (_______) (var)"),
        new Skill("Navigate (10)",10),
        new Skill("Perform (___________) (05)",5),
        new Skill("Persuade (15)",15),
        new Skill("Pilot (___________) (01)",1),
        new Skill("Projection (DEX×2)", dex*2),
        new Skill("Psychotherapy (01)",1),
        new Skill("Repair (___________) (15)",15),
        new Skill("Research (25)",25),
        new Skill("Ride (___________) (05)",5),
        new Skill("Science (___________) (01)",1),
        new Skill("Sense (10)",10),
        new Skill("Shield (___________) (var)"),
        new Skill("Sleight of Hand (05)",5),
        new Skill("Spot (25)",25),
        new Skill("Status (var)"),
        new Skill("Stealth (10)",10),
        new Skill("Strategy (01)",1),
        new Skill("Swim (25)",25),
        new Skill("Teach (10)",10),
        new Skill("Technical Skill (_________) (00)",1),
        new Skill("Throw (25)",25),
        new Skill("Track (10)",10)
    ];
}

export function getBlankSkills() {
    let skills=getDefaultSkills();
    skills.forEach(function(part, index, theArray) {
        theArray[index].value=null;
    });
    return skills;
}
