import icons from 'url:../../img/icons.svg'


export const showRecipes = recipes => {
    const newRecipes = recipes.map(recipe => (`<li class="preview">
      <a class="preview__link preview__link--active" href="#${recipe.id}">
        <figure class="preview__fig">
          <img src=${recipe.image_url} alt=${recipe.title} />
        </figure>
        <div class="preview__data">
          <h4 class="preview__title">${recipe.title}</h4>
          <p class="preview__publisher">${recipe.publisher}</p>
          <div class="preview__user-generated">
            <svg>
              <use href="${icons}#icon-user"></use>
            </svg>
          </div>
        </div>
      </a>
    </li>`)).join('');
    document.querySelector('.results').innerHTML = newRecipes;
  }

export const showPagination = (prev, next, recipes) => {
    document.querySelector('.pagination').innerHTML = `${ prev === 1 ? "" : `<button class="btn--inline pagination__btn--prev">
    <svg class="search__icon">
      <use href="${icons}#icon-arrow-left"></use>
    </svg>
    <span>${prev}</span>
    </button>`}`
    +
    `${recipes.length !== 10 ? '' : `<button class="btn--inline pagination__btn--next">
    <span>${next}</span>
    <svg class="search__icon">
      <use href="${icons}#icon-arrow-right"></use>
    </svg>
    </button>`}`;
  
}
