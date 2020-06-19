import { elements } from './base';
import { limitRecipeTitle } from './searchView';

export function changeHeart(isLiked) {
    const iconNameToSet = isLiked ? 'icon-heart' : 'icon-heart-outlined';
    document.querySelector('.recipe__love use').setAttribute('href', `img/icons.svg#${iconNameToSet}`);
    console.log('heart!');
}

export function toggleHeartVisibility(numOfLikes) {
    if (numOfLikes > 0) elements.likesMenuIcon.style.visibility = 'visible';
    else elements.likesMenuIcon.style.visibility = 'hidden';
}

export function renderLike(like) {
    const markup = `
    <a class="likes__link" href="#${like.id}">
        <figure class="likes__fig">
            <img src="${like.img}" alt="${limitRecipeTitle(like.title)}">
        </figure>
        <div class="likes__data">
            <h4 class="likes__name">${limitRecipeTitle(like.title)}</h4>
            <p class="likes__author">${like.author}</p>
        </div>
    </a>
    `;

    elements.likesList.insertAdjacentHTML('beforeend', markup);
}

export function removeLike(id) {
    const likedRecipeToRemove = document.querySelector(`.likes__link[href="#${id}"]`);
    console.log(likedRecipeToRemove)
    likedRecipeToRemove.parentNode.removeChild(likedRecipeToRemove);
}