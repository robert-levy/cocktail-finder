// returns a string of a cocktail's ingredients
export const getCocktailIngredients = (cocktail) => {
    let ingredients = ""
    Object.entries(cocktail).forEach(entry => {
        if (entry[0].startsWith('strIngredient')) ingredients += `${entry[1]}, `
    })
    return ingredients.slice(0, -2)
}

// returns array of cocktails from seached object
export const getCocktails = (searched, selectedLetter) => {
    if (Object.keys(searched).length === 0) return []
    const cocktails = Object.values(searched[selectedLetter])
    return cocktails
}

// checks if cocktail data for selected letter has already been fetched
export const containsCocktailData = (state, letter) => state.cocktails.searched[letter]

// checks if given cocktail is in favourites 
export const checkIsFavourite = (favourites, cocktail) => favourites.some(favCocktail => favCocktail.idDrink === cocktail.idDrink)

// removes all falsy entries from API data
export const preProcessData = (cocktails) => {
    if (cocktails === null) return []
    cocktails.forEach(cocktail => Object.keys(cocktail).forEach(key => !cocktail[key] && delete cocktail[key]))
    return cocktails
}