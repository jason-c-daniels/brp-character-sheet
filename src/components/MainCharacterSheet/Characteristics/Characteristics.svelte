<style>
    @import "Characteristics.css";
</style>

<script>
    import Section from "../../shared/Section";
    import {getDefaultCharacteristics} from "../../../model/Characteristic";
    import CharacteristicEditor from "./CharacteristicEditor";

    export let characteristics = getDefaultCharacteristics();
</script>

<Section title="Characteristics">
    <div style="margin-left: 0.7rem;width:12rem">
    {#each characteristics as characteristic}
        <CharacteristicEditor bind:characteristic={characteristic}
                              on:characteristic_changed
                              on:characteristic_selected
                              on:roll_characteristic
        />
    {/each}
    </div>
</Section>