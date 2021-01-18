const axios = require('axios');
const key = '4f8e6c7e-120c-4391-9961-3077c79c689d';

// state
export const state = {
  recipes: [],
  page: 1
};

export const obtainRecipes = async searchWord => {
  await axios.get(`https://forkify-api.herokuapp.com/api/v2/recipes?search=${searchWord}&key=${key}`)
    .then(response => {
      state.recipes = response.data.data.recipes;
    })
    .catch(error => {
      // handle error
      console.log(error);
    });
};

export const getCurrentPage = () => (state.page);
export const updatePage = updateNum => { state.page += updateNum; };
export const getRecipesPerPage = page => {
  const start = (page - 1) * 10;
  const end = page * 10;

  return state.recipes.slice(start, end);
}