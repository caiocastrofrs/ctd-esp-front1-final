import * as tipos from '../../types/personagensType';
import { Personagem } from '../../types/personagensType';

const initialState = {
  isFetching: false,
  personagens: [],
  personagem: {},
  favPersonagens: [],
  episodios: [],
  favIdPersonagens: <any[]>[],
  errorMessage: undefined,
  paginacao: {},
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
        paginacao: action.payload.info,
        personagens:
        //Map feito com o intuito de persistir o estado de favorito quando é feito um filtro ou refetch.
        action.payload.results.map( ( personagem: Personagem ) => {
          if ( state.favIdPersonagens.find( ( el: number ) => el === personagem.id ) ) {
              return {
                ...personagem,
                favorito: true,
              }
            }
            return personagem;
        })

      }
    case tipos.FETCH_PERSONAGEM:
      return {
        ...state,
        isFetching: false,
       personagem: action.payload, 
      }
    case tipos.FETCH_EPISODIOS:
      return {
        ...state,
          episodios: action.payload,
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
        favPersonagens: action.payload,
      }
    case tipos.UPDATE_PERSONAGEM_FAVORITO_STATUS:
      return {
        ...state,
        //Aqui é feito um find para checar se o personagem já está favoritado 
        //e caso esteja ele será removido do array de favoritados usando um filter,
        //caso não esteja, ele será adicionado ao array.
        favIdPersonagens: 
        state.favIdPersonagens.find( id => id === action.payload ) ?
        state.favIdPersonagens.filter( id => id !== action.payload ) :
        [ ...state.favIdPersonagens , action.payload ],
        //Aqui a lógica é a mesma que a de cima com a diferença de que apenas remove do array
        favPersonagens: 
        state.favPersonagens.find( ( personagem: Personagem ) => personagem.id === action.payload) ?
        state.favPersonagens.filter( ( personagem: Personagem ) => personagem.id !== action.payload) :
        [ ...state.favPersonagens ],
        //Alteração do estado de favorito.
        personagens: 
        state.personagens.map( ( personagem: Personagem ) => {
          if ( personagem.id !== action.payload ) {
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
        favPersonagens: [],
        favIdPersonagens: [],
        personagens: state.personagens.map( ( personagem: Personagem ) =>  ( { ...personagem , favorito: false } ))
      }
    default: 
      return state;
  }  
}
