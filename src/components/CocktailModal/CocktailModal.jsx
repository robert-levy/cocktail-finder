import React, { useState } from 'react'
import { Modal, Container, Button, Image, NavDropdown } from 'react-bootstrap'
import { Star, StarFill } from 'react-bootstrap-icons'

const CocktailModal = ({ cocktail, ingredients, onHide, size, show, dispatch, favourite, setFavourite }) => {
    // console.log(cocktail)

    const handleFavouriteClick = () => {
        dispatch({ type: 'favouriteToggle', payload: cocktail })
        setFavourite(!favourite)
    }
    return (
        <Modal onHide={onHide} size={size} show={show} aria-labelledby="contained-modal-title-vcenter">
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    {cocktail.strDrink}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body className="show-grid">
                <Container>
                    <div className="d-flex">
                        <Image src={cocktail.strDrinkThumb} roundedCircle width="250" height="250" />
                        <Container className="d-flex flex-column justify-content-between">
                            <div>
                                <div className="d-flex justify-content-between">
                                    <h5>Instructions</h5>
                                    <Button variant="none" onClick={handleFavouriteClick}>
                                        {favourite ? <StarFill size={30} color="gold" />
                                            :
                                            <Star size={30} color="gold" />
                                        }
                                    </Button>
                                </div>

                                {cocktail.strInstructions}
                            </div>
                            <div>
                                <NavDropdown.Divider />
                                {ingredients}
                            </div>
                        </Container>
                    </div>
                </Container>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="warning" onClick={onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    )
}

export default CocktailModal
