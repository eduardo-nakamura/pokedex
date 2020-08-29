import React, {useState, useEffect} from 'react';


function PokemonList() {
  const [pokemans, setPokemans] = useState([])
  const [next, setNext] = useState()
  const [prev, setPrev] = useState()
  const [count, setCount] = useState()
  const [current, setCurrent] = useState(1)
  useEffect(() => {
    fetchPokemon();
  },[])  

  const fetchPokemon = async() => {
    const data = await fetch('https://pokeapi.co/api/v2/pokemon?limit=60&offset=0')
    const pokemon = await data.json();
    
    setPokemans(pokemon.results)
    setNext(pokemon.next)
    setPrev(pokemon.previous)
    setCount(pokemon.count)
    
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
      
      <p>{current}/{count / 50}</p>
      
    </div>
  );
}

export default PokemonList;
