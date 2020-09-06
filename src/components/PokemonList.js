import React, {useState, useEffect} from 'react';
import { GrFormPrevious,GrFormNext } from 'react-icons/gr'
import { Link } from 'react-router-dom'

function PokemonList() {
  const [searchTerm, setSearchTerm] = useState("");
  const [pokemans, setPokemans] = useState([])
  const [filteredPokemans, setFilteredPokemans] = useState([])
  const [max, setMax] = useState(19)
  const [min, setMin] = useState(0)
  const [count, setCount] = useState()
  const [limit, setLimit] = useState(1050)
  const [offset, setOffset] = useState(0)
  const [indexPokemon, setIndexPokemon] = useState([])

  useEffect(() => {
    let query = `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=0`
    fetchPokemon(query);
  },[])  
  useEffect(() => {    
    const results = pokemans.filter(man =>
      man.name.toLowerCase().includes(searchTerm.toLowerCase().replace(" ", "-"))
    );
    setFilteredPokemans(results);
  },[searchTerm])  

  const handleChange = e => {    
    setSearchTerm(e.target.value);
  };
  const fetchPokemon = async(query) => {  
    const data = await fetch(query)
    const pokemon = await data.json(); 
    setPokemans(pokemon.results)
    setFilteredPokemans(pokemon.results)   
    setCount(pokemon.count)  
  }

  const nextPokemons = () =>{    
    setMax(max+20)
    setMin(min+20)
    setOffset(offset+1)
  }

  const prevPokemons = () =>{  
    setMax(max-20)
    setMin(min-20)
    setOffset(offset-1)
  }
  return (
    <div className="container-page">     
     <h1>Pokemon  List</h1>
     <form className="search-container">
      
      <input
          type="text"
          placeholder="Procure pelo Nome"
          value={searchTerm}
          onChange={handleChange}
      />
      
     </form>
     
      {searchTerm.length > 0 ? 
        <ul className="pokemon-list">
        {filteredPokemans.map(pokeman => (         
          <li key={pokeman.name}>
            <Link to={`/pokedex/pokemon-detail/${pokeman.url.replace("https://pokeapi.co/api/v2/pokemon/", "").replace("/", "")}`}>
            <h3>#{pokeman.url.replace("https://pokeapi.co/api/v2/pokemon/", "").replace("/", "")}</h3>
              <p>{pokeman.name.replace(/-/g, " ")} </p>             
            </Link>             
          </li>
         
        ))}     
      </ul>
      : 
      <div>
        <ul className="pokemon-list">
        {filteredPokemans.map((pokeman, index) => (
          index >= min && index <= max ?
          <li key={pokeman.name}>
            <Link to={`/pokedex/pokemon-detail/${pokeman.url.replace("https://pokeapi.co/api/v2/pokemon/", "").replace("/", "")}`}>
            <h3>#{pokeman.url.replace("https://pokeapi.co/api/v2/pokemon/", "").replace("/", "")}</h3>
              <p>{pokeman.name.replace(/-/g, " ")} </p>             
            </Link>             
          </li>
          : ''
        ))}
      </ul>
      <div className="next-prev">  
        <button disabled={min <= 0} onClick={prevPokemons}  style={{ color: '#ffffff' }}>
          <GrFormPrevious/>
        </button>        
        <p>{offset + 1} / {parseInt(count / 20)+1}</p>       
        <button disabled={max >= count} onClick={nextPokemons} style={{ color: '#ffffff' }}> 
          <GrFormNext/>
        </button>        
      </div>
      </div>
      }
      
    
     
      


      
    
      
    </div>
  );
}

export default PokemonList;
