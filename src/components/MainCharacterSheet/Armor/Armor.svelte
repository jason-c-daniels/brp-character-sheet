<style>
    @import "Armor.css";
</style>

<script>
    import Section from "../../shared/Section";
    import Armor from "../../../model/Armor";
    export let armor=new Armor()
</script>

<Section title="Armor">
    <table style="padding-left: 0.7rem">
        <thead>
            <td>Type</td>
            <td>Points</td>
            <td>Modifier</td>
        </thead>
        <tr>
            <td><input style="width: 10.7rem" bind:value={armor.type} /> </td>
            <td><input style="width: 4rem; text-align: center" bind:value={armor.points} /></td>
            <td><input style="width: 8rem" bind:value={armor.modifier} /></td>
        </tr>

    </table>
</Section>