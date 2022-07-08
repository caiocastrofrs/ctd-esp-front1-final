export interface Personagem {
  id: number;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  origin: object;
  location: object;
  image: string;
  episode: string;
  url: string;
  created: string;
  favorito: boolean;
}

export const FETCH_PERSONAGENS_STARTED = 'FETCH_PERSONAGENS_STARTED';
export const FETCH_PERSONAGENS_SUCCESS = 'FETCH_PERSONAGENS_SUCCESS';
export const FETCH_PERSONAGENS_ERROR = 'FETCH_PERSONAGENS_ERROR';

export const UPDATE_PERSONAGEM_FAVORITO_STATUS = 'UPDATE_PERSONAGEM_FAVORITO_STATUS';
export const FETCH_PERSONAGENS_FAVORITO = 'FETCH_PERSONAGENS_FAVORITO';
export const REMOVER_TODOS_FAVS = 'REMOVER_TODOS_FAVS';  

export type ActionType = {
  type: string;
  payload?: any;
}

export type RootState = {
  personagens: Personagem[];
}
