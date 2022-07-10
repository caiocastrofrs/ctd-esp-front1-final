import * as tipos from '../../types/personagensType';
import { addCampoFavoritoEmObj } from '../../utils/utils';
export const fetchPersonagensStarted = () => ({type: tipos.FETCH_PERSONAGENS_STARTED});

export const fetchPersonagensSuccess = (apiData: tipos.ApiData) => (
  {
    type: tipos.FETCH_PERSONAGENS_SUCCESS,
    payload: apiData
  }
)

export const fetchPersonagensError = (errorMessage: string) => (
  {
    type: tipos.FETCH_PERSONAGENS_ERROR,
    payload: errorMessage
  }
)

export const updateFavPersonagem = (id: number) => (
  {
    type: tipos.UPDATE_PERSONAGEM_FAVORITO_STATUS,
    payload: id
  }
)

export const removerTodosFavs = () => (
  {
    type: tipos.REMOVER_TODOS_FAVS
  }
)

export const fetchFavPersonagens = (personagens: tipos.Personagem[]) => (
  {
    type: tipos.FETCH_PERSONAGENS_FAVORITO,
    payload: personagens,
  }
)

export const fetchPersonagem = (personagem: tipos.Personagem) => (
  {
    type: tipos.FETCH_PERSONAGEM,
    payload: personagem,
  }
)

export const fetchEpisodios = (episodios: tipos.Episodio) => (
  {
    type: tipos.FETCH_EPISODIOS,
    payload: episodios,
  } 
)

export const fetchPersonagensThunk = () => async (dispatch: any) => {

  dispatch(fetchPersonagensStarted());

  try {
    const response = await fetch('https://rickandmortyapi.com/api/character');
    const data = await response.json();
    
    const mutatedData = data.results.map((personagem: tipos.Personagem) => addCampoFavoritoEmObj(personagem));

    dispatch(fetchPersonagensSuccess({info: data.info, results: mutatedData}));

  } catch(error: any) {
    dispatch(fetchPersonagensError(error.message));
  }
}

export const filterPersonagensThunk = (filtro: string) => async (dispatch: any) => {

  dispatch(fetchPersonagensStarted());
  
  try {
    const response = await fetch(`https://rickandmortyapi.com/api/character/?name=${filtro}`);
    const data = await response.json();
    
    const mutatedData = data.results.map((personagem: tipos.Personagem) => addCampoFavoritoEmObj(personagem));
    
    dispatch(fetchPersonagensSuccess({info: data.info, results: mutatedData}));

  } catch(error: any){
    dispatch(fetchPersonagensError(error.message));
  }
}

export const fetchFavPersonagensThunk = (idPersonagens: number[]) => async (dispatch: any) => {

  dispatch(fetchPersonagensStarted());
  
  try {
    let auxArray = [];

    const response = await fetch(`https://rickandmortyapi.com/api/character/${idPersonagens}`);
    const data = await response.json();

    if(!Array.isArray(data)) {
      auxArray.push(data);  
    } else {
      auxArray.push(...data);
    }

    const mutatedData = auxArray.map((personagem: tipos.Personagem) => addCampoFavoritoEmObj(personagem, true));
    
    dispatch(fetchFavPersonagens(mutatedData));
  
  } catch(error: any) {
    dispatch(fetchPersonagensError(error.message));
  }
}

export const fetchNovaPagina = (url: string) => async (dispatch:any) => {

  dispatch(fetchPersonagensStarted());

  try {
    const response = await fetch(url);
    const data = await response.json();

    const mutatedData = data.results.map((personagem: tipos.Personagem) => addCampoFavoritoEmObj(personagem));

    dispatch(fetchPersonagensSuccess({info: data.info, results: mutatedData}));

  } catch(error: any) {
    dispatch(fetchPersonagensError(error.message));
  }
}

export const fetchPersonagemThunk = (id: string) => async (dispatch: any) => {
  
  dispatch(fetchPersonagensStarted());

  try {
    const response  = await fetch(`https://rickandmortyapi.com/api/character/${id}`)
    const data = await response.json();
    const mutatedData = addCampoFavoritoEmObj(data);
    dispatch(fetchPersonagem(mutatedData));

  } catch(error: any) {
    dispatch(fetchPersonagensError(error.message));
  }
}

export const fetchEpisodiosThunk = (episodios: []) => async(dispatch: any) => {
  
  try {
    const response = await fetch(`https://rickandmortyapi.com/api/episode/${episodios}`);
    const data = await response.json();

    dispatch(fetchEpisodios(data));
  } catch(error: any) {
    dispatch(fetchPersonagensError(error.message));
  }
}
