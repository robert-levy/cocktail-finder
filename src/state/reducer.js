import { fetchDrinksByLetter, fetchRandomDrink } from "../API"

export const initialState = {
    cocktails: {
        searched: {},
        favourites: [],
        randomCocktail: {}
    },
    selectedLetter: undefined
}

export const reducer = (state, action) => {
    let newState = {}
    switch (action.type) {
        case "letterSearch":
            const letter = action.payload.letter
            newState[letter] = {
                ...action.payload.drinks.drinks
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
                selectedLetter: letter
            }

        case "changeSelectedLetter":
            return {
                ...state, 
                selectedLetter: action.payload
            }

        case "randomSearch":
            return {
                ...state,
                cocktails: {
                    ...state.cocktails,
                    randomCocktail: action.payload.drinks[0]
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
                const drink = await fetchRandomDrink()
                payload = drink
                dispatch({ type, payload })
                break

            case "changeSelectedLetter":
                dispatch({type, payload})
                break

            default:
                console.log(`default case in async reducer, case is ${type}`)
                break
        }
    }
}

// export default asyncReducer(reducer)
