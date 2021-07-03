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
    <div style="margin-left: 0.7rem;">
    {#each characteristics as characteristic}
        <CharacteristicEditor bind:characteristic={characteristic} />
    {/each}
    </div>
</Section>