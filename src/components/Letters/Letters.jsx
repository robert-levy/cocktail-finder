import React from 'react'
import { Button } from 'react-bootstrap';

const Letter = ({ letter, dispatch }) => {
    return (
        <h3>
            <Button
                variant="warning"
                className="ms-2 me-2"
                onClick={() => dispatch({ type: 'letterSearch', payload: letter })}
            >
                {letter}
            </Button>
        </h3>
    )
}

const Letters = ({ dispatch }) => {

    const alphabet = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
    return (
        <div className="d-flex justify-content-center mt-5 flex-wrap">
            {alphabet.map((letter, index) => (
                <Letter letter={letter} dispatch={dispatch} key={index} />
            ))}
        </div>
    )
}

export default Letters
