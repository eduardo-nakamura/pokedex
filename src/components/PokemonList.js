import React, {useState, useEffect} from 'react';
import { GrFormPrevious,GrFormNext } from 'react-icons/gr'

function PokemonList() {
  const [pokemans, setPokemans] = useState([])
  const [next, setNext] = useState()
  const [prev, setPrev] = useState()
  const [count, setCount] = useState()
  const [limit, setLimit] = useState(50)
  const [current, setCurrent] = useState(1)
  useEffect(() => {
    fetchPokemon(0,50);
  },[])  

  const fetchPokemon = async(offset,limit) => {
    //https://pokeapi.co/api/v2/pokemon?limit=50&offset=0
    const data = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`)
    const pokemon = await data.json();    
    setPokemans(pokemon.results)
    setNext(pokemon.next)
    setPrev(pokemon.previous)
    setCount(pokemon.count / limit)     
  }
  const nextPokemons = () =>{
    if(current < count){
      setCurrent(current + 1)
    }
  }
  const prevPokemons = () =>{
    if(current > 1){
      setCurrent(current - 1)
    }
  }
  return (
    <div>
      <a href="https://youtu.be/Law7wfdg_ls?list=PLDyQo7g0_nsVHmyZZpVJyFn5ojlboVEhE&t=1328">Router Turtoial</a>
     <h1>PokemonList</h1>
      {pokemans.map((pokeman,index) => (
        <h3>{index + 1} - {pokeman.name}</h3>
      ))}
      <p>{prev ? prev : '-'}</p>
      <p>{next ? next : '-'}</p>
      <div className="next-prev">
        <GrFormPrevious onClick={prevPokemons}/>
        <p>{current}/{count}</p>
        <GrFormNext onClick={nextPokemons}/>
      </div>
      
    </div>
  );
}

export default PokemonList;
