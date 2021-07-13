<style>
    @import "RollResultDialog.css";
</style>

<script>
    import '@material/mwc-dialog';
    let rollResultDialogElement=null;
    let value=0;
    let description="";
    let damage=-1;
    let heading="Roll Results";

export function show(headingName,rollValue,rollDescription, damageValue=-1) {
    heading=headingName;
    value=rollValue;
    description=rollDescription;
    damage=damageValue;
    rollResultDialogElement.show();
}

export function hide() {
    rollResultDialogElement.close();
}

</script>

<mwc-dialog heading="{heading}" bind:this={rollResultDialogElement} width="240rem" >

    <h3>Roll: {value}</h3>
    <p>{description}</p>

    {#if (damage >= 0 || !Number.isInteger(damage))}
        <h3>Damage: {damage} </h3>
    {/if}

</mwc-dialog>