import uniqid from 'uniqid';

export default class ShoppingList {
    constructor() {
        this.items = [];
    }

    addItem(amount, unit, ingredient) {
        const item = {
            id: uniqid(),
            amount,
            unit,
            ingredient
        }
        this.items.push(item);
        return item;
    }

    deleteItem(id) {
        const indexOfItemWithID = this.items.findIndex(item => item.id === id);
        this.items.splice(indexOfItemWithID, 1);
    }

    updateAmount(id, newAmount) {
        this.items.find(item => item.id === id).amount = newAmount;
    }
}