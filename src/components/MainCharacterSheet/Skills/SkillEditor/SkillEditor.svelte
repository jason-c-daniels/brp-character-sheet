<style>
    @import "SkillEditor.css";
</style>

<script>
    import Skill from "../../../../model/Skill";

    export let skill = new Skill();
</script>

<div class="skill-editor">
    <input type="text" bind:value={skill.name}/>
    <input type="number" min="0" max="10" bind:value="{skill.value}"/>
    <div class="center"><p style="display: inline-block">%</p></div>
    <input type="checkbox" bind:value={skill.used}/>
</div>