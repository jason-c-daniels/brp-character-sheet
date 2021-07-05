<style>
    @import "Skills.css";
</style>

<script>
    import Section from "../../shared/Section";
    import {getDefaultSkills} from "../../../model/Skill";
    import SkillEditor from "./SkillEditor";

    export let skills = getDefaultSkills();
</script>

<Section title="Skills" >
    <div class="container">
    {#each skills as skill}
        <SkillEditor bind:skill={skill} on:skill_changed/>
    {/each}
    </div>
</Section>