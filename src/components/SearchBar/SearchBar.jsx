import React, { useState } from 'react'
import { InputGroup, FormControl, Button } from 'react-bootstrap'
import CocktailModal from '../CocktailModal/CocktailModal'
import { getCocktailIngredients } from '../../utility-functions'

const SearchBar = ({ state, dispatch }) => {
    const [modalShow, setModalShow] = useState(false)
    const [favourited, setFavourited] = useState(false)

    const handleRandomSearchClick = () => {
        dispatch({ type: 'randomSearch' })
        setTimeout(() => {
            setModalShow(true)
        }, 100);
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
            { modalShow && 
                <CocktailModal
                    size="lg"
                    show={modalShow}
                    onHide={() => setModalShow(false)}
                    name={state.cocktails.randomCocktail.strDrink}
                    ingredients={getCocktailIngredients(state.cocktails.randomCocktail)}
                    thumbnail={state.cocktails.randomCocktail.strDrinkThumb}
                    instructions={state.cocktails.randomCocktail.strInstructions}
                />
            }
        </>
    )
}

export default SearchBar
