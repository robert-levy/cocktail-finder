import { fetchDrinksByLetter } from "../API"

export const initialState = {
    drinks: {
    }
}

export const reducer = (state, { type, payload }) => {
    switch (type) {

        case "letterSearch":
            return { ...state, ...payload }

        default:
            return state
    }
}

export const asyncReducer = async dispatch => {
    let payload = {}
    return async action => {
        switch (action.type) {
            case "letterSearch":
                console.log('in async reducer')
                payload = await fetchDrinksByLetter()
                dispatch({ type: 'letterSearch' }, { payload })
                break;

            default:
                console.log('default case in async reducer')
                break;
        }
    }
}

export default asyncReducer(reducer)
