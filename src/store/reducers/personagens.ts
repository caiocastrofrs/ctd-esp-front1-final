import * as tipos from '../../types/personagensType';
import { Personagem, Info } from '../../types/personagensType';

const initialState = {
  isFetching: false,
  personagens: [],
  personagem: {} as Personagem,
  favPersonagens: [],
  episodios: [],
  favIdPersonagens: [] as any[],
  errorMessage: undefined,
  paginacao: {} as Info,
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
        //Validação necessária para persistir o estado de favorito na página de detalhe quando é feito um refetch
        personagem: state.favIdPersonagens.find(el => el === action.payload.id) ? {...action.payload, favorito: true} : action.payload,
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
        isFetching: false,
        favPersonagens: action.payload,
      }
    case tipos.UPDATE_PERSONAGEM_FAVORITO_STATUS:
      return {
        ...state,
        //Necessário para atualizar o estado de favorito na página de detalhe
        personagem: state.personagem.id === action.payload ? {
          ...state.personagem,
          favorito: !state.personagem.favorito
        } : state.personagem,
        //Aqui é feito um find para checar se o personagem já está favoritado 
        //e caso esteja ele será removido do array de favoritados usando um filter,
        //caso não esteja, ele será adicionado ao array.
        favIdPersonagens:  
        state.favIdPersonagens.find( id => id === action.payload ) ?
        state.favIdPersonagens.filter( id => id !== action.payload ) :
        [ ...state.favIdPersonagens , action.payload ],
        //Aqui a lógica é a mesma que a de cima com a diferença de que apenas remove do array
        favPersonagens: 
        state.favPersonagens.find( ( personagem: Personagem ) => personagem.id === action.payload ) ?
        state.favPersonagens.filter( ( personagem: Personagem ) => personagem.id !== action.payload ) :
        [ ...state.favPersonagens ],
        //Alteração do estado do favorito.
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
