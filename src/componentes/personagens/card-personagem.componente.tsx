import BotaoFavorito from "../botoes/botao-favorito.componente";
import "./card-personagem.css";
import { Personagem, RootState } from "../../types/personagensType";
import store from '../../store/index';
import { bindActionCreators } from 'redux';
import {updateFavPersonagem} from "../../store/actions/personagens.actions";
import { connect } from 'react-redux';

/**
 * Card para cada personagem dentro da grade de personagem.
 *
 * Você precisará adicionar as propriedades necessárias para exibir os dados dos personagens
 *
 *
 * @returns Elemento JSX
 */
type Props = {
  personagem: Personagem;
}

const CardPersonagem = ({ personagem }: Props) => {
  
  const favoritoHandler = () => { 
    store.dispatch(updateFavPersonagem(personagem.id));
  }

  return (
    <div className="card-personagem">
      <img
        src={personagem?.image}
        alt={personagem?.name}
      />
      <div className="card-personagem-body">
        <span>{personagem?.name}</span>
        <BotaoFavorito isFavorito={personagem.favorito} favoritoHandler={favoritoHandler}/>
      </div>
    </div>
  );
};

const mapStateToProps = (state: RootState) => ({
  personagens: state.personagens
})

const mapDispatchToProps = (dispatch: any) => {
  return bindActionCreators({ updateFavPersonagem }, dispatch)
}


export default connect(mapStateToProps, mapDispatchToProps)(CardPersonagem);
