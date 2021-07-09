export function getItemByName(array, nameKey) {
    for (let i = 0; i < array.length; i++) {
        if (array[i].name === nameKey) {
            return array[i];
        }
    }
}