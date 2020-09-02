import React from 'react';
import './style.css';

import Nav from './components/Nav'
import About from './components/About'
import PokemonInfo from './components/PokemonInfo'
import PokemonList from './components/PokemonList'

import { BrowserRouter as Router, Switch, Route} from 'react-router-dom'
function App() {
  return (
    <Router>    
      <div className="App">      
        <Nav />
        <Switch>
          <Route path="/pokedex/" exact component={PokemonList} />          
          <Route path="/pokedex/pokemon-list" component={PokemonList} />
          <Route path="/pokedex/about" component={About} />
          <Route path="/pokedex/pokemon-detail/:id"  component={PokemonInfo} />
        </Switch>
        
      </div>
    </Router>
  );
}

const Home = () => <div><h1>Home</h1></div>
  
export default App;
