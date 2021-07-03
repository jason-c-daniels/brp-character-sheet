import {getDefaultIdentity} from "./Identity";
import {getDefaultCharacteristics} from "./Characteristic";
import {getDefaultDerivedCharacteristics} from "./DerivedCharacteristic";
import {getDefaultSkills} from "./Skill";
import {getDefaultEquipment} from "./EquipmentItem";
import {getDefaultWeaponsAndShields} from "./WeaponOrShield";
import {getDefaultArmor} from "./Armor";

export default function getNewWorksheet() {
    return {
        identity: getDefaultIdentity(),
        characteristics : getDefaultCharacteristics(),
        derivedCharacteristics : getDefaultDerivedCharacteristics(),
        skills : getDefaultSkills(),
        equipment: getDefaultEquipment(),
        weaponsAndShields : getDefaultWeaponsAndShields(),
        armor : getDefaultArmor()
    };
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