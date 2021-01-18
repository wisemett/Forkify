import Search from './models/Search';
import Recipe from './models/Recipe';
import * as searchView from './views/searchView';
import * as recipeView from './views/recipeView';

const renderSearchResult = () => {
  // obtain current page;
  const page = Search.getCurrentPage();
  // obtain limited recipes per page
  const recipesPerPage = Search.getRecipesPerPage(page);
  // show recipes
  searchView.showRecipes(recipesPerPage);
  // show pagination
  searchView.showPagination(page, page + 1, recipesPerPage);
};

// search and display recipes on the left side 
const searchHandler = async e => {
  e.preventDefault();
  const searchWord = e.target.children[0].value;
  // search and update the model
  await Search.obtainRecipes(searchWord);

  renderSearchResult();
  // update page when pagination button is clicked
};

const changePage = e => {
  if (!e.target.classList.contains('pagination__btn--prev') && !e.target.classList.contains('pagination__btn--next')) return;
  const pageNum = e.target.classList.contains('pagination__btn--prev') ? -1 : 1;
  Search.updatePage(pageNum);
  renderSearchResult();
};

document.querySelector('.search').addEventListener('submit', searchHandler);
document.querySelector('.pagination').addEventListener('click', changePage);

// show each recipe
const showDetailedInfoOfRecipe = async e => {
  //error
  if (!(e.target.matches('.preview__link'))) return;
  //obtain the specific recipe
  const id = e.target.getAttribute('href').substring(1);
  const recipe = await Recipe.obtainSpecificRecipe(id);
  recipeView.showDetailedRecipeInfo(recipe);
};

document.querySelector('.search-results > .results').addEventListener('click', showDetailedInfoOfRecipe);

// const timeout = function (s) {
//   return new Promise(function (_, reject) {
//     setTimeout(function () {
//       reject(new Error(`Request took too long! Timeout after ${s} second`));
//     }, s * 1000);
//   });
// };

// https://forkify-api.herokuapp.com/v2