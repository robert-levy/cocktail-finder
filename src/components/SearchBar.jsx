import React, { useState } from 'react'
import { InputGroup, FormControl, Button } from 'react-bootstrap'
import CocktailModal from './CocktailModal'
import { getCocktailIngredients } from '../utility-functions'
import { useCocktailDispatch, useCocktailState } from '../state-provider/Provider'

const SearchBar = () => {
    const state = useCocktailState()
    const { asyncReducer, dispatch } = useCocktailDispatch()
    const [modalShow, setModalShow] = useState(false)
    const [searchTerm, setSearchTerm] = useState(state.searchTerm)

    const handleRandomSearchClick = () => {
        asyncReducer({ type: 'randomSearch' })

        // need to set timer for state to update and to stop flickering data
        setTimeout(() => {  // need to load until new random cocktail is properly in state, the favourite is displaying incorrect when it I see the cocktail switch
            setModalShow(true)
        }, 1500)
    }

    const handleSearchTermChange = (e) => {
        console.log(e.target.value)
        dispatch({ type: 'newSearchTerm', payload: e.target.value }) //this doesn't set search term to "", it keeps the fist letter
        setSearchTerm(e.target.value) 

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
                    placeholder="🍹...🍸...🥴"
                    value={searchTerm}
                    onChange={(e) => handleSearchTermChange(e)}

                />
            </InputGroup>
            {modalShow &&
                <CocktailModal
                    size="lg"
                    show={modalShow}
                    onHide={() => setModalShow(false)}
                    cocktail={state.cocktails.randomCocktail}
                    ingredients={getCocktailIngredients(state.cocktails.randomCocktail)}
                />
            }
        </>
    )
}

export default SearchBar
