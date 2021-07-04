<style>
    @import "MainCharacterSheet.css";
    @import "../styles/Page.css";
</style>

<script>


import LogoBar from '../shared/LogoBar';
    import getNewWorksheet from '../../model/worksheet'
    import Identity from "./Identity";
    import Characteristics from "./Characteristics";
    import DerivedCharacteristics from "./DerivedCharacteristics";
    import Skills from "./Skills/Skills.svelte";
    import WeaponsAndShields from "./WeaponsAndShields";
    import Armor from "./Armor";
    import Equipment from "./Equipment";
import DerivedCharacteristic from "../../model/DerivedCharacteristic";

    export let worksheet = getNewWorksheet();

    function characteristicChanged(event) {
        worksheet.derivedCharacteristics = new DerivedCharacteristic(worksheet.characteristics);
    }
</script>

<div class="page" >
    <LogoBar />
    <div class="flex-row">
        <Identity bind:identity={worksheet.identity}/>
        <Characteristics bind:characteristics={worksheet.characteristics} on:characteristic_changed={characteristicChanged}/>
        <DerivedCharacteristics bind:derivedCharacteristics={worksheet.derivedCharacteristics}/>
    </div>
    <Skills bind:skills={worksheet.skills}/>
    <div class="flex-row">
        <Equipment bind:equipment={worksheet.equipment}/>
        <div class="flex-column">
            <WeaponsAndShields bind:weaponsAndShields={worksheet.weaponsAndShields}/>
            <Armor bind:armor={worksheet.armor}/>
        </div>
    </div>

</div>