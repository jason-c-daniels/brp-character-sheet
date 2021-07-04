import {getBlankIdentity, getDefaultIdentity} from "./Identity";
import {getBlankCharacteristics, getDefaultCharacteristics} from "./Characteristic";
import {getBlankDerivedCharacteristics, getDefaultDerivedCharacteristics} from "./DerivedCharacteristic";
import {getBlankSkills, getDefaultSkills} from "./Skill";
import {getDefaultEquipment} from "./EquipmentItem";
import {getBlankWeaponsAndShields, getDefaultWeaponsAndShields} from "./WeaponOrShield";
import {getDefaultArmor} from "./Armor";

export default function getNewWorksheet() {
    let characteristics=getDefaultCharacteristics();
    let derivedCharacteristics=getDefaultDerivedCharacteristics(characteristics);
    let skills=getDefaultSkills(characteristics);
    let res= {
        identity: getDefaultIdentity(),
        characteristics : characteristics,
        derivedCharacteristics : derivedCharacteristics,
        skills : skills,
        equipment: getDefaultEquipment(),
        weaponsAndShields : getDefaultWeaponsAndShields(),
        armor : getDefaultArmor()
    };
    console.log("new worksheet created");
    return res;
}

export function getBlankWorksheet() {
    let res= {
        identity: getBlankIdentity(),
        characteristics : getBlankCharacteristics(),
        derivedCharacteristics : getBlankDerivedCharacteristics(),
        skills : getBlankSkills(),
        equipment: getDefaultEquipment(),
        weaponsAndShields : getBlankWeaponsAndShields(),
        armor : getDefaultArmor()
    };
    res.weaponsAndShields[0].points=null;
    res.armor.points=null;
    return res;
}

export function validateWorksheet(worksheet) {
    let result = true;
    try {

        /* TODO: There has to be a better way.
                 like maybe a JSON DTD? */

        // for now try accessing things in a way that will throw an exception.
        let _ = worksheet.identity.name.toString();

    } catch (err) {
        console.log(err);
        result = false;
    } finally {
    }
    return result;
}