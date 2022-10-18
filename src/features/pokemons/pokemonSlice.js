import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    pokemons: [],
    pokemon: {}
}

const pokemonsSlice = createSlice({
    name: 'pokemons',
    initialState,
    reducers: {
        addPokemons: (state, action) => {
          return {...state,
              pokemons: action.payload
            }
        },
        addOnePokemon: (state, action) => {
          return {...state,
            pokemon: action.payload
          }
        }
    }
})

export const { addPokemons, addOnePokemon } = pokemonsSlice.actions;

export const getAllPokemons = (state) => {
  return state.pokemons.pokemons};
export const getOnePokemon = (state) => {
  return state.pokemons.pokemon
};
export default pokemonsSlice.reducer;