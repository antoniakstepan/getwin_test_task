import { configureStore } from '@reduxjs/toolkit';
import pokemonsSlice from './pokemons/pokemonSlice';

export const store = configureStore({
    reducer: {
        pokemons: pokemonsSlice
    }
})