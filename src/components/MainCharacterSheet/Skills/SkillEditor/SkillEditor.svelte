<style>
    @import "SkillEditor.css";
</style>

<script>
    import Skill from "../../../../model/Skill";
    import { createEventDispatcher } from 'svelte';

    const dispatch = createEventDispatcher();
    export let skill = new Skill();
    function handleChanged() {
        dispatch('skill_changed',skill);
    }

    function handleSelected() {
        dispatch('skill_selected',skill);
        selected=true;
    }

    function handleBlur() {
        selected=false;
    }

    function rollSkill() {
        dispatch('roll_skill',skill);
    }

    let selected=false;
</script>

<div class="skill-editor { selected ? 'selected' : ''}">
    <input type="text" bind:value={skill.name} on:focus={handleSelected} on:blur={handleBlur}/>
    <input type="number" min="0" max="999" bind:value="{skill.value}" on:change={handleChanged} on:focus={handleSelected} on:blur={handleBlur}/>
    <div class="center"><p style="display: inline-block">%</p></div>
    <input type="checkbox" bind:checked={skill.used} on:focus={handleSelected} on:blur={handleBlur}/>
    {#if (skill && skill.value && skill.name)}
        <mwc-icon class="noprint" on:click={rollSkill}>casino</mwc-icon>
    {:else}
        <mwc-icon class="noprint disabled" >casino</mwc-icon>
    {/if}
</div>