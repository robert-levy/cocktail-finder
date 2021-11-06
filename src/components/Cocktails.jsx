import React, { useState } from 'react'
import { useMediaQuery } from 'react-responsive';
import { Card, Button } from 'react-bootstrap'
import { Star, StarFill } from 'react-bootstrap-icons'
import CocktailModal from './CocktailModal'
import { getCocktailIngredients, getCocktails, checkIsFavourite, filterCocktails } from '../utility-functions'
import { useCocktailDispatch, useCocktailState } from '../state-provider/Provider'
import './cocktails.css'

const Cocktails = () => {

    const state = useCocktailState()
    const nonFilteredCocktails = getCocktails(state.cocktails.searched, state.selectedLetter)
    let cocktailsFiltered = filterCocktails(nonFilteredCocktails, state.searchTerm).map((cocktail, index) => <Cocktail cocktail={cocktail} key={index} />)
    // cases: filtering with search term / no cocktails exist for letter in first place
    return (
        <div className="d-flex flex-wrap justify-content-around bg-light ">
            {!state.selectedLetter && <div><h5>Select a letter to search for cocktails</h5></div>}

            {state.selectedLetter && cocktailsFiltered.length === 0 && !state.searchTerm
                && <div><h5>Could not find any cocktails starting with {state.selectedLetter}</h5></div>
            }

            {state.selectedLetter && cocktailsFiltered.length === 0 && state.searchTerm
                && <div><h5>Could not find any cocktails with {state.searchTerm}</h5></div>
            }


            {
                cocktailsFiltered.map(cocktail => cocktail)
            }

        </div>
    )
}

const Cocktail = ({ cocktail }) => {
    const { dispatch } = useCocktailDispatch()
    const state = useCocktailState()
    const [modalShow, setModalShow] = useState(false)
    const [favourite, setFavourite] = useState(false)
    const [ingredients, setIngredients] = useState('')
    const isMobile = useMediaQuery({ query: `(max-width: 600px)` });

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
            <Card className={isMobile ? "m-1 d-flex flex-cloumn responsive-card" : "d-flex flex-row m-4"} >
                <Card.Img className="responsive-img img-fluid" variant="top" src={cocktail.strDrinkThumb} />
                <Card.Body className={isMobile
                    ? "d-flex flex-column justify-content-between "
                    : "d-flex flex-column justify-content-between responsive-body"}>
                    <Card.Title id="responsive-title">{cocktail.strDrink}</Card.Title>
                    <Card.Text className="responsive-text">
                        {ingredients}
                    </Card.Text>
                    <div className="d-flex justify-content-between">
                        <Button className="responsive-btn" onClick={() => setModalShow(true)} variant="warning" size={isMobile ? "small" : "large"}>More info</Button>
                        <Button className="responsive-btn" variant="none" onClick={handleFavouriteClick}>
                            {favourite ? <StarFill size={isMobile ? 20 : 30} color="gold" />
                                :
                                <Star size={isMobile ? 20 : 30} color="gold" />
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

export default Cocktails
