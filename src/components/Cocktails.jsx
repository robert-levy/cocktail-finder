import React, { useState } from 'react'
import { Card, Button } from 'react-bootstrap'
import { Star, StarFill } from 'react-bootstrap-icons'
import CocktailModal from './CocktailModal'
import { getCocktailIngredients, getCocktails, checkIsFavourite } from '../utility-functions'
import { useCocktailDispatch, useCocktailState } from '../state-provider/Provider'

const Cocktail = ({ cocktail }) => {
    const { dispatch } = useCocktailDispatch()
    const state = useCocktailState()
    const [modalShow, setModalShow] = useState(false)
    const [favourite, setFavourite] = useState(false);
    const [ingredients, setIngredients] = useState('');

    const handleFavouriteClick = () => {
        dispatch({ type: 'favouriteToggle', payload: cocktail })
        setFavourite(!favourite)
    }

    React.useEffect(() => {
        const isFavourite = checkIsFavourite(state.cocktails.favourites, cocktail)
        setFavourite(isFavourite)
    }, [state.cocktails.favourites, state.selectedLetter, cocktail])

    React.useEffect(() => {
        const ingredients = getCocktailIngredients(cocktail)
        setIngredients(ingredients)
    }, [state.selectedLetter, cocktail])

    return (
        <>
            <Card className="m-4" style={{ height: 200, flexDirection: 'row', width: '500px' }}>
                <Card.Img variant="top" src={cocktail.strDrinkThumb} style={{ width: 200 }} />
                <Card.Body className="d-flex flex-column justify-content-between">
                    <Card.Title>{cocktail.strDrink}</Card.Title>
                    <Card.Text>
                        {ingredients}
                    </Card.Text>
                    <div className="d-flex justify-content-between">
                        <Button onClick={() => setModalShow(true)} variant="warning">More info</Button>
                        <Button variant="none" onClick={handleFavouriteClick}>
                            {favourite ? <StarFill size={30} color="gold" />
                                :
                                <Star size={30} color="gold" />
                            }
                        </Button>
                    </div>
                </Card.Body>
            </Card>
            {modalShow &&
                <CocktailModal
                    size="lg"
                    show={modalShow}
                    onHide={() => setModalShow(false)}
                    cocktail={cocktail}
                    ingredients={ingredients}
                />
            }
        </>
    )
}

const Cocktails = () => {

    const state = useCocktailState()
    const cocktails = getCocktails(state.cocktails.searched, state.selectedLetter).map((cocktail, index) => <Cocktail cocktail={cocktail} key={index} />)

    return (
        <div className="d-flex flex-wrap justify-content-around bg-light ">
            {!state.selectedLetter && <div><h5>Select a letter to search for cocktails</h5></div>}
            {state.selectedLetter && cocktails.length === 0 && <div><h5>Could not find any cocktails starting with {state.selectedLetter}</h5></div>}
            {
                cocktails.map(cocktail => cocktail)
            }

        </div>
    )
}
export default Cocktails
