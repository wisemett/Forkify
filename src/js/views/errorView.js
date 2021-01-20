import icons from 'url:../../img/icons.svg';

const createError = () => {
    const markup = `
        <div class="error">
            <div>
                <svg>
                    <use href="${icons}#icon-alert-triangle"></use>
                </svg>
            </div>
            <p>Error occured!!! Results not found!!!</p>
        </div>
    `;

    document.querySelector('.recipe').innerHTML = markup;
}

    export default createError;