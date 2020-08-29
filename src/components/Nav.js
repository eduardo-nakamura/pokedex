import React from 'react';
import Logo from '../assets/logo-pokemon-79x45.png';
import { Link } from 'react-router-dom'

function Nav() {
  return (
    <nav>
        <h3>
          <img src={Logo} alt="Pokemon" />
        </h3>
        <ul className="nav-links">
          <Link to="/about">
          <li>About</li>
          </Link>
          <Link to="/pokemon-detail">
          <li>PokemonList</li>
          </Link>
          <Link to="/pokemon-info">
          <li >PokemonInfo</li>
          </Link>
            
            
        </ul>
    </nav>
  );
}

export default Nav;
