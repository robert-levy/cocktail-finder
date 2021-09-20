import { fetchDrinksByLetter, fetchRandomDrink } from "../API"
import { checkIsFavourite, addFavouriteProperty } from "../utility-functions"

export const initialState = {
    cocktails: {
        searched: {},
        favourites: [],
        randomCocktail: {}
    },
    selectedLetter: undefined
}

export const reducer = (state, { type, payload }) => {
    let newState = {}
    switch (type) {
        case "letterSearch":
            addFavouriteProperty(payload.drinks.drinks) //breaks when clicking on letter with no drinks
            newState[payload.letter] = {
                ...payload.drinks.drinks
            }
            return {
                ...state,
                cocktails: {
                    ...state.cocktails,
                    searched: {
                        ...state.cocktails.searched,
                        ...newState
                    }
                },
                selectedLetter: payload.letter
            }

        case "changeSelectedLetter":
            return {
                ...state,
                selectedLetter: payload
            }

        case "randomSearch":
            addFavouriteProperty(payload.drinks)
            return {
                ...state,
                cocktails: {
                    ...state.cocktails,
                    randomCocktail: payload.drinks[0]
                }
            }

        case "favouriteToggle":
            const isFavourite = checkIsFavourite(state, payload)
            if (isFavourite) {
                const newFavourites = (state.cocktails.favourites).filter(cocktail => cocktail !== payload)
                payload.favourite = false
                return {
                    ...state,
                    cocktails: {
                        ...state.cocktails,
                        favourites: newFavourites
                    }
                }
            }
            else {
                console.log(payload)
                payload.favourite = true
                return {
                    ...state,
                    cocktails: {
                        ...state.cocktails,
                        favourites: [
                            ...state.cocktails.favourites,
                            payload
                        ],
                    }
                }
            }
        default:
            return state
    }
}

export const asyncReducer = dispatch => {
    return async ({ type, payload }) => {
        switch (type) {
            case "letterSearch":
                const drinks = await fetchDrinksByLetter(payload)
                payload = { drinks, letter: payload }
                dispatch({ type, payload })
                break

            case "randomSearch":
                const drink = await fetchRandomDrink() //sometimes this returns undefined
                payload = drink
                dispatch({ type, payload })
                break

            case "changeSelectedLetter":
                dispatch({ type, payload })
                break
            case "favouriteToggle":
                dispatch({type,payload})
                break

            default:
                console.log(`default case in async reducer, case is ${type}`)
                break
        }
    }
}

// export default asyncReducer(reducer)
