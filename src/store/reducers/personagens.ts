import * as tipos from '../../types/personagensType';
import { Personagem } from '../../types/personagensType';

const initialState = {
  isFetching: false,
  personagens: [],
  favIdPersonagens: [],
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
        personagens:  action.payload.map((personagem: Personagem) => {
          if (state.favIdPersonagens.find(el => el === personagem.id)) {
              return {
                ...personagem,
                favorito: true,
              }
            }
            return personagem;
        })

      }
    case tipos.FETCH_PERSONAGENS_ERROR:
      return {
        ...state,
        isFetching: false,
        errorMessage: action.payload,
      }
    case tipos.UPDATE_PERSONAGEM_FAVORITO_STATUS:
      return {
        ...state,
        favIdPersonagens : [...state.favIdPersonagens, action.payload],
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
    case tipos.REMOVER_TODOS_FAVS: 
      return {
        ...state,
        favIdPersonagens: [],
        personagens: state.personagens.map((personagem: Personagem) =>  ({...personagem, favorito: false}))
      }
    default: 
      return state;
  }  
}
