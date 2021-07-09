<style>
    @import "DiceRollerPanel.css";
</style>

<script>
    import '@material/mwc-icon-button';
    import '@material/mwc-button';
    import '@material/mwc-icon';
    import DiceRoller from 'rpg-dice-roller';
    import TextField from "../shared/TextField";
    import {getDefaultSkills} from "../../model/Skill";
    import {getItemByName} from "../shared/util/utilities";
    let abilityRollResult="";
    let diceRollResult="";
    let diceRoller = new DiceRoller.DiceRoller();
    export let abilityValue=0;
    export let diceExpression="1d3";
    export let damageBonus="None";
    export let diceExpressionName="";
    export let abilityRollName="";
    export let skills = getDefaultSkills();
    const NO_RESULT={success:false,difficult:false,special:false,fumble:false, failed:false};
    let rollResult= {...NO_RESULT};
    let rollValue="";
    let martialArtsResult = {...NO_RESULT};
    let isBrawling=false;
    if (!abilityRollName || abilityRollName === "") {abilityRollName="Ability Value";}

    function evaluateRoll(value, roll) {
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

    function handleAbilityRoll() {
        if (abilityValue) {

            let roll = diceRoller.roll("d%").total;
            rollValue = roll.toString();
            rollResult = evaluateRoll(abilityValue,roll);
            martialArtsResult={...NO_RESULT};
            if (abilityRollName.startsWith("Brawl")) {
                // check if also a martial arts skill success.
                let martialArts=getItemByName(skills,"Martial Arts (01)");
                if (martialArts) {
                    martialArtsResult = evaluateRoll(martialArts.value, roll);
                }
            }
        }
    }

    function handleDiceExpressionRoll() {
        let expr=diceExpression.toLowerCase();
        expr = expr.replace("1⁄2db","db/2");
        expr = expr.replace("1/2db","db/2");
        expr = expr.replace("db",damageBonus.toLowerCase());
        expr = expr.replace("none","0");
        expr = expr.replace("+-","-");
        expr = expr.replace("++","+");
        let result=diceRoller.roll(expr);
        //rollResult=result.toString();
        rollResult = Math.round(result.total).toString();
    }

    function formatResult(result){
        let resultString="";
        if (result.special) resultString="+++ Special Success!";
        else if (result.difficult) resultString="++ Difficult Success";
        else if (result.success) resultString = "+ Success";
        else if (result.fumble) resultString = "-- FUMBLE!";
        else if (result.failed) resultString="- Failed";
        return resultString;
    }
</script>

<div class="roller">
    <div>
        <TextField type="number" label="{abilityRollName}" min="0" max="999" enabled="true" style="width:100%" bind:value={abilityValue}/>
        <mwc-button outlined icon="casino" on:click={handleAbilityRoll}>Roll</mwc-button>
    </div>
    {#if (diceExpressionName) }
        <div>
            <TextField type="text" label="{diceExpressionName}" style="width:100%" bind:value={diceExpression}/>
            <mwc-button outlined icon="casino" on:click={handleDiceExpressionRoll}>Roll</mwc-button>
        </div>
    {/if}
    <div style="">
        {#if (rollValue !=="")}
            <div style="margin-top:15px; margin-bottom:15px;">
               <span>{rollValue}: {formatResult(rollResult)}</span>
            </div>

            {#if (abilityRollName.startsWith("Brawl"))}
                <span>Martial Arts: {formatResult(martialArtsResult)}</span>
            {/if}
            <mwc-button outlined icon="cancel" on:click={()=>{rollValue=""}}>Clear</mwc-button>
        {/if}
    </div>
</div>