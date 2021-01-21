import icons from '../../img/icons.svg'

//showRecipes variable
let newRecipes = '';
//showPagination variable
let prevBtn = '';
let nextBtn = '';

export const showRecipes = recipes => {
  newRecipes = recipes.map(recipe => (`<li class="preview">
      <a class="preview__link preview__link--active" href="${recipe.id}">
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
    prevBtn = `${ prev === 1 ? "" : `<button class="btn--inline pagination__btn--prev">
      <svg class="search__icon">
        <use href="${icons}#icon-arrow-left"></use>
      </svg>
      <span>${prev}</span>
    </button>`}`;
    nextBtn = `${recipes.length !== 10 ? '' : `<button class="btn--inline pagination__btn--next">
      <span>${next}</span>
      <svg class="search__icon">
        <use href="${icons}#icon-arrow-right"></use>
      </svg>
    </button>`}`;
    document.querySelector('.pagination').innerHTML = prevBtn + nextBtn;
    
  
}
