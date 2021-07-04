<style>
    @import "MovementAndBaseDamageEditor.css";
</style>

<script>
    export let derivedCharacteristics = getDefaultDerivedCharacteristics();
</script>

<div>
    <span>MOV</span>
    <input type="number" min="1" max="100"  bind:value="{derivedCharacteristics.move}"/>
    <span>Damage Bonus</span>
    <input type="text" min="1" max="100"  bind:value="{derivedCharacteristics.damageBonus}"/>
</div>