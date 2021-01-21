import { key } from '../config';
import { createErrorOnMainSection } from '../views/errorView';
import * as Validation from './validation';
const axios = require('axios');

class Recipe {
  constructor() {
    this._state = {
      recipe: '',
      recipeElements: {
        id: '',
        publisher: '', 
        ingredients: '', 
        source_url: '', 
        image_url: '', 
        title: '', 
        cooking_time: '', 
        servings: ''
      },
      isValided: false
    }
  }

  async obtainSpecificRecipe(id) {
    try {
      const { data } = await axios.get(`https://forkify-api.herokuapp.com/api/v2/recipes/${id}?key=${key}zz`);
      const recipe = data.data.recipe
      this._state = recipe;

      this._state.recipeElements = {
        id: recipe.id,
        publisher: recipe.publisher, 
        ingredients: recipe.ingredients, 
        source_url: recipe.source_url, 
        image_url: recipe.image_url, 
        title: recipe.title, 
        cooking_time: recipe.cooking_time, 
        servings: recipe.servings
      }
      return data.data.recipe;
    } catch (error) {
      console.log(error);
      createErrorOnMainSection('Error occured!!! Results not found!!!');
    }
  }
  updateServing(updatePortion) {
    if(this._state.recipeElements.servings <= 1 && updatePortion === -1) return; 
    const newServing = this._state.recipeElements.servings + updatePortion
    this._state.recipeElements.ingredients.forEach(ingredient => {
      ingredient.quantity = (ingredient.quantity * newServing / this._state.recipeElements.servings);
      
      if(String(ingredient.quantity).length > 3) ingredient.quantity = ingredient.quantity.toFixed(2); 
      
    })
    this._state.recipeElements.servings = newServing;
  }
  updateCurrentRecipe(newRecipe) {
    this._state.recipeElements = {...newRecipe};
  }
  getCurrentRecipe() {
    return this._state.recipeElements;
  }

  newRecipe() {
    
    const ingredient1 = document.querySelector('input[name="ingredient-1"]').value.split(',');
    const ingredient2 = document.querySelector('input[name="ingredient-2"]').value.split(',');
    const ingredient3 = document.querySelector('input[name="ingredient-3"]').value.split(',');
    const ingredient4 = document.querySelector('input[name="ingredient-4"]').value.split(',');
    const ingredient5 = document.querySelector('input[name="ingredient-5"]').value.split(',');
    const ingredient6 = document.querySelector('input[name="ingredient-6"]').value.split(',');

    let ingredients = [ingredient1, ingredient2, ingredient3, ingredient4, ingredient5, ingredient6];
    
    ingredients = ingredients.map(ing => {
        if(ing.length !== 3) return;
        const obj = {};
        obj.quantity = ing[0] ? ing[0] : +'';
        obj.unit = ing[1];
        obj.description = ing[2];

        return obj;
    });

    ingredients = ingredients.filter(ing => ing !== undefined);

    const recipe = {
        title: document.querySelector('input[name="title"]').value,
        source_url: document.querySelector('input[name="sourceUrl"]').value,
        image_url: document.querySelector('input[name="image"]').value,
        publisher: document.querySelector('input[name="publisher"]').value,
        cooking_time: document.querySelector('input[name="cookingTime"]').value,
        servings: document.querySelector('input[name="servings"]').value,
        ingredients
    };
    if(recipe.image_url === null || recipe.image_url.length < 5) recipe.image_url = 'https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80'; 

    // initate the error message
    const errorMessages = document.querySelectorAll('.error-message');
    const uploadColumns = document.querySelectorAll('.upload__column');

    errorMessages.forEach(errorMessage => {
      errorMessage.parentNode.removeChild(errorMessage);
    })

    const isSourceURLValidated = Validation.validateUrl(recipe.source_url, document.querySelector('input[name="sourceUrl"]')) 
    const isIngredientsValidated = Validation.validateIngredients(recipe.ingredients); 
    const isServingsValidated = Validation.validateNumber(recipe.servings, document.querySelector('input[name="servings"]')) 
    const isCookingTimeValidated = Validation.validateNumber(recipe.cooking_time, document.querySelector('input[name="cookingTime"]'))

    // Validation for ingredients and URL, servings, cooking time
    if (isSourceURLValidated && isIngredientsValidated && isServingsValidated && isCookingTimeValidated) {
      this._state.isValided = true;
    }
    console.dir('Recipe.js 114' + recipe);
    return recipe;
  }
  isValided() {
    return this._state.isValided;
  }
  async sendNewRecipe(recipe) {
    try {
      console.dir(recipe);
      const res = await axios({
        method: 'post',
        url: `https:forkify-api.herokuapp.com/api/v2/recipes/?key=${key}`,
        data: recipe
      });
      
      const data = res.data.data.recipe;
      return data;
    } catch(error) {
      console.log(error);
      createErrorOnMainSection('Error occured!!! Results not found!!!');
    }
  }

}

export default new Recipe();