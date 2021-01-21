import icons from 'url:../../img/icons.svg';

const createSpinner = err => {
    const markup = `
        <div class="spinner">
            <svg>
                <use href="${icons}#icon-loader"></use>
            </svg>
        </div>
    `;

    document.querySelector('.recipe').innerHTML = markup;
}

    export default createSpinner;