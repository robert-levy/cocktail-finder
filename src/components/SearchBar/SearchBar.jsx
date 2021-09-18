import React from 'react'
import { InputGroup, FormControl, Button } from 'react-bootstrap'

const SearchBar = ({dispatch}) => {
    return (
        <InputGroup className="mb-3 mt-4 w-50">
            <InputGroup.Text id="inputGroup-sizing-default" className="p-0">
                <Button variant="none">🎲</Button>
            </InputGroup.Text>
            <FormControl
                aria-label="Default"
                aria-describedby="inputGroup-sizing-default"
            />
        </InputGroup>
    )
}

export default SearchBar
