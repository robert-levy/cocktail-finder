import { useReducer, useMemo } from 'react';
import NavigationBar from './components/NavigationBar/NavigationBar';
import Letters from './components/Letters/Letters';
import SearchBar from './components/SearchBar/SearchBar';
import Cocktails from './components/Cocktails/Cocktails';
import { asyncReducer, reducer, initialState } from './state/reducer'
import { Container, Row } from 'react-bootstrap';

const App = () => {

  const [state, dispatch] = useReducer(reducer, initialState)

  return (
    <div className="App">
      <NavigationBar />
      <Container>
        <Row>
          <Letters dispatch={asyncReducer(dispatch)} />
        </Row>
        <Row className="justify-content-center">
          <SearchBar dispatch={asyncReducer(dispatch)}/>
        </Row>
        <Row>
          <Cocktails state={state}/>
        </Row>
      </Container>
    </div >
  );
}

export default App;
