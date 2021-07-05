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
    }

</script>

<div class="skill-editor">
    <input type="text" bind:value={skill.name} on:focus={handleSelected}/>
    <input type="number" min="0" max="999" bind:value="{skill.value}" on:change={handleChanged} on:focus={handleSelected}/>
    <div class="center"><p style="display: inline-block">%</p></div>
    <input type="checkbox" bind:checked={skill.used}/>
</div>