<style>
    @import "EquipmentItemEditor.css";
</style>

<script>
    import EquipmentItem from "../../../../model/EquipmentItem";

    export let equipmentItem=new EquipmentItem();
</script>

<input type="text" bind:value={equipmentItem.description} />
