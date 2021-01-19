import { key } from '../config';
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
      }
    }
  }

  async obtainSpecificRecipe(id) {
    try {
      const { data } = await axios.get(`https://forkify-api.herokuapp.com/api/v2/recipes/${id}?key=${key}`);
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
    }
  }
  updateServing(updatePortion) {
    if(this._state.recipeElements.servings <= 1 && updatePortion === -1) return; 
    const newServing = this._state.recipeElements.servings + updatePortion
    this._state.recipeElements.ingredients.forEach(ingredient => {
      ingredient.quantity = (ingredient.quantity * newServing / this._state.recipeElements.servings)
    })
    this._state.recipeElements.servings = newServing;
  }
  getCurrentRecipe() {
    return this._state.recipeElements;
  }
}

export default new Recipe();