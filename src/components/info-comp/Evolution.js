import React, { useState, useEffect } from 'react';

export default function Evolution(apiEvolution){
  const [teste2, setTeste2] = useState([]);
  useEffect(() => {    
  
    fetchEvolution();  
    
  },[apiEvolution])  

  const teste = async(apiUrl) =>{
    
    let {url} = apiUrl
    
    const dataEvo = await fetch(url);
    const dataEvoChain = await dataEvo.json();
   
    console.log('aaa',dataEvoChain)
  }
  const fetchEvolution = async() => {
    let query = apiEvolution.apiEvolution;
    const data = await fetch(query)    
    const { evolution_chain } = await data.json(); 
    teste(evolution_chain)
  }
  return(
    <h1>{JSON.stringify(apiEvolution.apiEvolution)}</h1>
  )
};
