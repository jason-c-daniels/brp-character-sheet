<style>
    @import "CharacteristicEditor.css";
</style>

<script>

    import Characteristic from "../../../../model/Characteristic";
    import { createEventDispatcher } from 'svelte';

    const dispatch = createEventDispatcher();
    export let characteristic = new Characteristic();

    function handleChanged() {
        characteristic.roll = characteristic.value*5;
        dispatch('characteristic_changed',characteristic.name);
    }

</script>

<div class="characteristic-editor">
    <span class="name">{characteristic.name}</span>
    <input type="number" min="1" max="20" bind:value="{characteristic.value}" on:change={handleChanged}/>
    {#if (characteristic.rollName)}
    <span class="roll-name">{characteristic.rollName}</span>
    <input type="number" min="1" max="20" bind:value="{characteristic.roll}" />
    {/if}

</div>