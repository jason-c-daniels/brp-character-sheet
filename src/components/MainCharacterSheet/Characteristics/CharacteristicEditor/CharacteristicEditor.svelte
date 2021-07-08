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
    function handleSelected() {
        dispatch('characteristic_selected',characteristic);
        selected=true;
    }

    function handleBlur() {
        selected=false;
    }

    let selected=false;
</script>

<div class="characteristic-editor { selected ? 'selected' : ''}">
    <label class="name" for="char__{characteristic.name}">{characteristic.name}</label>
    <input id="char__{characteristic.name}" type="number" min="1" max="20" bind:value="{characteristic.value}" on:change={handleChanged} on:focus={handleSelected} on:blur={handleBlur}/>
    {#if (characteristic.rollName)}
    <label class="roll-name" for="roll__{characteristic.name}">{characteristic.rollName}</label>
    <input id="roll__{characteristic.name}" type="number" min="1" max="20" bind:value="{characteristic.roll}" on:focus={handleSelected} on:blur={handleBlur}/>
    {/if}

</div>