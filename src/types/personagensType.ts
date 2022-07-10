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

export interface Info {
  count: number;
  pages: number;
  next: string | null;
  prev: string | null;
}

export interface ApiData {
  info: Info,
  results: Personagem[]
}

export interface Episodio {
  id: number;
  name: string;
  air_date: string;
  episode: string;
  characters: string[];
  url: string;
  created: string;
}

export type ActionType = {
  type: string;
  payload?: any;
}

export type RootState = {
  personagens: Personagem[];
}

export const FETCH_PERSONAGEM = 'FETCH_PERSONAGEM';
export const FETCH_PERSONAGENS_STARTED = 'FETCH_PERSONAGENS_STARTED';
export const FETCH_PERSONAGENS_SUCCESS = 'FETCH_PERSONAGENS_SUCCESS';
export const FETCH_PERSONAGENS_ERROR = 'FETCH_PERSONAGENS_ERROR';
export const FETCH_EPISODIOS = 'FETCH_EPISODIOS';
export const UPDATE_PERSONAGEM_FAVORITO_STATUS = 'UPDATE_PERSONAGEM_FAVORITO_STATUS';
export const FETCH_PERSONAGENS_FAVORITO = 'FETCH_PERSONAGENS_FAVORITO';
export const REMOVER_TODOS_FAVS = 'REMOVER_TODOS_FAVS';  


