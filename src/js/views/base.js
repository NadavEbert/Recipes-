export const elements = {
    searchInput: document.querySelector('.search__field'),
    searchForm: document.querySelector('.search'),
    searchResList: document.querySelector('.results__list'),
    searchResContainer: document.querySelector('.results'),
    searchResPages: document.querySelector('.results__pages'),
    recipe: document.querySelector('.recipe'),
    shoppingList: document.querySelector('.shopping__list'),
    shoppingContainer: document.querySelector('.shopping'),

    shoppingListItemAmount: document.querySelector('.shopping__amount-value'),
    likesMenuIcon: document.querySelector('.likes__field'),
    likesList: document.querySelector('.likes__list'),
    shoppingForm: document.querySelector('.shopping__form'),
    addItemButton: document.querySelector('form .add')

}

export const elementStrings = {
    loader: 'loader'
}

export const renderLoader = parent => {
    const loader = `
    <div class=${elementStrings.loader}>
        <svg>
            <use href='img/icons.svg#icon-cw'></use>
        </svg>
    </div>
    `
    parent.insertAdjacentHTML('afterbegin', loader);
}

export const clearLoader = () => {
    const loader = document.querySelector(`.${elementStrings.loader}`);
    if (loader)
        loader.parentNode.removeChild(loader);
}