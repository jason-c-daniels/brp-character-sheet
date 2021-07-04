<style>
    @import "DerivedCharacteristics.css";
</style>

<script>
    import Section from "../../shared/Section";
    import {getDefaultDerivedCharacteristics} from "../../../model/DerivedCharacteristic";
    import MovementAndBaseDamageEditor from "./MovementAndBaseDamageEditor/MovementAndBaseDamageEditor.svelte";
    import HitPointsEditor from "./HitPointsEditor/HitPointsEditor.svelte";
    import PowerPointsEditor from "./PowerPointsEditor/PowerPointsEditor.svelte";

    export let derivedCharacteristics = getDefaultDerivedCharacteristics();
</script>

<Section title="Derived Characteristics">
    <div style="margin-left: 0.7rem;width: 13rem">
        <MovementAndBaseDamageEditor bind:derivedCharacteristics={derivedCharacteristics} />
        <HitPointsEditor bind:derivedCharacteristics={derivedCharacteristics} />
        <PowerPointsEditor bind:derivedCharacteristics={derivedCharacteristics} />
    </div>
</Section>