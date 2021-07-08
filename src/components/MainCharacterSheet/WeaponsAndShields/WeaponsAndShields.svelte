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
        <table style="border:none; border-collapse: collapse">
            <thead>
                <td>Weapon</td>
                <td style="text-align: center">%</td>
                <td>Damage</td>
                <td>Hands</td>
                <td>HP</td>
                <td>Range</td>
            </thead>
        {#each weaponsAndShields as weaponOrShield}
            <WeaponOrShieldEditor bind:weaponOrShield={weaponOrShield} on:weapon_selected/>
        {/each}
        </table>
    </div>
</Section>