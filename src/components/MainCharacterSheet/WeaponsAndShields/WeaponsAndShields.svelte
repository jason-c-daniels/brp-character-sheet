<style>
    @import "WeaponAndShields.css";
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
                <td class="centered">%</td>
                <td>Damage</td>
                <td>Hands</td>
                <td class="centered">HP</td>
                <td>Range</td>
            </thead>
        {#each weaponsAndShields as weaponOrShield}
            <WeaponOrShieldEditor bind:weaponOrShield={weaponOrShield} on:weapon_selected on:roll_attack/>
        {/each}
        </table>
    </div>
</Section>