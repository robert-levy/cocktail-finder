import React from 'react'
import { Button } from 'react-bootstrap';
import { containsCocktailData } from '../utility-functions';
import { useCocktailDispatch, useCocktailState } from '../state-provider/Provider';

const Letters = () => {

    const alphabet = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
    return (
        <div className="d-flex justify-content-center mt-5 flex-wrap">
            {alphabet.map((letter, index) => (
                <Letter letter={letter} key={index} />
            ))}
        </div>
    )
}

const Letter = ({ letter }) => {

    const state = useCocktailState()
    const { asyncReducer, dispatch } = useCocktailDispatch()

    // Only makes API call if data is not already in state
    const handleClick = () => {
        containsCocktailData(state, letter) ?
            dispatch({ type: 'changeSelectedLetter', payload: letter })
            : asyncReducer({ type: 'letterSearch', payload: letter })
    }

    return (
        <h3>
            <Button
                variant="warning"
                className="ms-2 me-2"
                onClick={handleClick}
            >
                {letter}
            </Button>
        </h3>
    )
}

export default Letters
