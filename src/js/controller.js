import search from './models/Search';
import * as searchView from './views/searchView';


const renderSearchResult = () => {
  // obtain current page;
  const page = search.getCurrentPage();
  // obtain limited recipes per page
  const recipesPerPage = search.getRecipesPerPage(page);
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
  await search.obtainRecipes(searchWord);

  renderSearchResult();
  // update page when pagination button is clicked
};

const changePage = e => {
  if (!e.target.classList.contains('pagination__btn--prev') && !e.target.classList.contains('pagination__btn--next')) return;
  const pageNum = e.target.classList.contains('pagination__btn--prev') ? -1 : 1;
  search.updatePage(pageNum);
  renderSearchResult();
};

document.querySelector('.search').addEventListener('submit', searchHandler);
document.querySelector('.pagination').addEventListener('click', changePage);

// show each recipe
// const showDetailedInfoOfRecipe = () => {
//   console.log('ok');
// };

// document.querySelector('.preview').addEventListener('click', showDetailedInfoOfRecipe);

// const timeout = function (s) {
//   return new Promise(function (_, reject) {
//     setTimeout(function () {
//       reject(new Error(`Request took too long! Timeout after ${s} second`));
//     }, s * 1000);
//   });
// };

// https://forkify-api.herokuapp.com/v2