import { combineReducers } from 'redux';
import { personagemReducer } from './personagens';

const reducers = combineReducers({
  personagens: personagemReducer,
})

export default reducers;
