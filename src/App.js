import { useReducer } from 'react';
import NavigationBar from './components/NavigationBar';
import Letters from './components/Letters';
import SearchBar from './components/SearchBar';
import Cocktails from './components/Cocktails';
import { asyncReducer, reducer, initialState } from './state-provider/reducer'
import Provider from './state-provider/Provider';
import { Container, Row } from 'react-bootstrap';
import './App.css'

const App = () => {

  // const [state, dispatch] = useReducer(reducer, initialState)

  return (
    <div className="App">
      <Provider>
        <NavigationBar />
        <Container>
          <Row>
            <Letters state={state} dispatch={asyncReducer(dispatch)} />
          </Row>
          <Row className="justify-content-center">
            <SearchBar state={state} dispatch={asyncReducer(dispatch)} />
          </Row>
          <Row>
            <Cocktails state={state} dispatch={dispatch} />
          </Row>
        </Container>
      </Provider>
    </div >
  );
}

export default App;
