import React, { useState } from 'react'
import { InputGroup, FormControl, Button } from 'react-bootstrap'
import CocktailModal from '../CocktailModal/CocktailModal'
import { getCocktailIngredients } from '../../utility-functions'

const SearchBar = ({ state, dispatch }) => {
    const [modalShow, setModalShow] = useState(false)
    const [favourite, setFavourite] = useState(state.cocktails.randomCocktail.favourite)

    const handleRandomSearchClick = () => {
        dispatch({ type: 'randomSearch' })
        // need to set timer for state to update and to stop flickering data
        setTimeout(() => {
            setModalShow(true)
        }, 1000);
    }

    return (
        <>
            <InputGroup className="mb-3 mt-4 w-50">
                <InputGroup.Text id="inputGroup-sizing-default" className="p-0">
                    <Button
                        variant="none"
                        onClick={handleRandomSearchClick}
                    >🎲
                    </Button>
                </InputGroup.Text>
                <FormControl
                    aria-label="Default"
                    aria-describedby="inputGroup-sizing-default"
                />
            </InputGroup>
            {modalShow &&
                <CocktailModal
                    size="lg"
                    show={modalShow}
                    onHide={() => setModalShow(false)}
                    cocktail={state.cocktails.randomCocktail}
                    ingredients={getCocktailIngredients(state.cocktails.randomCocktail)}
                    dispatch={dispatch}
                    favourite={favourite}
                    setFavourite={setFavourite}
                />
            }
        </>
    )
}

export default SearchBar
