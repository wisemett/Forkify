//bookmarkContent variable
let $bookmarkContent = document.querySelector('.bookmarks__list');

export const showBookmarkContent = (recipeList) => {
    if (recipeList.length === 0) {
        $bookmarkContent.innerHTML = `<div class="message">
            <div>
            <svg>
                <use href="src/img/icons.svg#icon-smile"></use>
            </svg>
            </div>
            <p>
            No bookmarks yet. Find a nice recipe and bookmark it :)
            </p>
        </div>`;
        return;
    } 

    $bookmarkContent.innerHTML = recipeList.map(recipe => {
        return `<li class="preview">
        <a class="preview__link" href='${recipe.id}'>
          <figure class="preview__fig">
            <img src="${recipe.image_url}" alt="${recipe.title}" />
          </figure>
          <div class="preview__data">
            <h4 class="preview__name">
              ${recipe.title}
            </h4>
            <p class="preview__publisher">${recipe.publisher}</p>
          </div>
        </a>
      </li>`}).join(' ');
}