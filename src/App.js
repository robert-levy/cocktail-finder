import { useReducer } from 'react';
import NavigationBar from './components/NavigationBar/NavigationBar';
import Letters from './components/Letters/Letters';
import SearchBar from './components/SearchBar/SearchBar';
import Cocktails from './components/Cocktails/Cocktails';
import { asyncReducer, reducer, initialState } from './state/reducer'
import { Container, Row } from 'react-bootstrap';
import './App.css'

const App = () => {

  const [state, dispatch] = useReducer(reducer, initialState)

  return (
    <div className="App">
      <NavigationBar />
      <Container>
        <Row>
          <Letters state={state} dispatch={asyncReducer(dispatch)} />
        </Row>
        <Row className="justify-content-center">
          <SearchBar state={state} dispatch={asyncReducer(dispatch)}/>
        </Row>
        <Row>
          <Cocktails state={state} dispatch={dispatch}/>
        </Row>
      </Container>
    </div >
  );
}

export default App;
