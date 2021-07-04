<style>
    @import "WeaponOrShieldEditor.css";
</style>

<script>
    import WeaponOrShield from "../../../../model/WeaponOrShield";

    export let weaponOrShield=new WeaponOrShield();
</script>

<tr>
    <td><input bind:value={weaponOrShield.name} style="width:8em;"/></td>
    <td><input bind:value={weaponOrShield.value}  style="width:2em; text-align: center"/></td>
    <td><input bind:value={weaponOrShield.damage}  style="width:8em;"/></td>
    <td><input bind:value={weaponOrShield.hands}  style="width:3em; text-align: center"/></td>
    <td><input bind:value={weaponOrShield.hitPoints}  style="width:2em; text-align: center"/></td>
    <td><input bind:value={weaponOrShield.range}  style="width:5em; text-align: center"/></td>
</tr>
