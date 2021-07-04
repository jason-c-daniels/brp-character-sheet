<style>
    @import "HitPointsEditor.css";
</style>

<script>
    import {getDefaultDerivedCharacteristics} from "../../../../model/DerivedCharacteristic";

    export let derivedCharacteristics = getDefaultDerivedCharacteristics();
</script>

<div class="container">
    <span class="center-title">Hit Points</span>
    <div class="current">
        <input type="number" min="1" max="{derivedCharacteristics.maxHitPoints}" bind:value="{derivedCharacteristics.hitPoints}"/>
        <span>Current</span>
    </div>
    <div>
        <input type="number" min="1" max="100" bind:value="{derivedCharacteristics.maxHitPoints}"/>
        <span>Maximum</span>
    </div>
</div>