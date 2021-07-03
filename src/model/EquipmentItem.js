export default class EquipmentItem {
    description;
    constructor(description="") {
        this.description = description;
    }
}

export function getDefaultEquipment() {
    return [
        new EquipmentItem(),
        new EquipmentItem(),
        new EquipmentItem(),
        new EquipmentItem(),
        new EquipmentItem(),
        new EquipmentItem(),
        new EquipmentItem(),
        new EquipmentItem(),
        new EquipmentItem(),
        new EquipmentItem(),
        new EquipmentItem(),
        new EquipmentItem(),
        new EquipmentItem(),
        new EquipmentItem(),
        new EquipmentItem(),
        new EquipmentItem(),
        new EquipmentItem(),
        new EquipmentItem()
    ];
}