import React, {useState, useEffect} from 'react';
import { GrFormPrevious,GrFormNext } from 'react-icons/gr'

function PokemonList() {
  const [searchTerm, setSearchTerm] = React.useState("");
  const [pokemans, setPokemans] = useState([])
  const [filteredPokemans, setFilteredPokemans] = useState([])
  const [next, setNext] = useState()
  const [prev, setPrev] = useState()
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
    setNext(pokemon.next)
    setPrev(pokemon.previous)
    setCount(pokemon.count / limit)     
  }

  const nextPokemons = () =>{    
    if(next !== null){
      setOffset(offset + 1)
      fetchPokemon(next)
    } 
  }

  const prevPokemons = () =>{  
    if(prev !== null){
      setOffset(offset - 1)
      fetchPokemon(prev)
    } 
  }
  return (
    <div>
      <a href="https://youtu.be/Law7wfdg_ls?list=PLDyQo7g0_nsVHmyZZpVJyFn5ojlboVEhE&t=1328">Router Turtoial</a>
     <h1>Pokemon  List</h1>
     <label htmlFor="">Search by name: </label>
     <input
        type="text"
        placeholder="Search"
        value={searchTerm}
        onChange={handleChange}
      />
      
      <ul className="pokemon-list">
        {filteredPokemans.map(pokeman => (
          <li key={pokeman.name}>
              <h3>#{pokeman.url.replace("https://pokeapi.co/api/v2/pokemon/", "").replace("/", "")}</h3>
              {pokeman.name} 
          </li>
        ))}     
      </ul>
    
     
      <div className="next-prev">
        <button disabled={prev === null} onClick={prevPokemons}  style={{ color: '#ffffff' }}>
          <GrFormPrevious/>
        </button>        
        <p>{offset + 1} / {count}</p>       
        <button disabled={next === null} onClick={nextPokemons} style={{ color: '#ffffff' }}> 
          <GrFormNext/>
        </button>        
      </div>
        {indexPokemon}
    </div>
  );
}

export default PokemonList;
