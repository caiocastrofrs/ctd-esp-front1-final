import { Personagem } from "../types/personagensType";


// Função que adiciona o atributo 'Favorito' em um objeto
export const addCampoFavoritoEmObj = (obj: Personagem, initialValue = false) => ({...obj,favorito: initialValue})

