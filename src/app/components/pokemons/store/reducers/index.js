import { combineReducers } from 'redux';
import pokemons from './pokemons.reducer';

const reducer = combineReducers({
  pokemons,
});

export default reducer;
