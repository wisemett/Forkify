import icons from '../../img/icons.svg';

export const createErrorOnMainSection = msg => {
    const markup = `
        <div class="error">
            <div>
                <svg>
                    <use href="${icons}#icon-alert-triangle"></use>
                </svg>
            </div>
            <p>${msg}</p>
        </div>
    `;

    document.querySelector('.recipe').innerHTML = markup;
}

export const createErrorForAddRecipe = (msg, inputEl) => {
    const $input = inputEl;
    const $errorMessageNode = document.createElement('p');
    $errorMessageNode.textContent = msg;
    $errorMessageNode.classList.add('error-message');
    $errorMessageNode.style.color = 'red';
    console.log(inputEl, msg);
    $input.after($errorMessageNode);
}
