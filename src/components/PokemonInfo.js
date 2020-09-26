import React, {useState, useEffect} from 'react';
import { GrFormPrevious,GrFormNext } from 'react-icons/gr'
import { Link } from 'react-router-dom'
import Evolution from './info-comp/Evolution'

          

function PokemonInfo({match}) {
  const [showPokemon, setShowPokemon] = useState(false);
  const [pokemon, setPokemon] = useState();
  const [pokemonImg, setPokemonImg] = useState([]);
  const [types, setTypesPkmn] = useState([]);
  const [stats, setStats] = useState([]);
   useEffect(() => {    
 
   })  

  useEffect(() => {    
  
    fetchPokemon();  
    
  },[match])  

  const fetchPokemon = async() => {  
    let query = `https://pokeapi.co/api/v2/pokemon/${match.params.id}`
    const data = await fetch(query)    
    const detail = await data.json()    
    let { sprites } = detail
    console.log(sprites)
    setPokemon(detail)       
    let types = detail.types.map(function(type) {       
        return type.type.name;
    });  
    setTypesPkmn(types);
    setStats(detail.stats)
    let images = []
    
    if(detail.sprites.other["official-artwork"].front_default){
      Object.defineProperty(images, "imgheader", {value: detail.sprites.other["official-artwork"].front_default})      
    }   
   
    for (var [keyname, value] of Object.entries(detail.sprites)) {     
      switch(typeof value) {
        case 'string':          
          Object.defineProperty(images, keyname, {value:value})
          break;
        case 'object':           
           if(value != null){
            images.push(value)
           }
          break;
        default:          
      }      
    }
    
    setPokemonImg(images)   

    for( let i = 0; i < detail.types.length; i++ ){      
      let query2 = detail.types[i].type.url
      console.log(query2)
      let data2 = await fetch(query2)    
      let detail2 = await data2.json()  
      console.log(detail2.damage_relations)
    }
  }

  function getTypes(typesHere){
    
    return typesHere
  }
  
  return (
    <div className="container-page fadeAnimation">
     
      <div className="navPokemon">
        
          <Link to={`/pokedex/pokemon-detail/${ match.params.id > 1 ? parseInt(match.params.id) - 1 : 1}`}>
            <div className="btnNavPokemon">
              <GrFormPrevious size={15} />
            </div>
          </Link>
        
      
        
          <Link to={`/pokedex/pokemon-detail/${ match.params.id < 893 ? parseInt(match.params.id) + 1 : 893}`}>
            <div className="btnNavPokemon">
            <GrFormNext size={15} />
            </div>
          </Link>
        
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
              <p>{pokemon.height / 10}m</p>
              <label htmlFor="">Weight:</label>
              <p>{pokemon.weight / 10}kg</p>
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
                <h2>Base Stat</h2>
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
      {
        pokemon ?            
          <Evolution apiEvolution={pokemon.species.url} />
        : ''
      }
      
      <div className="gallery">
        <h2>Gallery</h2>
       
      </div>
      
    </div>
  );
}

export default PokemonInfo;
