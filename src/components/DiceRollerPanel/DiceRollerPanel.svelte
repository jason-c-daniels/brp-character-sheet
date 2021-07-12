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
    import {getItemByName} from "../../util/utilities";

    export let abilityValue=0;
    export let diceExpression="1D3+DB";
    export let damageBonus="None";
    export let diceExpressionName="";
    export let abilityRollName="";
    export let skills = getDefaultSkills();
    const NO_RESULT={success:false,difficult:false,special:false,fumble:false, failed:false};
    let abilityRollResult="";
    let diceRollResult="";
    let diceRoller = new DiceRoller.DiceRoller();
    let rollResult= {...NO_RESULT};
    let rollValue="";
    let martialArtsResult = {...NO_RESULT};
    let isBrawling=false;
    let rollName = "";
    let isDiceExpression=false;
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
        isDiceExpression=false;
        if (abilityValue) {
            let roll = diceRoller.roll("d%").total;
            rollValue = roll.toString();
            rollName=abilityRollName;
            rollResult = evaluateRoll(abilityValue,roll);
            martialArtsResult={...NO_RESULT};
            isBrawling=abilityRollName.startsWith("Brawl");
            if (isBrawling) {
                // check if also a martial arts skill success.
                let martialArts=getItemByName(skills,"Martial Arts (01)");
                if (martialArts) {
                    martialArtsResult = evaluateRoll(martialArts.value, roll);
                }
            }
        }
    }

    function handleDiceExpressionRoll() {
        isBrawling=false;
        isDiceExpression=true;
        let expr=diceExpression.toLowerCase();
        expr = expr.replace("1⁄2db","db/2");
        expr = expr.replace("1/2db","db/2");
        expr = expr.replace("db",damageBonus.toLowerCase());
        expr = expr.replace("none","0");
        expr = expr.replace("+-","-");
        expr = expr.replace("++","+");
        let result=diceRoller.roll(expr);
        //rollResult=result.toString();
        rollValue =  " : " + Math.round(result.total).toString();
    }

    function formatResult(result) {
        let resultString="";
        if (result.special) resultString="Special Success!";
        else if (result.difficult) resultString="Difficult Success";
        else if (result.success) resultString = "Success";
        else if (result.fumble) resultString = "FUMBLE!";
        else if (result.failed) resultString="Failed";
        return resultString;
    }
</script>

<div class="roller">
    <div style="display: inline-block">
        <TextField type="number" label="{abilityRollName}" min="0" max="999" enabled="true" style="width:12rem" bind:value={abilityValue}/>
        <mwc-button style="margin-top: 1.5rem" outlined icon="casino" on:click={handleAbilityRoll}>Roll</mwc-button>
    </div>
    {#if (diceExpressionName) }
        <div style="display: inline-block">
            <TextField type="text" label="{diceExpressionName}" style="width:12rem" bind:value={diceExpression}/>
            <mwc-button style="margin-top: 1.5rem" outlined icon="casino" on:click={handleDiceExpressionRoll}>Roll</mwc-button>
        </div>
    {/if}
    {#if (rollValue !="")}
        <div id="result-pane" style="display: inline-block">
            <div style="display: inline-block">
               <span>{rollName} =>
                   {#if (isDiceExpression)}
                       {diceExpressionName}
                   {:else}
                       Rolled
                   {/if}
                   {rollValue}
                   {#if (!isDiceExpression)}
                    : {formatResult(rollResult)}
                   {/if}
               </span>
            </div>

            {#if (isBrawling)}
            <div style="display: inline-block">
                <span style="display: inline-block">; Martial Arts: {formatResult(martialArtsResult)}</span>
            </div>
            {/if}
             <mwc-button style="vertical-align:middle" outlined icon="cancel" on:click={()=>{rollValue=""}}>Clear</mwc-button>
        </div>
    {/if}
</div>