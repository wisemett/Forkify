import { key } from '../config';
const axios = require('axios');

class Recipe {
  constructor() {
    this._state = {
      recipes: [],
    }
  }

  async obtainSpecificRecipe(id) {
    try {
      const { data } = await axios.get(`https://forkify-api.herokuapp.com/api/v2/recipes/${id}?key=${key}`);
      console.log(data);
      return data;
    } catch (error) {
      console.log(error);
    }
  }
}

export default new Recipe();