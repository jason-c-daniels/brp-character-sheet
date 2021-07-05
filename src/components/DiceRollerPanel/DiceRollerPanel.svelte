<style>
    @import "DiceRollerPanel.css";
</style>

<script>
    import '@material/mwc-icon-button';
    import '@material/mwc-button';
    import '@material/mwc-icon';
    import DiceRoller from 'rpg-dice-roller';
    import TextField from "../shared/TextField";
    let abilityRollResult="";
    let diceRollResult="";
    let diceRoller = new DiceRoller.DiceRoller();
    export let abilityValue=0;
    export let diceExpression="1d3";
    export let damageBonus="None";
    export let diceExpressionName="";
    export let abilityRollName="";
    let rollResult="";

    if (!abilityRollName || abilityRollName == "") {abilityRollName="Ability Value";}
    if (!diceExpressionName || diceExpressionName == "") {diceExpressionName="Dice Expression";}

    function handleAbilityRoll() {
        if (abilityValue) {
            let av = abilityValue <= 5 ? 5 : abilityValue; // treat 01-05 ability values as 05
            let special = Math.max(1, Math.round(av * 0.2));
            let fumble = Math.min(100, 96 + Math.trunc((av + 9) / 20));
            let roll = diceRoller.roll("d%").total;
            rollResult = roll.toString()+" : ";
            if (roll <= special) {
                rollResult += "Special!";
            }
            else if (roll <= av) {
                rollResult += "Success";
            }
            else if (roll >= fumble) {
                rollResult += "FUMBLE!";
            }
            else {
                rollResult += "Failure";
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

</script>

<div class="roller">
    <div>
        <TextField type="number" label="{abilityRollName}" min="0" max="999" enabled="true" style="width:100%" bind:value={abilityValue}/>
        <mwc-button outlined icon="casino" on:click={handleAbilityRoll}>Roll</mwc-button>
    </div>
    <div>
        <TextField type="text" label="{diceExpressionName}" style="width:100%" bind:value={diceExpression}/>
        <mwc-button outlined icon="casino" on:click={handleDiceExpressionRoll}>Roll</mwc-button>
    </div>
    <div style="">
        <div style="margin-top:15px; margin-bottom:15px;">
            <span>{rollResult}</span>
        </div>
        {#if (rollResult)}
        <mwc-button outlined icon="cancel" on:click={()=>{rollResult="";}}>Clear</mwc-button>
        {/if}
    </div>
</div>