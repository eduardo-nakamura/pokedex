import React, {useState } from 'react';
import Logo from '../assets/logo-pokemon-79x45.png';
import { Link } from 'react-router-dom'
import {AiOutlineMenu,AiOutlineClose} from 'react-icons/ai'

function Nav() {
  const [toggleMenu, setToggleMenu] = useState(false)
  return (
    <nav>
        <div className="menu-btn" onClick={() => setToggleMenu(!toggleMenu)}>
          {!toggleMenu ? <AiOutlineMenu size={35}/> : <AiOutlineClose size={35}/>}
          {/* <AiOutlineMenu size={35}/>
          <AiOutlineClose size={35}/> */}
        </div>
        
        <h3>
          <img src={Logo} alt="Pokemon" />
          {/* Pokedex */}
        </h3>
        {toggleMenu ? <ul className="nav-links">
          <Link to="/pokedex/about" onClick={() => setToggleMenu(!toggleMenu)}>
          <li>About</li>
          </Link>
          <Link to="/pokedex/pokemon-list" onClick={() => setToggleMenu(!toggleMenu)}>
          <li>PokemonList</li>
          </Link>
                   
        </ul> : ''}
       
    </nav>
  );
}

export default Nav;
