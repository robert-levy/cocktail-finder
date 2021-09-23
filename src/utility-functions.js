export const getCocktailIngredients = (cocktail) => {
    let ingredients = ""
    Object.entries(cocktail).map(entry => {
        if (entry[0].startsWith('strIngredient')) ingredients += `${entry[1]}, `
    })
    return ingredients.slice(0, -2)
}

export const getCocktails = (state) => {
    const cocktails = Object.values(state.cocktails.searched[state.selectedLetter])
    if (cocktails === undefined) return null
    return cocktails
}

// checks if cocktail data for selected letter has already been fetched
export const containsCocktailData = (state, letter) => state.cocktails.searched[letter]

// checks if given cocktail is in favourites 
export const checkIsFavourite = (favourites, cocktail) => favourites.some(favCocktail => favCocktail.idDrink === cocktail.idDrink)

export const preProcessData = (cocktails) => {
    if (cocktails === null) return []
    cocktails.forEach(cocktail => Object.keys(cocktail).forEach(key => cocktail[key] === null && delete cocktail[key]))
    return cocktails
}