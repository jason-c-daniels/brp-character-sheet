<style>
    @import "WeaponOrShieldEditor.css";
</style>

<script>
    import WeaponOrShield from "../../../../model/WeaponOrShield";
    import { createEventDispatcher } from 'svelte';

    const dispatch = createEventDispatcher();
    export let weaponOrShield=new WeaponOrShield();

    function handleSelected() {
        dispatch('weapon_selected',weaponOrShield);
        selected=true;
    }

    function handleBlur() {
        selected=false;
    }

    function rollSkill() {
        alert(weaponOrShield.value);
    }

    function rollAttack() {
        dispatch('roll_attack',weaponOrShield);
    }

    let selected=false;
</script>

<tr class="{ selected ? 'selected' : ''}">
    <td>
        <input bind:value={weaponOrShield.name} style="width:6.8em;" on:focus={handleSelected}  on:blur={handleBlur}/>
    </td>
    <td>
        <input bind:value={weaponOrShield.value} style="width:2em; text-align: center" on:focus={handleSelected} on:blur={handleBlur}/>
    </td>
    <td>
        <input bind:value={weaponOrShield.damage} style="width:6.8em;" on:focus={handleSelected} on:blur={handleBlur}/>
    </td>
    <td>
        <input bind:value={weaponOrShield.hands}  style="width:3em; text-align: center" on:focus={handleSelected} on:blur={handleBlur}/>
    </td>
    <td>
        <input bind:value={weaponOrShield.hitPoints}  style="width:2em; text-align: center" on:focus={handleSelected} on:blur={handleBlur}/>
    </td>
    <td>
        <input bind:value={weaponOrShield.range}  style="width:5em; text-align: center" on:focus={handleSelected} on:blur={handleBlur}/>
        {#if (weaponOrShield && weaponOrShield.name && weaponOrShield.value && weaponOrShield.damage)}
            <mwc-icon class="noprint" on:click={rollAttack}>casino</mwc-icon>
        {:else}
            <mwc-icon class="noprint disabled">casino</mwc-icon>
        {/if}
    </td>
</tr>
