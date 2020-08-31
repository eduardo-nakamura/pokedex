import React, {useState, useEffect} from 'react';
import { GrFormPrevious,GrFormNext } from 'react-icons/gr'
import { Link } from 'react-router-dom'

          

function PokemonInfo({match}) {
  const [pokemon, setPokemon] = useState();
  const [pokemonImg, setPokemonImg] = useState([]);
  useEffect(() => {
    
    fetchPokemon();
   
  },[])  

  const fetchPokemon = async() => {  
    let query = `https://pokeapi.co/api/v2/pokemon/${match.params.id}`
    const data = await fetch(query)
    
    const detail = await data.json()
    
    setPokemon(detail)
    setPokemonImg(detail.sprites)

    // let imgUrl = detail.sprites.map(function(num) {
    //   console.log(num)
    // });
    console.log(detail.sprites.front_default);

  }
  return (
    <div className="container-page">
     <div className="pokemon-header" st>
      <img src={pokemon ? pokemon.sprites.front_default : ''} alt=""/>
      <h1>{pokemon ? pokemon.name : ''}</h1>
     </div>
     
     {/* {JSON.stringify(pokemon)} */}
      

      {/* {pokemonImg ? pokemonImg.map(image => console.log(image)) : ''} */}
      
    </div>
  );
}

export default PokemonInfo;
