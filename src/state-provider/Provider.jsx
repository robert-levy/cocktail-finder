import React, { useContext, useReducer } from 'react'
import { asyncReducer, reducer, initialState } from './reducer';

export const StateContext = React.createContext();
export const DispatchContext = React.createContext();

export const useCocktailState = () => {
    const context = useContext(StateContext)
    if (context === undefined) {
        throw new Error(`useCocktailState must be used within a Provider`);
    }
    return context;
}

export const useCocktailDispatch = () => {
    const context = useContext(DispatchContext)
    if (context === undefined) {
        throw new Error(`useDispatch must be used within a Provier`);
    }
    return context;
}


const Provider = ({children}) => {
    const [state, dispatch] = useReducer(reducer, initialState)
    return (
        <DispatchContext.Provider value={{asyncReducer:asyncReducer(dispatch),dispatch}}>
            <StateContext.Provider value={state}>
                {children}
            </StateContext.Provider>
        </DispatchContext.Provider>
    )
}

export default Provider
