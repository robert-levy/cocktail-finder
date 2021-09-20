export const getCocktailIngredients = (cocktail) => {
    let ingredients = ""
    Object.entries(cocktail).map(entry => {
        if (entry[0].startsWith('strIngredient')) ingredients += `${entry[1]}, `
    })
    return ingredients.slice(0, -2)
}

export const getCocktails = (state) => {
    const cocktails = Object.values(state.cocktails.searched[state.selectedLetter])
    if (cocktails === undefined) return [] // should display <NotFound/>
    return cocktails
}

export const containsCocktailData = (state, letter) => state.cocktails.searched[letter]

export const checkIsFavourite = (state, cocktail) => (state.cocktails.favourites).includes(cocktail)

export const preProcessData = (cocktails) => {
    if(cocktails === null) return [] //should display <NotFound/>
    cocktails.forEach(cocktail => {
        Object.keys(cocktail).forEach(key => cocktail[key] === null && delete cocktail[key])
        cocktail['favourite'] = false
    })
}



