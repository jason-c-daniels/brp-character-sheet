<style>
    @import "Identity.css";
</style>

<script>
    import Section from "../../shared/Section";
    import {getDefaultIdentity} from "../../../model/Identity";
    export let identity=getDefaultIdentity();

</script>

<Section title="Identity" >
    <div style="margin-left: 0.7rem;">
        <div>
            <label title="Name" for="name" >Name</label>
            <input id="name" type="text" bind:value={identity.name}>
            <label title="Profession" for="profession" >Profession</label>
            <input id="profession" type="text" bind:value={identity.profession}>
        </div>
        <div>
            <label title="Race" for="race" >Race</label>
            <input id="race" type="text" bind:value={identity.race} >

            <label title="Age" for="age" >Age</label>
            <input id="age" type="number" bind:value={identity.age}>

            <label title="Gender" for="gender" >Gender</label>
            <input id="gender" type="text" bind:value={identity.gender}>
        </div>
        <div>
            <label title="Handedness" for="handedness" >Handedness</label>
            <input id="handedness" type="text" bind:value={identity.handedness}>

            <label title="Height &amp; Weight" for="height-and-weight" >Height &amp; Weight</label>
            <input id="height-and-weight" type="text" bind:value={identity.heightAndWeight}>
        </div>
        <div>
            <label title="Description" for="description" class="block-label">Description</label>
            <textarea id="description" bind:value={identity.description}></textarea>
        </div>
        <div>
            <label title="Distinctive Features" for="distinctive-features" class="block-label">Distinctive Feature(s)</label>
            <textarea id="distinctive-features" bind:value={identity.distinctiveFeatures}></textarea>
        </div>
    </div>

</Section>