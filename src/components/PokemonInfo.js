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
     <div className="pokemon-header">
       {pokemonImg ? 
       <div className="pokemon-img">
        <img src={pokemonImg} alt=""/>
       </div>
       : ''}
       
      
  <h1>{pokemon ? pokemon.name : ''} - Nº{pokemon ? pokemon.id : ''}</h1>
      
     </div>
     
     {/* {JSON.stringify(pokemon)} */}
      

      {/* {pokemonImg ? pokemonImg.map(image => console.log(image)) : ''} */}
      
    </div>
  );
}

export default PokemonInfo;
