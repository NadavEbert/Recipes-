// Global app controller

import Search from './models/Search';
import Recipe from './models/Recipe';
import ShoppingList from './models/ShoppingList';
import Likes from './models/Likes';
import * as searchView from './views/searchView';
import * as recipeView from './views/recipeView';
import * as listView from './views/listView';
import * as likesView from './views/likesView';

import { elements, renderLoader, clearLoader } from './views/base';


const state = {};

const controlSearch = async () => {
    const query = searchView.getInput();
    if (query) {
        state.search = new Search(query)
    }
    searchView.clearInput();
    searchView.clearResults();
    searchView.clearButtons();
    renderLoader(elements.searchResContainer);

    try {

        await state.search.getResults();
        clearLoader();

        searchView.renderResults(state.search.result);
    } catch (error) {
        alert('something is wrong with the search');
        clearLoader();

    }

};




const controlRecipe = async () => {
    const id = window.location.hash.replace('#', '');

    if (id) {
        state.recipe = new Recipe(id);
        recipeView.clearRecipe();
        renderLoader(elements.recipe);
        searchView.highlightSelectedRecipe(id);
        try {
            await state.recipe.setRecipeInfo();
            state.recipe.calculateTime();
            state.recipe.calculateServings();
            state.recipe.parseIngredients();
            console.log(state.recipe);
            clearLoader();
            if ((state.likes) && (state.likes.isLiked(id))) recipeView.renderRecipe(state.recipe, true);
            else recipeView.renderRecipe(state.recipe, false);

        } catch (error) {
            alert('Error processing recipe :(' + error);
        }

    }
};


const controlShoppingList = () => {
    if (!state.shoppingList) state.shoppingList = new ShoppingList();

    state.recipe.ingredients.forEach(ing => {
        const item = state.shoppingList.addItem(ing.amount, ing.unit, ing.ingredient);
        listView.renderItem(item);
    });

}







function controlLike() {

    const currentID = state.recipe.id;
    if (!state.likes.isLiked(currentID)) {
        const newLike = state.likes.addLike(state.recipe.id, state.recipe.title, state.recipe.author, state.recipe.img);
        likesView.changeHeart(true);
        likesView.renderLike(newLike);
    } else {
        state.likes.deleteLike(currentID);
        likesView.removeLike(currentID);
        likesView.changeHeart(false);
    }
    likesView.toggleHeartVisibility(state.likes.getNumberOfLikes());
}


/*-----------------EVENT LISTENERES------------------------------------*/

elements.searchForm.addEventListener('submit', event => {
    event.preventDefault();
    controlSearch();
});


window.addEventListener('load', () => {
    state.likes = new Likes();
    state.likes.readFromStorage();
    likesView.toggleHeartVisibility(state.likes.getNumberOfLikes());
    state.likes.likedRecipes.forEach(like => {
        likesView.renderLike(like);
    })
})




elements.searchResPages.addEventListener('click', event => {
    //FIND THE CLOSEST 'BTN-INLINE' TO WHERE THE CLICK HAPPENNED
    const btn = event.target.closest('.btn-inline');
    if (btn) {
        const pageToGo = parseInt(btn.dataset.goto, 10);
        console.log(pageToGo);
        searchView.clearResults();
        searchView.clearButtons();


        searchView.renderResults(state.search.result, pageToGo);
        const id = window.location.hash.replace('#', '');
        if (id) searchView.highlightSelectedRecipe(id);

    }


});



elements.shoppingList.addEventListener('click', event => {
    const id = event.target.closest('.shopping__item').dataset.itemid;

    if (event.target.matches('.shopping__delete,.shopping__delete *')) {
        state.shoppingList.deleteItem(id);
        listView.deleteItem(id);
    }
    else if (event.target.matches('.shopping__amount-value')) {
        const newAmount = parseFloat(event.target.value);
        state.shoppingList.updateAmount(id, newAmount);
    }
});

//launch controlRecipe() for every hash change or page load/re-load
//when a recipe is clicked the hash automatically changes 
['hashchange', 'load'].forEach(event => window.addEventListener(event, controlRecipe));





elements.recipe.addEventListener('click', event => {
    if (event.target.matches('.btn-decrease, .btn-decrease *')) {
        if (state.recipe.servings > 1) state.recipe.updateServings('dec');
        recipeView.updateAmounts(state.recipe);
    }
    else if (event.target.matches('.btn-increase, .btn-increase *')) {
        state.recipe.updateServings('inc');
        recipeView.updateAmounts(state.recipe);
    }
    else if (event.target.matches('.recipe__btn--add,.recipe__btn--add *')) {
        controlShoppingList();
    }
    else if (event.target.matches('.recipe__love,.recipe__love *')) {
        controlLike();
    }
});