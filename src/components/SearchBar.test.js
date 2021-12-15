import React from 'react'
import Enzyme, {shallow} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import SearchBar from './SearchBar'

Enzyme.configure({adapter: new Adapter()})
jest.mock('../state-provider/Provider', (() => ({
    __Provider: true, // this property makes it work
    useCocktailState:jest.fn(),
    useCocktailDispatch: jest.fn()
})))

describe('SearchBar.jsx', () => {
    it('should show search bar', () => {
        // shallow renders react component to memory instead of DOM
        // it wraps component in wrapper to give us functions to examine component
        const wrapper = shallow(<SearchBar />)
        const searchBar = wrapper.find('InputGroup FormControl') // searchBar also a wrapper
        expect(searchBar.exists()).toBe(true)
    })
})