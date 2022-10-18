import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import pokemonApi from '../comon/pokemonApi';
import { addOnePokemon, addPokemons, getAllPokemons } from '../features/pokemons/pokemonSlice';

import './PokemonsTable.scss';
import { Modal } from "./component/Modal";

export const PokemonsTable = () => {
  const [isError, setIsError] = useState(false);
  const [name, setName] = useState('')
  const [isOpen, setIsOpne] = useState(false);
  const [data, setData] = useState([]);
  const [offset, setOffest] = useState(10);
  const dispatch = useDispatch();
  const pokemons = useSelector(getAllPokemons)

  const fetchPokemons= async () => {
    setIsError(false)
    const data = await pokemonApi.get(`pokemon${name ? `/${name}`: ''}?limit=8&offset=${offset}`)
    setData(data.data)
    dispatch(addPokemons(data.data.results))
  }

  useEffect(() => {
    fetchPokemons()
  }, [offset, setOffest])

  const fetchSelectedPokemon = async(name) => {
      setIsError(false)
      const pokemonData = await pokemonApi.get(`pokemon/${name}`)
      dispatch(addOnePokemon({...pokemonData.data}))
  }

  const handlePrevPageChange = () => {
    const newOffset = data?.previous.split('?')[1].split('&')[0].split('=')[1]
    setOffest(newOffset)
  }
  const handleNextPageChange = () => {
    const newOffset = data?.next.split('?')[1].split('&')[0].split('=')[1]
    setOffest(newOffset)
  }

  const handleModalOpen = (name) => {
    fetchSelectedPokemon(name)
    setIsOpne(true)
  }

  const handleModalClose = () => {
    dispatch(addOnePokemon({}));
    setIsOpne(false);
  }

  const nameHandler = (e) => {
    setName(e.target.value)
  }

  if(!pokemons) {
    return null
  }

  return (
    <div className="wrapper">
      <div className="serach-wrapper">
        <input 
          className="input" 
          type="text" 
          placeholder="Enter pokemon name"
          onChange={nameHandler}
          value={name}
        />
        <div 
          className="serach-btn"
          onClick={() => handleModalOpen(name)}
        >
          Search
        </div>
        {isError && <p>Pokemon not found</p>}
      </div>
      <div className="container">
        {pokemons.map(pokemon => 
        <div 
          key={pokemon?.url} 
          className="card"
          onClick={() =>handleModalOpen(pokemon.name)}
        >
          {pokemon?.name}
        </div>)}
      </div>
      <div className="pagination">
        <div className="btn" onClick={handlePrevPageChange}>Previus</div>
        <div className="btn" onClick={handleNextPageChange}>Next</div>
      </div>
      <Modal isShowing={isOpen} hide={handleModalClose}/>
    </div>
    
  )
}