import { fetchDrinksByLetter, fetchRandomDrink } from "../API"
import { preProcessData } from "../utility-functions"

export const initialState = {
    cocktails: {
        searched: {},
        favourites: [],
        randomCocktail: {}
    },
    selectedLetter: undefined,
    searchTerm: ""
}

export const reducer = (state, { type, payload }) => {
    let newState = {}
    let cocktails = []
    if(!payload) return state
    switch (type) {
        case "letterSearch":
            cocktails = preProcessData(payload.drinks.drinks)
            newState[payload.letter] = { ...cocktails }
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
            cocktails = preProcessData(payload.drinks)
            return {
                ...state,
                cocktails: {
                    ...state.cocktails,
                    randomCocktail: cocktails[0]
                }
            }

        case "favouriteToggle":
            const filteredFavourites = state.cocktails.favourites.filter(cocktail => cocktail.idDrink !== payload.idDrink)
            let newFavourites = []
            // only way to compare arrays of objects is with JSONstringify
            if (state.cocktails.favourites.length === 0 || JSON.stringify(filteredFavourites) === JSON.stringify(state.cocktails.favourites))
                newFavourites = [...state.cocktails.favourites, payload]
            else
                newFavourites = filteredFavourites
            return {
                ...state,
                cocktails: {
                    ...state.cocktails,
                    favourites: newFavourites
                }
            }

        case "newSearchTerm":
            return {
                ...state,
                searchTerm: payload
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

            default:
                console.log(`default case in async reducer, case is ${type}`)
                break
        }
    }
}