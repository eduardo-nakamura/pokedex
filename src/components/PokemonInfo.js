import React, {useState, useEffect} from 'react';
import { GrFormPrevious,GrFormNext } from 'react-icons/gr'
import { Link } from 'react-router-dom'

          

function PokemonInfo({match}) {
  const [pokemon, setPokemon] = useState();
  const [pokemonImg, setPokemonImg] = useState([]);
  const [types, setTypes] = useState([]);
  useEffect(() => {    
    fetchPokemon();   
  },[])  
  useEffect(() => {    
    fetchPokemon();   
  },[match])  

  const fetchPokemon = async() => {  
    let query = `https://pokeapi.co/api/v2/pokemon/${match.params.id}`
    const data = await fetch(query)    
    const detail = await data.json()    
    setPokemon(detail)
    setPokemonImg(detail.sprites.other["official-artwork"].front_default)    
    let types = detail.types.map(function(type) {       
        return type.type.name;
    });  
    setTypes(types);

  }
  return (
    <div className="container-page">
       <div className="navPokemon">
         <div className="btnNavPokemon">
         <Link to={`/pokedex/pokemon-detail/${parseInt(match.params.id) - 1}`}>
          <GrFormPrevious size={35}/>
         </Link>
           
         </div>
         <div className="btnNavPokemon">
         <Link to={`/pokedex/pokemon-detail/${parseInt(match.params.id) + 1}`}>
          <GrFormNext size={35}/>
         </Link>
            
         </div>
         
       </div>
       {pokemon ? 
       <div className="pokemon-header">
        <img src={pokemon.sprites.other["official-artwork"].front_default} alt={pokemon.name}/>
        <div className="stats">
         <h1>{ pokemon ? pokemon.name : '' } - Nº{ pokemon ? pokemon.id : '' }</h1>
         <label htmlFor="">Height</label>
         <p>{ pokemon ? pokemon.height : '' } m</p>
         <label htmlFor="">Weight</label>
         <p>{ pokemon ? pokemon.weight : '' } kg</p>
         <label htmlFor="">Category</label>
         <p>{ pokemon ? pokemon.types[0].type.name : '' }</p>
       </div>
       </div>
       : '' }     
     </div>
     
    
   
  );
}

export default PokemonInfo;
