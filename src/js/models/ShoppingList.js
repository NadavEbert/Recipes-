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
        this.writeToStorage();
        return item;
    }

    deleteItem(id) {
        const indexOfItemWithID = this.items.findIndex(item => item.id === id);
        this.items.splice(indexOfItemWithID, 1);
        this.writeToStorage();
    }

    updateAmount(id, newAmount) {
        this.items.find(item => item.id === id).amount = newAmount;
        this.writeToStorage();
    }
    isEmpty() {
        return this.items.length > 0 ? false : true;
    }

    deleteAll() {
        this.items = [];
        this.writeToStorage();
    }

    writeToStorage() {
        localStorage.setItem('items', JSON.stringify(this.items));
    }
    readFromStorage() {
        const storageData = JSON.parse(localStorage.getItem('items'));
        if (storageData) this.items = storageData;
    }
}