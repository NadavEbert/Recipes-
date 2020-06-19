import { elements } from './base';


export const renderItem = item => {
    const markup = `
        <li class="shopping__item" data-itemid=${item.id}>
            <div class="shopping__count">
                <input type="number" value="${item.amount}" min="0" step="${item.amount / 4}" class="shopping__amount-value">
                <p>${item.unit}</p>
            </div>
            <p class="shopping__description">${item.ingredient}</p>
            <button class="shopping__delete btn-tiny">
                <svg>
                    <use href="img/icons.svg#icon-circle-with-cross"></use>
                </svg>
            </button>
        </li>
    `;
    elements.shoppingList.insertAdjacentHTML('beforeend', markup);
};

export const deleteItem = id => {
    const itemToDelete = document.querySelector(`[data-itemid="${id}"]`);
    if (itemToDelete) itemToDelete.parentNode.removeChild(itemToDelete);
};