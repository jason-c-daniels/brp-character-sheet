<style>
    @import "WeaponOrShieldEditor.css";
</style>

<script>
    import Section from "../../shared/Section";
    import {getDefaultWeaponsAndShields} from "../../../model/WeaponOrShield";
    import WeaponOrShieldEditor from "./WeaponOrShieldEditor";

    export let weaponsAndShields = getDefaultWeaponsAndShields();
</script>

<Section title="Weapons &amp; Shields">
    <div style="margin-left: 0.7rem;">
        {#each weaponsAndShields as weaponOrShield}
            <WeaponOrShieldEditor bind:weaponOrShield={weaponOrShield} />
        {/each}
    </div>
</Section>