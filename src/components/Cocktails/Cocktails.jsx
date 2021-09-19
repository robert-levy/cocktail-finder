import React, { useState } from 'react'
import { Card, Button } from 'react-bootstrap'
import { Star, StarFill } from 'react-bootstrap-icons'
import CocktailModal from '../CocktailModal/CocktailModal'

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

const Cocktail = ({ cocktail }) => {
    console.log(cocktail)
    const [modalShow, setModalShow] = useState(false)
    const [favourited, setFavourited] = useState(false)

    return (
        <>
            <Card className="m-4" style={{ height: 200, flexDirection: 'row', maxWidth: '500px' }}>
                <Card.Img variant="top" src={cocktail?.strDrinkThumb} style={{ width: 200 }} />
                <Card.Body>
                    <Card.Title>{cocktail.strDrink}</Card.Title>
                    <Card.Text>
                        {cocktail.strInstructions}
                    </Card.Text>
                    <div className="d-flex justify-content-between">
                        <Button onClick={() => setModalShow(true)} variant="warning">More info</Button>
                        <Button variant="none" onClick={() => setFavourited(!favourited)}>
                            {favourited ? <StarFill size={30} color="gold" />
                                :
                                <Star size={30} color="gold" />
                            }
                        </Button>
                    </div>
                </Card.Body>
            </Card>
            <CocktailModal size="lg" show={modalShow} onHide={() => setModalShow(false)} />
        </>
    )
}

const Cocktails = ({ state }) => {

    const mapCocktails = () => {

        const cocktails = Object.values(state.cocktails.searched[state.selectedLetter])

        if(cocktails == undefined) console.log('no letter selected')

        return cocktails.map((cocktail,index) =>(
            <Cocktail cocktail={cocktail} key={index} />
        ))
    }

    return (
        <div className="d-flex flex-wrap justify-content-between bg-light ">
            {/* {cocktails.drinks.map((cocktail, index) => (
                <Cocktail cocktail={cocktail} key={index} />
            ))} */}

            {
                state.selectedLetter &&
                mapCocktails()


            }
        </div>
    )
}

export default Cocktails
