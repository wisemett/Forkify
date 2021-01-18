import View from './view';

class SearchView extends View {
  showPagination(prev, next, recipes) {
    document.querySelector('.pagination').innerHTML = `${ prev === 1 ? "" : `<button class="btn--inline pagination__btn--prev">
    <svg class="search__icon">
      <use href="src/img/icons.svg#icon-arrow-left"></use>
    </svg>
    <span>${prev}</span>
    </button>`}`
    +
    `${recipes.length !== 10 ? '' : `<button class="btn--inline pagination__btn--next">
    <span>${next}</span>
    <svg class="search__icon">
      <use href="src/img/icons.svg#icon-arrow-right"></use>
    </svg>
    </button>`}`;
  }
}

export default new SearchView();