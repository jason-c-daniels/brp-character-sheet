<style>
    @import "Equipment.css";
</style>

<script>
    import Section from "../../shared/Section";
    import {getDefaultEquipment} from "../../../model/EquipmentItem";
    import EquipmentItemEditor from "./EquipmentItemEditor/EquipmentItemEditor.svelte";

    export let equipment = getDefaultEquipment()
</script>

<Section title="Equipment" props={{style:"width:50%; margin-right: 1rem;"}}>
    <div style="margin-left: 0.7rem;">
    {#each equipment as equipmentItem}
        <EquipmentItemEditor bind:equipmentItem={equipmentItem} />
    {/each}
    </div>
</Section>