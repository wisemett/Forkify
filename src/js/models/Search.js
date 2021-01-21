import { key } from '../config';
import createError from '../views/errorView';
const axios = require('axios');

class Search {
  constructor() {
    this._state = {
      recipes: [],
      page: 1
    }
  }

  async obtainRecipe(searchWord) {
    try {
      const { data } = await axios.get(`https://forkify-api.herokuapp.com/api/v2/recipes?search=${searchWord}&key=${key}`);
      this._state.recipes = data.data.recipes;
      return data;
    } catch (error) {
      console.log(error);
      createError('Error occured!!! Results not found!!!');
    }
  }

  getCurrentPage() { return this._state.page; }

  updatePage(updateNum) { this._state.page += updateNum; }

  getRecipesPerPage(page) {
    const start = (page - 1) * 10;
    const end = page * 10;
    return this._state.recipes.slice(start, end);
  }
}

export default new Search();
