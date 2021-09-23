import React, { useState } from 'react'
import { Navbar, Container, Nav, NavDropdown, Button } from 'react-bootstrap'
import CocktailModal from './CocktailModal'
import { getCocktailIngredients } from '../utility-functions'
import { useCocktailState, useCocktailDispatch } from '../state-provider/Provider'
import { Trash } from 'react-bootstrap-icons'

const NavigationBar = () => {
    const state = useCocktailState()
    const { dispatch } = useCocktailDispatch()
    const [modalShow, setModalShow] = useState(false)
    const [selectedCocktail, setSelectedCocktail] = useState(null)

    const handleOpen = (cocktail) => {
        setSelectedCocktail(cocktail)
        setModalShow(true)
    }

    const handleRemove = (cocktail) => dispatch({ type: 'favouriteToggle', payload: cocktail })

    const DeleteBtn = ({ cocktail }) => {
        const [hover, setHover] = useState(false)
        return (
            <Button
                variant="none"
                onClick={() => handleRemove(cocktail)}
                onMouseEnter={() => setHover(true)}
                onMouseLeave={() => setHover(false)}
            > <Trash
                size="18"
                color={hover ? 'red' : 'black'}
            >
                </Trash>
            </Button>
        )
    }

    return (
        <>
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand href="#home">Cocktail Finder</Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="me-auto">
                            <NavDropdown title="Favourites" id="collasible-nav-dropdown">
                                {(state.cocktails.favourites.length === 0
                                    && <p className="d-flex justify-content-center align-items-center m-0">Favourites are empty</p>)
                                    ||
                                    state.cocktails.favourites.map((cocktail, index) => (
                                        <div key={index} className="d-flex justify-content-center align-items-center">
                                            <NavDropdown.Item
                                                href="#action/3.1"
                                                onClick={() => handleOpen(cocktail)}
                                            >{cocktail.strDrink}
                                            </NavDropdown.Item>
                                            <DeleteBtn cocktail={cocktail} />
                                        </div>
                                    ))
                                }
                            </NavDropdown>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            {modalShow && selectedCocktail !== null &&
                <CocktailModal
                    size="lg"
                    show={modalShow}
                    onHide={() => setModalShow(false)}
                    cocktail={selectedCocktail}
                    ingredients={getCocktailIngredients(selectedCocktail)}
                />}
        </>
    )
}

export default NavigationBar
