<style>
    @import "PowerPointsEditor.css";
</style>

<script>
    export let derivedCharacteristics = getDefaultDerivedCharacteristics();
</script>

<div class="container">
    <span class="center-title">Power Points</span>
    <div class="current">
        <input type="number" min="0" max="{derivedCharacteristics.maxPowerPoints}" bind:value="{derivedCharacteristics.powerPoints}"/>
        <span>Current</span>
    </div>
    <div>
        <input type="number" min="0" max="100" bind:value="{derivedCharacteristics.maxPowerPoints}"/>
        <span>Maximum</span>
    </div>
</div>