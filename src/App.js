import NavigationBar from './components/NavigationBar';
import Letters from './components/Letters';
import SearchBar from './components/SearchBar';
import Cocktails from './components/Cocktails';
import Provider from './state-provider/Provider';
import { Container, Row } from 'react-bootstrap';
import './App.css'

export const App = () => (
  <div className="App">
    <Provider>
      <NavigationBar />
      <Container>
        <Row>
          <Letters />
        </Row>
        <Row className="justify-content-center">
          <SearchBar />
        </Row>
        <Row>
          <Cocktails />
        </Row>
      </Container>
    </Provider>
  </div >
)

export default App;
