import createError from '../views/errorView'
import toggleRecipeEditor from '../controller'


const makeError = msg => {
    createError(msg)
    toggleRecipeEditor();
    throw new Error();
}

const validateUrl = url => {
    const regExpUrl = /^(https?|ftp|torrent|image|irc):\/\/(-\.)?([^\s\/?\.#-]+\.?)+(\/[^\s]*)?$/i;
    if(!regExpUrl.test(url)) makeError("URL validation failed!");
}

const validateNumber = number => {
    if(number < 1) makeError("Servings and Cooking Time should be positive number!")
}

const validateIngredients = ingredients => {
    ingredients.map(ing => ing.quantity).forEach(quan => {
        if(!/^\d+$/.test(quan)) makeError("quantity of ingredient should be number!");
    })
    ingredients.map(ing => ing.unit).forEach(unit => {
        if(!/[^0-9]+/g.test(unit)) makeError("unit of ingredient should be string!");
    })
    ingredients.map(ing => ing.description).forEach(desc => {
        if(!/[^0-9]+/g.test(desc)) makeError("description of ingredient should be string!");
    })
}

export { validateUrl, validateNumber, validateIngredients };