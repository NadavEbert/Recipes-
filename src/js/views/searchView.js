
import { elements } from './base';

export const getInput = () => elements.searchInput.value;

export const clearInput = () => {
    elements.searchInput.value = '';
};

export const clearResults = () => {
    elements.searchResList.innerHTML = '';
}

export const limitRecipeTitle = (title, limit = 17) => {
    if (title.length > limit) {
        const words = title.split(' ');
        const newTitle = [];

        words.reduce((acc, word) => {
            if (acc + word.length <= limit)
                newTitle.push(word);
            return acc + word.length;
        }, 0);
        return `${newTitle.join(' ')}...`;
    }
    return title;
}

const renderRecipe = recipe => {
    const markup = `
    <li>
    <a class="results__link" href="#${recipe.recipe_id}">
        <figure class="results__fig">
            <img src="${recipe.image_url}" alt="${recipe.title}">
        </figure>
        <div class="results__data">
            <h4 class="results__name">${limitRecipeTitle(recipe.title)}</h4>
            <p class="results__author">${recipe.publisher}</p>
        </div>
    </a>
</li>
`;
    elements.searchResList.insertAdjacentHTML('beforeend', markup);

};


export const highlightSelectedRecipe = id => {
    const allResults = Array.from(document.querySelectorAll('.results__link'));
    //let isIDInAllResults=false;
    if (allResults.length !== 0) {

        allResults.forEach(result => {
            if (result.classList.contains('results__link--active')) result.classList.remove('results__link--active')
            if (result.id === id) document.querySelector(`.results__link[href="#${id}"]`).classList.add('results__link--active');
        })

    }

}

const createButton = (page, type) => `

    <button class="btn-inline results__btn--${type}" data-goto=${type === 'next' ? page + 1 : page - 1}>
    
    <span>Page ${type === 'next' ? page + 1 : page - 1}</span>
    <svg class="search__icon">
        <use href="img/icons.svg#icon-triangle-${type === 'next' ? 'right' : 'left'}"></use>
    </svg>
    </button>

`;

const renderButtons = (page, numOfResults, resPerPage) => {
    const pages = Math.ceil(numOfResults / resPerPage);
    let button;
    if (page === 1 && pages > 1) {
        button = createButton(page, 'next')
    } else if (page < pages) {
        button = `
        ${createButton(page, 'prev')}
        ${createButton(page, 'next')}
        ` ;
    } else if (page === pages && pages > 1) {
        button = createButton(page, 'prev')
    }
    elements.searchResPages.insertAdjacentHTML('afterbegin', button);
};

export const clearButtons = () => {
    elements.searchResPages.innerHTML = '';
}

export const renderResults = (recipes, page = 1, resPerPage = 10) => {
    const start = (page - 1) * resPerPage;
    const end = page * resPerPage;

    recipes.slice(start, end).forEach(renderRecipe);

    renderButtons(page, recipes.length, resPerPage);
};