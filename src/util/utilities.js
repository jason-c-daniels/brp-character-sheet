import DiceRoller from 'rpg-dice-roller';
export const NO_RESULT={success:false,difficult:false,special:false,fumble:false, failed:false};

let diceRoller = new DiceRoller.DiceRoller();

export function getItemByName(array, nameKey) {
    for (let i = 0; i < array.length; i++) {
        if (array[i].name === nameKey) {
            return array[i];
        }
    }
}

export function evaluateRoll(value, roll) {
    let av = value <= 5 ? 5 : value; // treat 01-05 ability values as 05
    let special = Math.max(1, Math.round(av * 0.2));
    let fumble = Math.min(100, 96 + Math.trunc((av + 9) / 20));
    return {
        success:roll <= av,
        difficult:roll <= Math.round(av / 2.0),
        special:roll <= special,
        fumble:roll >= fumble,
        failed:roll > av
    };
}

export function handleAbilityRoll(abilityRollName, abilityValue, skills) {

    if (abilityValue) {
        let roll = diceRoller.roll("d%").total;
        let rollValue = roll.toString();
        let rollResult = evaluateRoll(abilityValue,roll);
        let martialArtsResult={...NO_RESULT};
        let isBrawling=abilityRollName.startsWith("Brawl");
        if (isBrawling) {
            // check if also a martial arts skill success.
            let martialArts=getItemByName(skills,"Martial Arts (01)");
            if (martialArts) {
                martialArtsResult = evaluateRoll(martialArts.value, roll);
            }
        }
        return { rollValue, rollResult, martialArtsResult };
    }
    return { rollValue:'None', rollResult:{...NO_RESULT}, martialArtsResult:{...NO_RESULT} };
}

export function formatResult(result) {
    if (!result.success && !result.failed) return "None";
    let resultString="";
    if (result.special) resultString="Special Success!";
    else if (result.difficult) resultString="Difficult Success";
    else if (result.success) resultString = "Success";
    else if (result.fumble) resultString = "FUMBLE!";
    else if (result.failed) resultString="Failed";
    return resultString;
}

export function rollDamage(diceExpression,isDoubled) {
    if (isDoubled) {
        diceExpression="2*"+diceExpression;
    }
    return diceRoller.roll(diceExpression).total;
}