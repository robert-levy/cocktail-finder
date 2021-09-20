import React, { useState } from 'react'
import { Card, Button } from 'react-bootstrap'
import { Star, StarFill } from 'react-bootstrap-icons'
import CocktailModal from '../CocktailModal/CocktailModal'
import { getCocktailIngredients, getCocktails } from '../../utility-functions'

const cocktails = {
    drinks: [
        {
            "strDrink": "B-53",
            "strCategory": "Shot",
            "strAlcoholic": "Alcoholic",
            "strInstructions": "Layer the Kahlua, Sambucca and Grand Marnier into a shot glas in that order. Better than B-52",
            "strImageSource": "https://www.thecocktaildb.com/images/media/drink/il9e0r1582478841.jpg"
        },
        {
            "strDrink": "B-53",
            "strCategory": "Shot",
            "strAlcoholic": "Alcoholic",
            "strInstructions": "Layer the Kahlua, Sambucca and Grand Marnier into a shot glas in that order. Better than B-52",
            "strImageSource": "https://www.thecocktaildb.com/images/media/drink/il9e0r1582478841.jpg"
        }, {
            "strDrink": "B-53",
            "strCategory": "Shot",
            "strAlcoholic": "Alcoholic",
            "strInstructions": "Layer the Kahlua, Sambucca and Grand Marnier into a shot glas in that order. Better than B-52",
            "strImageSource": "https://www.thecocktaildb.com/images/media/drink/il9e0r1582478841.jpg"
        }
    ]
}

const Cocktail = ({ cocktail, ingredients, dispatch }) => {
    const [modalShow, setModalShow] = useState(false)
    const [favourite, setFavourite] = useState(cocktail.favourite)

    const handleFavouriteClick = () => {
        dispatch({ type: 'favouriteToggle', payload: cocktail })
        setFavourite(!favourite)
    }

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
                    dispatch={dispatch}
                    favourite={favourite}
                    setFavourite={setFavourite}
                />
            }
        </>
    )
}

const Cocktails = ({ state, dispatch }) => {

    const mapCocktails = () => getCocktails(state).map((cocktail, index) => {
        const ingredients = getCocktailIngredients(cocktail)
        return <Cocktail
            cocktail={cocktail}
            ingredients={ingredients}
            dispatch={dispatch}
            key={index}
        />
    })


    return (
        <div className="d-flex flex-wrap justify-content-around bg-light ">
            {state.selectedLetter && mapCocktails()}
        </div>
    )
}

export default Cocktails
