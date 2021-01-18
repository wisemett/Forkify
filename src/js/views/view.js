class View {
  showRecipes(recipes) {
    const newRecipes = recipes.map(recipe => (`<li class="preview">
      <a class="preview__link preview__link--active" href="#23456">
        <figure class="preview__fig">
          <img src=${recipe.image_url} alt=${recipe.title} />
        </figure>
        <div class="preview__data">
          <h4 class="preview__title">${recipe.title}</h4>
          <p class="preview__publisher">${recipe.publisher}</p>
          <div class="preview__user-generated">
            <svg>
              <use href="src/img/icons.svg#icon-user"></use>
            </svg>
          </div>
        </div>
      </a>
    </li>
      `))
    document.querySelector('.results').innerHTML = newRecipes;
  }
}

export default View;