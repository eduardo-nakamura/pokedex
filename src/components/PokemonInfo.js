import React, {useState, useEffect} from 'react';
import { GrFormPrevious,GrFormNext } from 'react-icons/gr'
import { Link } from 'react-router-dom'

          

function PokemonInfo({match}) {
  const [pokemon, setPokemon] = useState();
  const [pokemonImg, setPokemonImg] = useState([]);
  const [types, setTypes] = useState([]);
  const [stats, setStats] = useState([]);
  // useEffect(() => {    
  //   fetchPokemon();   
  // })  

  useEffect(() => {    
    
    fetchPokemon();   
  },[match])  

  const fetchPokemon = async() => {  
    let query = `https://pokeapi.co/api/v2/pokemon/${match.params.id}`
    const data = await fetch(query)    
    const detail = await data.json()    
    setPokemon(detail)       
    let types = detail.types.map(function(type) {       
        return type.type.name;
    });  
    setTypes(types);
    setStats(detail.stats)
    let images = []
    
    if(detail.sprites.other["official-artwork"].front_default){
      Object.defineProperty(images, "imgheader", {value: detail.sprites.other["official-artwork"].front_default})      
      console.log(images,'images')
    }   
    // console.log(Object.values(detail.sprites),'values')
    for (var [keyname, value] of Object.entries(detail.sprites)) {     
      switch(typeof value) {
        case 'string':
          // let newProp = {[keyname]: value}
          // images.push(newProp)      
          
          Object.defineProperty(images, keyname, {value:value})

          break;
        case 'object':           
           if(value != null){
            images.push(value)
           }
          break;
        default:
          // code block
      }      
    }
    setPokemonImg(images)   
    console.log(images) 
  }

  
  return (
    <div className="container-page">
  
      <div className="navPokemon">
        <div className="btnNavPokemon">
          <Link to={`/pokedex/pokemon-detail/${ match.params.id > 1 ? parseInt(match.params.id) - 1 : 1}`}>
            <GrFormPrevious size={35} />
          </Link>
        </div>
        <div className="btnNavPokemon">
          <Link to={`/pokedex/pokemon-detail/${ match.params.id < 893 ? parseInt(match.params.id) + 1 : 893}`}>
            <GrFormNext size={35} />
          </Link>
        </div>
      </div>
      <h1>
              {pokemon ? pokemon.name : ""} - Nº{pokemon ? pokemon.id : ""}
      </h1>
      {pokemon ? (
        
        <div className="pokemon-header">
          <img
            src={pokemonImg["imgheader"] ? pokemonImg["imgheader"] : pokemonImg["front_default"]}
            alt={pokemon.name}
          />
          <div className="stats">
            
            <div className="stats-info">
              <label htmlFor="">Height:</label>
              <p>{pokemon.height}m</p>
              <label htmlFor="">Weight:</label>
              <p>{pokemon.weight}kg</p>
              <label htmlFor="">Category:</label>
              {/* <p>{pokemon.types[0].type.name}</p> */}
              <p>
                {pokemon.types.map(type => (
                  <span key={type.type.name} className={type.type.name}>
                    {type.type.name.charAt(0).toUpperCase() + type.type.name.slice(1)}
                    {/* name.charAt(0).toUpperCase() + name.slice(1) */}
                  </span>
                ))}
              </p>
            </div>
            <div>
              <ul className="stats-box">
                {stats.map(stat =>(                  
                  <li key={stat.stat.name}>
                    <strong>{stat.stat.name.replace("-", " ")}</strong>
                    <span>{stat.base_stat}</span>
                    
                  </li>
                ))}              
              </ul>            
            </div>
          </div>
        </div>
      ) : (
        ""
      )}

      
    </div>
  );
}

export default PokemonInfo;
