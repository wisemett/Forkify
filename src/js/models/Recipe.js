import { key } from '../config';
const axios = require('axios');

class Recipe {
  constructor() {
    this._state = {
      recipe: ''
    }
  }

  async obtainSpecificRecipe(id) {
    try {
      const { data } = await axios.get(`https://forkify-api.herokuapp.com/api/v2/recipes/${id}?key=${key}`);
      this._state = data.data.recipe;
      return data;
    } catch (error) {
      console.log(error);
    }
  }
}

export default new Recipe();