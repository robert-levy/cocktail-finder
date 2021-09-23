export const getCocktailIngredients = (cocktail) => {
    let ingredients = ""
    Object.entries(cocktail).map(entry => {
        if (entry[0].startsWith('strIngredient')) ingredients += `${entry[1]}, `
    })
    return ingredients.slice(0, -2)
}

export const getCocktails = (state) => {
    const cocktails = Object.values(state.cocktails.searched[state.selectedLetter])
    if (cocktails === undefined) return null // should display <NotFound/>
    return cocktails
}

// checks if cocktail data for selected letter has already been fetched
export const containsCocktailData = (state, letter) => state.cocktails.searched[letter]

// checks if given cocktail is in favourites        RETURNING WRONG VALUES FOR RANDOM COCKTAILS AND FAVOURITING ALL OTHERS
export const checkIsFavourite = (favourites, cocktail) => {
    favourites.map(favCock => console.log(`favCock : ${favCock.strDrink} ${favCock.idDrink} and cocktail :  ${cocktail.strDrink} ${cocktail.idDrink}`))
    const isFavourite = favourites.filter(favCock => favCock.idDrink === cocktail.idDrink)
    // console.log(isFavourite)
    if(isFavourite.length === 0) return false
    return true
}

export const preProcessData = (cocktails) => {
    // letter search returns no cocktails, return []
    if (cocktails === null) return []

    cocktails.forEach(cocktail => {
        // remove all null values
        Object.keys(cocktail).forEach(key => cocktail[key] === null && delete cocktail[key])
    }
    )
    return cocktails
}




