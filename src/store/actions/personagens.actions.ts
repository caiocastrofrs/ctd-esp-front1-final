import * as tipos from '../../types/personagensType';

export const fetchPersonagensStarted = () => ({type: tipos.FETCH_PERSONAGENS_STARTED});

export const fetchPersonagensSuccess = (personagens: tipos.Personagem) => ({type: tipos.FETCH_PERSONAGENS_SUCCESS, payload: personagens});

export const fetchPersonagensError = (errorMessage: string) => ({type: tipos.FETCH_PERSONAGENS_ERROR, payload: errorMessage});

export const updateFavPersonagem = (id: number) => ({type: tipos.UPDATE_PERSONAGEM_FAVORITO_STATUS, payload: id})

export const removerTodosFavs = () => ({type: tipos.REMOVER_TODOS_FAVS});

export const fetchPersonagensThunk = () => async (dispatch: any) => {

  dispatch(fetchPersonagensStarted);

  try {
    const response = await fetch('https://rickandmortyapi.com/api/character');
    const data = await response.json();
    const mutatedData = data.results.map((personagem: tipos.Personagem) => ({...personagem, favorito : false }));
    dispatch(fetchPersonagensSuccess(mutatedData));
  } catch(error: any) {
    dispatch(fetchPersonagensError(error.message));
  }
}

export const filterPersonagensThunk = (filtro: string) => async (dispatch: any) => {

  dispatch(fetchPersonagensStarted);
  
  try {
    const response = await fetch(`https://rickandmortyapi.com/api/character/?name=${filtro}`);
    const data = await response.json();
    const mutatedData = data.results.map((personagem: tipos.Personagem) => ({...personagem, favorito : false }));
    dispatch(fetchPersonagensSuccess(mutatedData));

  } catch(error: any){
    dispatch(fetchPersonagensError(error.message));
  }
}
