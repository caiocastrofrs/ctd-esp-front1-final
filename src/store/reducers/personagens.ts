import * as tipos from '../../types/personagensType';
import { Personagem } from '../../types/personagensType';

const initialState = {
  isFetching: false,
  personagens: [],
  errorMessage: undefined,
}

export const personagemReducer = (state = initialState, action: tipos.ActionType) => {
  switch(action.type) {
    case tipos.FETCH_PERSONAGENS_STARTED:
      return {
        ...state,
        isFetching: true,
      }
    case tipos.FETCH_PERSONAGENS_SUCCESS:
      return {
        ...state,
        isFetching: false,
        personagens: action.payload,
      }
    case tipos.FETCH_PERSONAGENS_ERROR:
      return {
        ...state,
        isFetching: false,
        errorMessage: action.payload,
      }
    case tipos.FETCH_PERSONAGENS_FAVORITO:
      return {
        ...state,
        isFetching: false,
        personagens: state.personagens.filter((personagem: Personagem) => personagem.favorito ?? personagem)
      }
    case tipos.UPDATE_PERSONAGEM_FAVORITO_STATUS:
      return {
        ...state,
        personagens: state.personagens.map((personagem: Personagem) => {
          if (personagem.id !== action.payload) {
              return personagem;
            }
            return {
              ...personagem,
              favorito: !personagem.favorito,
            };
        })
      }
    default: 
      return state;
  }  
}
