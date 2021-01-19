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

  newRecipe() {
    const ingredient1 = document.querySelector('input[name="ingredient-1"]').value.split(',');
    const ingredient2 = document.querySelector('input[name="ingredient-2"]').value.split(',');
    const ingredient3 = document.querySelector('input[name="ingredient-3"]').value.split(',');
    const ingredient4 = document.querySelector('input[name="ingredient-4"]').value.split(',');
    const ingredient5 = document.querySelector('input[name="ingredient-5"]').value.split(',');
    const ingredient6 = document.querySelector('input[name="ingredient-6"]').value.split(',');

    let ingredients = [ingredient1, ingredient2, ingredient3, ingredient4, ingredient5, ingredient6];
    
    ingredients = ingredients.map(ing => {
      // need to modify recipeView:60 ingredients part.
      // if(Object.values(ing).every(value => value === '')) return;

      const obj = {};
      obj.quantity = ing[0] ? ing[0] : '';
      obj.unit = ing[1] ? ing[1] : '';
      obj.description = ing[2] ? ing[2] : '';

      return obj;
    })

    const recipe = {
      title: document.querySelector('input[name="title"]').value,
      source_url: document.querySelector('input[name="sourceUrl"]').value,
      image_url: document.querySelector('input[name="image"]').value,
      publisher: document.querySelector('input[name="publisher"]').value,
      cooking_time: document.querySelector('input[name="cookingTime"]').value,
      servings: document.querySelector('input[name="servings"]').value,
      ingredients: ingredients
    };

    return recipe;
  }

  // not working
  // async uploadNewRecipe(recipe) {
  //   const res = await axios.post(`https://forkify-api.herokuapp.com/api/v2/recipes/?key=${key}`, recipe);
  //   console.log(await res);
  // };


  // codes for bookmark
addBookmark(recipe) {
  const bookmarksList = document.querySelector('.bookmarks__list');
  const bookmarksListMessage = document.querySelector('.bookmarks__list .message');

  if (bookmarksListMessage) bookmarksListMessage.remove();

  const markup = `
    <li class="preview">
      <a class="preview__link" href="#23456">
        <figure class="preview__fig">
          <img src="${recipe.image_url}" alt="Test" />
        </figure>
        <div class="preview__data">
          <h4 class="preview__name">
            ${recipe.title}
          </h4>
          <p class="preview__publisher">${recipe.publisher}</p>
        </div>
      </a>
    </li>
  `;

  bookmarksList.innerHTML += markup;
}
}

export default new Recipe();