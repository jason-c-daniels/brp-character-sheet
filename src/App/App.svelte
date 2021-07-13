<script>
    import GlobalCss from "../GlobalCss";
    /*-- Add support for Web Components to older browsers. --*/
    import "@webcomponents/webcomponentsjs/webcomponents-loader.js";
    import '@material/mwc-top-app-bar-fixed';
    import '@material/mwc-icon-button';
    import '@material/mwc-button';
    import '@material/mwc-drawer';
    import '@material/mwc-tab';
    import '@material/mwc-tab-bar';
    import '@material/mwc-icon';
    import '@material/mwc-list';
    import '@material/mwc-list-item';
    import '@material/mwc-snackbar';
    import downloadToClient from 'file-saver';
    import Dropzone from "svelte-file-dropzone";
    import Worksheet from "../components/MainCharacterSheet";
    import getNewWorksheet, {getBlankWorksheet, validateWorksheet} from "../model/worksheet";
    import LocalStorageRepository from '../repository/localStorageRepository';
    import {applicationName, fileExtension, sheetPrefix, sheetSuffix} from '../applicationSettings'

    import About from '../components/About/About.md';
    import {onMount} from 'svelte';
    import {getDefaultCharacteristics} from "../model/Characteristic";
    import {getDefaultSkills} from "../model/Skill";
    import {getDefaultDerivedCharacteristics} from "../model/DerivedCharacteristic";
    import {getItemByName} from "../util/utilities";
    import {handleAbilityRoll} from "../util/utilities";
    import {formatResult} from "../util/utilities";
    import {rollDamage} from "../util/utilities";
    import {formatRollName} from "../util/utilities";
    import RollResultDialog from "../components/RollResultDialog";

    const MAKE_BLANK_INDEX = 0;
    const ROLL_CHARACTERISTICS_INDEX = 1;
    const SET_DEFAULTS_INDEX = 2;
    const UPDATE_BRAWLING_INDEX = 3;

    let activeIndex;

    let snackBarElement, tabBarElement, drawerElement, listElement, rollResultsDialogElement;

    let disabled = "";
    let showLoadPane = false;
    let firstCall = true;
    let saveAlsoDownloads = true;
    let ls;

    let snackBarText = 'Replace this with a real message';
    let app_name = "", file_ext = "", prefix = "", suffix = "";
    const unsubscribe_name = applicationName.subscribe(value => {
        app_name = value;
    });
    const unsubscribe_ext = fileExtension.subscribe(value => {
        file_ext = value;
    });
    const unsubscribe_prefix = sheetPrefix.subscribe(value => {
        prefix = value;
        ls = new LocalStorageRepository(prefix);
    });
    const unsubscribe_suffix = sheetSuffix.subscribe(value => {
        suffix = value;
    });

    let {tempWorksheet, isValid} = doInitialWorksheetLoad();

    let worksheet = isValid ? tempWorksheet : getNewWorksheet();

    let selectedAbilityValue = 0;
    let diceExpression = "1D3+db";
    let diceExpressionName = "";
    let abilityRollName = "";

    scheduleAutosave();

    function doInitialWorksheetLoad() {
        let tempWorksheet;
        let isValid = false;
        try {

            tempWorksheet = ls.load(suffix, getNewWorksheet);
            isValid = validateWorksheet(tempWorksheet);
        } catch (err) {
            console.log(err);
            isValid = false;
        }
        return {tempWorksheet, isValid};
    }

    function handleSaveWorksheetClicked() {
        let blob = new Blob([JSON.stringify(worksheet, null, 2)], {type: 'text/plain;charset=utf-8'});
        ls.save(suffix, worksheet);
        showSnackBar('MainCharacterSheet saved to local storage.');
        if (saveAlsoDownloads) {
            setTimeout(() => {
                let fileName = `${worksheet.identity.name}.${file_ext}`;
                downloadToClient(blob, fileName);
                showSnackBar(`Sending file: ${fileName}. Check your downloads folder.`);
            }, 2000);
        }
    }

    function handleLoadWorksheetClicked() {
        showLoadPane = true;
        disabled = 'disabled';
    }

    function handleNewWorksheetClicked() {
        worksheet = getNewWorksheet();
        activeIndex = 0;
        showSnackBar('Created a new character sheet.');
    }

    function handleFilesSelect(e) {
        let files = e.detail.acceptedFiles;
        const reader = new FileReader();
        reader.onload = function (e) {
            // e.target.result should contain the text
            try {
                let text = e.target.result;
                let tempWorksheet = JSON.parse(text);
                if (validateWorksheet(tempWorksheet)) {
                    setTimeout(() => showSnackBar("Character sheet loaded."), 250);
                    worksheet = tempWorksheet;
                    activeIndex = 0;
                }
            } catch (err) {
                console.log(err);
                setTimeout(() => showSnackBar("Invalid data format encountered. Nothing loaded."), 250);
            } finally {
                hideLoadPane();
            }
        };
        reader.readAsText(files[0]);
    }

    function hideLoadPane() {
        showLoadPane = false;
        disabled = "";
    }

    function handlePrintClicked() {
        setTimeout(() => window.print(), 500);
    }

    function handleTabActivated(e) {
        activeIndex = tabBarElement.activeIndex;
    }

    function scheduleAutosave() {
        if (!firstCall) {
            return;
        }
        firstCall = false;
        setInterval(() => ls.save(suffix, worksheet), 5 * 1000);
    }

    function showSnackBar(text) {
        snackBarText = text;
        snackBarElement.show();
    }

    function toggleDrawer() {
        drawerElement.open = !drawerElement.open;
    }

    function updateBrawling() {
        let skill = getItemByName(worksheet.skills, "Brawl (25)");
        if (!skill) return;
        let weapon = getItemByName(worksheet.weaponsAndShields, "Brawl");
        if (!weapon) return;
        weapon.value = skill.value;
        worksheet.weaponsAndShields = worksheet.weaponsAndShields; //HACK: Force an update.
    }

    function resetSkills() {
        worksheet.skills = getDefaultSkills(worksheet.characteristics);
        updateBrawling();
    }

    function handleAction(event) {
        var x = listElement.index;
        if (x === MAKE_BLANK_INDEX) {
            worksheet = getBlankWorksheet();
        } else if (x === ROLL_CHARACTERISTICS_INDEX) {
            worksheet.characteristics = getDefaultCharacteristics();
            worksheet.derivedCharacteristics = getDefaultDerivedCharacteristics(worksheet.characteristics);
            resetSkills();
        } else if (x === SET_DEFAULTS_INDEX) {
            resetSkills();
        } else if (x === UPDATE_BRAWLING_INDEX) {
            updateBrawling();
        }
    }

    disabled = 'enabled';// HACK: work around a bug that keeps disabling icon buttons even though they're not supposed to be
    setTimeout(() => {
        disabled = ''; // HACK: work around a bug that keeps disabling icon buttons even though they're not supposed to be
    }, 10);

</script>
<style>
    @import "App.css";
    @import "../components/styles/Page.css";
</style>

<svelte:head>
    <title>{app_name}</title>

    <!-- Your application must load the Roboto and Material Icons fonts. -->
    <link href="https://fonts.googleapis.com/css?family=Roboto:300,400,500" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css?family=Material+Icons&display=block" rel="stylesheet">
</svelte:head>

<GlobalCss/>

<main class="noprint" >
    <mwc-drawer hasHeader type="modal" bind:this={drawerElement} >
        <span slot="title">Actions</span>
        <span slot="subtitle">Select the action to perform</span>
        <div style="padding: 2pt;height:100%">
            <mwc-list on:action={handleAction} bind:this={listElement}>
                <mwc-list-item>Make sheet blank</mwc-list-item>
                <mwc-list-item>Re-roll characteristics</mwc-list-item>
                <mwc-list-item>Set skill defaults</mwc-list-item>
            </mwc-list>
        </div>
        <div slot="appContent" >
            <mwc-top-app-bar-fixed on:MDCTopAppBar:nav={toggleDrawer}>
                <mwc-icon-button slot="navigationIcon" icon="menu"></mwc-icon-button>
                <div slot="title"><span>{app_name}</span></div>
                <mwc-tab-bar slot="actionItems" style="display: inline-block" bind:this={tabBarElement}
                     activeIndex={activeIndex} on:MDCTabBar:activated={handleTabActivated}>
                    <mwc-tab label="Character Sheet"></mwc-tab>
                    <mwc-tab label="About"></mwc-tab>
                </mwc-tab-bar>
                <mwc-icon-button icon="note_add" slot="actionItems" on:click={handleNewWorksheetClicked}
                         disabled={disabled}></mwc-icon-button>
                {#if showLoadPane}
                    <mwc-icon-button icon="cancel" slot="actionItems" on:click={hideLoadPane}></mwc-icon-button>
                {:else}
                    <mwc-icon-button icon="folder_open" slot="actionItems"
                                     on:click={handleLoadWorksheetClicked}></mwc-icon-button>
                {/if}
                <mwc-icon-button icon="save" slot="actionItems" on:click={handleSaveWorksheetClicked}
                                 {disabled}></mwc-icon-button>
                <mwc-icon-button icon="print" slot="actionItems" on:click={handlePrintClicked} {disabled}></mwc-icon-button>
        {#if (showLoadPane)}
            <div id="content" class="file-loader" >
                <Dropzone on:drop={handleFilesSelect}
                          containerStyles="height:92vh;color:#333333; background-color:#EFEFEF;"/>
            </div>
        {:else}
            <div id="content"  >
                {#if activeIndex === 0}
                    <Worksheet bind:worksheet={worksheet}
                               on:skill_selected={(e)=>{
                                    selectedAbilityValue =e.detail.value;
                                    abilityRollName=e.detail.name;
                                    diceExpressionName="";
                               }}
                               on:weapon_selected={(e)=>{
                                   if (e.detail.value) {
                                       selectedAbilityValue=e.detail.value;
                                       diceExpression=e.detail.damage;
                                       abilityRollName=e.detail.name;
                                       diceExpressionName="Damage";
                                   }
                               }}
                               on:characteristic_selected={(e)=>{
                                   if (e.detail.rollName) {
                                       selectedAbilityValue=e.detail.roll;
                                       abilityRollName=e.detail.rollName;
                                       diceExpressionName="";
                                   }
                               }}
                               on:roll_attack={

                                   (e)=>{
                                   let result=handleAbilityRoll(e.detail.name,e.detail.value,worksheet.skills);
                                   let heading = formatRollName(e.detail.name,e.detail.value);
                                   let damage = -1;
                                   if (result.rollResult.success) {
                                        damage=rollDamage(e.detail.damage,worksheet.derivedCharacteristics.damageBonus,result.martialArtsResult.success);
                                   }
                                   rollResultsDialogElement.show(heading, result.rollValue,formatResult(result.rollResult),damage);
                               }}
                               on:roll_characteristic={(e)=>{
                                   let result=handleAbilityRoll(e.detail.rollName,e.detail.roll,worksheet.skills);
                                   let heading=formatRollName(e.detail.rollName,e.detail.roll);
                                   rollResultsDialogElement.show(heading,result.rollValue,formatResult(result.rollResult));
                               }}
                               on:roll_skill={
                                   (e)=>{
                                   let result=handleAbilityRoll(e.detail.name,e.detail.value,worksheet.skills);
                                   let heading = formatRollName(e.detail.name,e.detail.value);
                                   rollResultsDialogElement.show(heading, result.rollValue,formatResult(result.rollResult));
                               }}
                    />
                    <div style="width: 10pt; height: 0.25in"></div>

                {:else if activeIndex === 1}
                    <About />
                {:else}
                    <div class="page">
                        <h3>TBD/Coming Soon</h3>
                    </div>
                {/if}
            </div>
        {/if}

        <RollResultDialog bind:this={rollResultsDialogElement}/>
        <mwc-snackbar labelText="{snackBarText}" bind:this={snackBarElement}>
            <mwc-icon-button icon="close" slot="dismiss"></mwc-icon-button>
        </mwc-snackbar>
    </mwc-top-app-bar-fixed>
        </div>
    </mwc-drawer>
</main>

<main class="printme">
    <!-- This section is intended for print rendering only. You may suppress the rendering of this entire section
         to HTML if you like, but you'll need to ensure it's been rendered right before the print dialog is invoked.
         (i.e. print() )
     -->
    <Worksheet bind:worksheet={worksheet}/>

</main>
