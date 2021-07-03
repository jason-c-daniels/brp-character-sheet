<style>
    @import "CharacteristicEditor.css";
</style>

<script>

    import Characteristic from "../../../../model/Characteristic";

    export let characteristic = new Characteristic();
</script>

<div class="characteristic-editor">
    <input type="text" readonly bind:value={characteristic.name}/>
    <input type="number" min="1" max="100" bind:value="{characteristic.value}"/>
    {#if (characteristic.rollName)}
    <span style="display: inline-block; width:4.3rem;margin-left: 0.2rem">{characteristic.rollName}</span>
    <input type="number" min="1" max="100" readonly bind:value="{characteristic.roll}"/>
    {/if}

</div>