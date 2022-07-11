import * as tipos from '../../types/personagensType';
import { addCampoFavoritoEmObj } from '../../utils/utils';
export const fetchPersonagensStarted = () => ({type: tipos.FETCH_PERSONAGENS_STARTED});

/**
  *Obter todos os personagens
  *@function fetchPersonagensSuccess
  *@param { tipos.ApiData } apiData   Objeto da Api que consiste em informações para paginação e os dados que queremos 
  *@returns { tipos.ActionType } payload: Array de objetos do tipo Personagem
  */
export const fetchPersonagensSuccess = (apiData: tipos.ApiData): tipos.ActionType => (
  {
    type: tipos.FETCH_PERSONAGENS_SUCCESS,
    payload: apiData
  }
)
/**
  *Retorna uma mensagem de erro
  *@function fetchPersonagensError
  *@param { string }  errorMessage  Mensagem de erro da Action 
  *@returns { tipos.ActionType } payload: string contendo uma mensagem de erro
*/
export const fetchPersonagensError = (errorMessage: string): tipos.ActionType => (
  {
    type: tipos.FETCH_PERSONAGENS_ERROR,
    payload: errorMessage
  }
)
/**
  *Atualiza o estado de 'Favorito' de um personagem
  *@function updateFavPersonagem
  *@param { number } id   Id do personagem que precisamos atualizar o estado da propriedade favorito
  *@returns { tipos.ActionType } payload: Id do personagem  
  */
export const updateFavPersonagem = (id: number): tipos.ActionType => (
  {
    type: tipos.UPDATE_PERSONAGEM_FAVORITO_STATUS,
    payload: id
  }
)
/**
  *Remove todos os personagens favoritados
  *@function removerTodosFavs
  *@returns { tipos.ActionType } payload: não há payload 
  */
export const removerTodosFavs = (): tipos.ActionType => (
  {
    type: tipos.REMOVER_TODOS_FAVS
  }
)
/**
  *Busca por todos os personagens favoritados
  *@function fetchFavPersonagens
  *@param { Personagem[] } personagens    Array de objetos do tipo Personagem
  *@returns {  tipos.ActionType } payload: Array de personagens favoritados
  */
export const fetchFavPersonagens = (personagens: tipos.Personagem[]): tipos.ActionType => (
  {
    type: tipos.FETCH_PERSONAGENS_FAVORITO,
    payload: personagens,
  }
)
/**
  *Busca apenas um personagem
  *@function fetchPersonagem
  *@param { Personagem } personagem   Objeto do tipo Personagem
  *@returns { tipos.ActionType } payload: Um objeto do tipo personagem
  */
export const fetchPersonagem = (personagem: tipos.Personagem):tipos.ActionType => (
  {
    type: tipos.FETCH_PERSONAGEM,
    payload: personagem,
  }
)
/**
  *Busca por todos os episódios de um determinado personagem
  *@function fetchEpisodios
  *@param { Episodio[] } episodios  Array de objetos do tipo episódio
  *@returns { tipos.ActionType } payload: Um array de episódios
  */
export const fetchEpisodios = (episodios: tipos.Episodio[]): tipos.ActionType => (
  {
    type: tipos.FETCH_EPISODIOS,
    payload: episodios,
  } 
)
/**
  *Faz uma requisição API  buscando por todos os personagens, adiciona a propriedade 'favorito' e utiliza o fetchPersonagensSuccess() para salvá-los
  *
  *
  *@async
  *@function fetchPersonagensThunk
  */
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

/**
  *Faz uma requisição API de acordo com o filtro recebido por parâmetro e adiciona a propriedade 'favorito' nos objetos recebidos. Utiliza o fetchPersonagensSuccess para salvá-los
  *@async
  *@function filterPersonagensThunk
  *@param { string } filtro   String necessária para filtrar os personagens
  */
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

/**
  *Faz uma requisição API para recuperar os personagens que foram favoritados e alterar o estado do favorito para true. Utiliza o fetchFavPersonagens para salvá-los
  *@async
  *@function fetchFavPersonagensThunk
  *@param { number[] } idPersonagens  Array de IDs necessário para recuperar os personagens
  */
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

/**
  *Altera a página a ser renderizada na tela de início de acordo com  o endpoint recebido por parâmetro e utiliza o fetchPersonagensSuccess para salvar os dados
  *
  *@async
  *@function fetchNovaPaginaThunk
  *@param { string } url  Endpoint da nova página a ser renderizada
  */
export const fetchNovaPaginaThunk = (url: string) => async (dispatch:any) => {

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

/**
  *Faz uma requisição API para recuperar apenas um personagem de acordo com o ID recebido por parâmetro e salva-o usando o fetchPersonagem()
  *@async
  *@function fetchPersonagemThunk
  *@param { string } id   ID usado para recuperar determinado personagem
  */
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
/**
  *Faz uma requisição API para recuperar todos os episódios que determinado personagem participou e usa o fetchEpisodios() para salvá-los
  *@async
  *@function fetchEpisodiosThunk
  *@param { string[] } idEpisodios  Lista de IDs dos Episódios a serem recuperados
  */
export const fetchEpisodiosThunk = (idEpisodios: string[]) => async(dispatch: any) => {
  
  try {
    let auxArray = [];
    const response = await fetch(`https://rickandmortyapi.com/api/episode/${idEpisodios}`);
    const data = await response.json();
  
    if(!Array.isArray(data)) {
      auxArray.push(data);  
    } else {
      auxArray.push(...data);
    }


    dispatch(fetchEpisodios(auxArray));

  } catch(error: any) {
    dispatch(fetchPersonagensError(error.message));
  }
}
