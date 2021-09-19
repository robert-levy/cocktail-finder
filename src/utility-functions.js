export const getCocktailIngredients = (cocktail) => {
    let ingredients = ""
    //TODO: Convert to foreach
    Object.entries(cocktail).map(entry => {
        if (entry[0].startsWith('strIngredient') && entry[1]) ingredients += `${entry[1]}, ` 
    })
    return ingredients.slice(0, -2) //remove whitespace and comma
}

export const getCocktails = (state) => {
    const cocktails = Object.values(state.cocktails.searched[state.selectedLetter])
    if (cocktails === undefined) return [] // should display <NotFound/>
    return cocktails
}

export const containsCocktailData = (state, letter) => state.cocktails.searched[letter]

