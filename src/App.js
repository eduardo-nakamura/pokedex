import React from 'react';
import './App.css';

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
          <Route path="/" exact component={Home} />
          
          <Route path="/pokemon-detail" component={PokemonList} />
          <Route path="/about" component={About} />
          <Route path="/pokemon-info" component={PokemonInfo} />
        </Switch>
        
      </div>
    </Router>
  );
}

const Home = () => <div><h1>Home</h1></div>
  
export default App;
