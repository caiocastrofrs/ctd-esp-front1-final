import "./botao-favorito.css";
import { MouseEventHandler } from 'react';
import solidHeart from '../../icons/heart-solid.svg';
import regularHeart from '../../icons/heart-regular.svg';

/**
 * Botão que indica se um elemento é favorito ou não, e dá a possibilidade de marcá-lo/desmarcá-lo
 *
 * Terá que tipar as propriedades se utilizar este componente
 *
 *
 * @returns Elemento JSX
 */

type Props = {
  isFavorito: boolean;
  favoritoHandler?: MouseEventHandler; 
}

const BotaoFavorito = ({ isFavorito , favoritoHandler }: Props) => {
  
  const src = isFavorito ? solidHeart : regularHeart;

  return (
    <button onClick={favoritoHandler} className="botao-favorito">
      <img src={src} alt="heart icon" />
    </button>
  );
};

export default BotaoFavorito;
