import React from 'react'
import { Button } from 'react-bootstrap';
import { containsCocktailData } from '../../utility-functions';

const Letter = ({ state, letter, dispatch }) => {

    // Only makes API call if data is not already in state
    const handleClick = () => {
        containsCocktailData(state, letter) ?
            dispatch({ type: 'changeSelectedLetter', payload: letter }) //could use just dispatch here instead of async and dispatch
            : dispatch({ type: 'letterSearch', payload: letter })
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

const Letters = ({ state, dispatch }) => {

    const alphabet = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
    return (
        <div className="d-flex justify-content-center mt-5 flex-wrap">
            {alphabet.map((letter, index) => (
                <Letter state={state} letter={letter} dispatch={dispatch} key={index} />
            ))}
        </div>
    )
}

export default Letters
