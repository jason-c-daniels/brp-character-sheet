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
import {getItemByName} from "../../util/utilities";

    export let worksheet = getNewWorksheet();

    function skillChanged(event) {
        if (event.detail.name === "Brawl (25)") {
            let weapon=getItemByName(worksheet.weaponsAndShields,"Brawl");
            if (weapon) {
                weapon.value=event.detail.value;
                worksheet.weaponsAndShields=worksheet.weaponsAndShields; // force update
            }
        }
    }

    function characteristicChanged(event) {
        worksheet.derivedCharacteristics = new DerivedCharacteristic(worksheet.characteristics);
    }
</script>

<div class="page" >
    <LogoBar />
    <div class="flex-row">
        <Identity bind:identity={worksheet.identity}/>
        <Characteristics bind:characteristics={worksheet.characteristics} on:characteristic_changed={characteristicChanged} on:characteristic_selected on:roll_characteristic/>
        <DerivedCharacteristics bind:derivedCharacteristics={worksheet.derivedCharacteristics}/>
    </div>
    <Skills bind:skills={worksheet.skills} on:skill_changed={skillChanged} on:skill_selected on:roll_skill/>
    <div class="flex-row">
        <Equipment bind:equipment={worksheet.equipment}/>
        <div class="flex-column">
            <WeaponsAndShields bind:weaponsAndShields={worksheet.weaponsAndShields} on:weapon_selected on:roll_attack/>
            <Armor bind:armor={worksheet.armor}/>
        </div>
    </div>

</div>