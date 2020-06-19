export default class Likes {
    constructor() {
        this.likedRecipes = [];
    }

    addLike(id, title, author, img) {
        const like = {
            id,
            title,
            author,
            img
        };
        this.likedRecipes.push(like);
        this.writeToStorage();
        return like;
    }

    deleteLike(id) {
        const index = this.likedRecipes.findIndex(item => item.id === id);
        this.likedRecipes.splice(index, 1);
        this.writeToStorage();
    }

    isLiked(id) {
        return (this.likedRecipes.findIndex(item => item.id === id)) !== -1;
    }

    getNumberOfLikes() { return this.likedRecipes.length };

    writeToStorage() {
        localStorage.setItem('likes', JSON.stringify(this.likedRecipes));
    }

    readFromStorage() {
        const storageData = JSON.parse(localStorage.getItem('likes'));
        if (storageData) this.likedRecipes = storageData;
    }
}