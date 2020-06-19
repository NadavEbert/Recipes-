import axios from 'axios';

export default class Recipe {
    constructor(id) {
        this.id = id;
    }

    async setRecipeInfo() {
        try {
            const resData = await axios(`https://forkify-api.herokuapp.com/api/get?rId=${this.id}`);
            console.log(resData);
            const result = resData.data.recipe;
            this.title = result.title;
            this.author = result.publisher;
            this.img = result.image_url;
            this.url = result.source_url;
            this.ingredients = result.ingredients;

        }
        catch (error) {
            alert(error);
        }
    }

    calculateTime() {
        const numOfIngredients = this.ingredients.length;
        const periods = Math.ceil(numOfIngredients / 3);
        this.time = periods * 15;
    }

    calculateServings() {
        this.servings = 4;
    }

    parseIngredients() {
        const units = {
            'tablespoons': 'tbsp',
            'tablespoon': 'tbsp',
            'ounces': 'oz',
            'ounce': 'oz',
            'teaspoons': 'tsp'
            , 'teaspoon': 'tsp'
            , 'cups': 'cup',
            'pounds': 'pound'
            , 'kg': 'kg'
            , 'g': 'g'
        };
        const newIngredients = this.ingredients.map(ingredient => {
            let newIngredient = ingredient.toLowerCase();

            for (let key in units)
                newIngredient = newIngredient.replace(key, units[key]);
            newIngredient = newIngredient.replace(/ *\([^)]*\) */g, ' ');

            let recObj = {};

            const ingArr = newIngredient.split(' ');

            const unitIndex = ingArr.findIndex(word => {
                for (let i in units)
                    if (word === units[i])
                        return true;
            });

            if (unitIndex > 0) {// if the unit is the second word, an amount should come before
                const amountArr = ingArr.slice(0, unitIndex);

                recObj.unit = ingArr[unitIndex];
                if (amountArr[1])
                    recObj.amount = eval(amountArr.join('+'));
                else
                    recObj.amount = eval(amountArr[0].replace('-', '+'));

                recObj.ingredient = ingArr.slice(unitIndex + 1).join(' ');
            } else if (parseInt(ingArr[0], 10)) { // if there is no unit and the first word is a number it is the amount
                recObj.unit = '';
                recObj.amount = parseInt(ingArr[0], 10);
                recObj.ingredient = ingArr.slice(1).join(' ');
            } else {// if the first word is not a number than amount is 1
                recObj.unit = ''
                recObj.amount = 1;
                recObj.ingredient = newIngredient;
            }


            return recObj;
        });

        this.ingredients = newIngredients;


    }
    updateServings(type) {

        const newServings = type === 'dec' ? this.servings - 1 : this.servings + 1;
        this.ingredients.forEach(ingredient => {
            ingredient.amount *= (newServings / this.servings)
        })
        this.servings = newServings;
    }
}
