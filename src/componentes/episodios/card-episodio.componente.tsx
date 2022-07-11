import {Episodio} from "../../types/personagensType";
import "./card-episodio.css";

type Props = {
  episodio: Episodio,
}

/**
 * Card para cada episódio na visualização do personagem.
 *
 * Você precisará adicionar as propriedades necessárias para exibir os dados dos episódios
 *
 * @returns Elemento JSX
 */
const CardEpisodio = ({ episodio }: Props) => {
  return (
    <div className="card-episodio">
      <h4>{episodio.name}</h4>
      <div>
        <span>{episodio.episode}</span>
        <span>{episodio.air_date}</span>
      </div>
    </div>
  );
};

export default CardEpisodio;
