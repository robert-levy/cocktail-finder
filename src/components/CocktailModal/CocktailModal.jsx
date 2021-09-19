import React, { useState } from 'react'
import { Modal, Container, Button, Image, NavDropdown } from 'react-bootstrap'
import { Star, StarFill } from 'react-bootstrap-icons'

const CocktailModal = (props) => {
    const [favourited, setFavourited] = useState(false)
    return (
        <Modal {...props} aria-labelledby="contained-modal-title-vcenter">
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    {props.name}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body className="show-grid">
                <Container>
                    <div className="d-flex">
                        <Image src={props.thumbnail} roundedCircle width="250" height="250" />
                        <Container className="d-flex flex-column justify-content-between">
                            <div>
                                <div className="d-flex justify-content-between">
                                    <h5>Instructions</h5>
                                    <Button variant="none" onClick={() => setFavourited(!favourited)}>
                                        {favourited ? <StarFill size={30} color="gold" />
                                            :
                                            <Star size={30} color="gold" />
                                        }
                                    </Button>
                                </div>

                                {props.instructions}
                            </div>
                            <div>
                                <NavDropdown.Divider />
                                {props.ingredients}
                            </div>
                        </Container>
                    </div>
                </Container>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="warning" onClick={props.onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    )
}

export default CocktailModal
