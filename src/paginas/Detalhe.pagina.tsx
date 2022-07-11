import "./Detalhe.css";
import BotaoFavorito from "../componentes/botoes/botao-favorito.componente";
import CardEpisodio from "../componentes/episodios/card-episodio.componente";
import { bindActionCreators } from 'redux';
import { connect } from "react-redux";
import { fetchEpisodiosThunk, fetchPersonagemThunk, updateFavPersonagem } from "../store/actions/personagens.actions";
import { RootState, Episodio } from "../types/personagensType";
import store from '../store/index';
import {useEffect} from "react";
import { useParams } from "react-router-dom";
import {Helmet} from "react-helmet";
import {getEpisodiosId} from "../utils/utils";

/**
 * Esta é a página de detalhes. Aqui você pode mostrar a visão do personagem selecionado junto com a lista de episódios em que ele aparece
 *
 * TRABALHAR NESTE ARQUIVO É OPCIONAL E NÃO É NECESSÁRIO PARA APROVAÇÃO
 *
 *
 *
 * Uso:
 * ``` <PaginaDetalhe /> ```
 *
 * @returns Página de detalhe
 */
const PaginaDetalhe = () => {
  const { id } = useParams();

  const { personagem, isFetching, episodios } = store.getState().personagens;
 
  const favoritoHandler = () => {

    store.dispatch(updateFavPersonagem(personagem.id))

  }

  useEffect(() => {

    if(id) fetchPersonagemThunk(id)(store.dispatch)

  },[])

  useEffect(() => {
    if(personagem.episode) {

      let idEpisodios = getEpisodiosId(personagem.episode);

      fetchEpisodiosThunk(idEpisodios)(store.dispatch);
      
    }

  },[personagem.episode])

  return (
    <>
    {isFetching && <span>Carregando personagem...</span>}
    {!isFetching && 
      <div className="container">
        <Helmet>
          <title>{personagem?.name}</title>
          <link type="image/png" sizes="32x32" rel="icon" href="https://img.icons8.com/plasticine/100/000000/morty-smith.png" />
        </Helmet>
        <h3>{personagem?.name}</h3>
        <div className={"detalhe"}>
          <div className={"detalhe-header"}>
            <img
              src={personagem?.image}
              alt={personagem?.name}
            />
            <div className={"detalhe-header-texto"}>
              <p>{personagem?.name}</p>
              <p>Planeta: {personagem?.origin?.name}</p>
              <p>Genero: {personagem?.gender}</p>
            </div>
            <BotaoFavorito isFavorito={personagem?.favorito} favoritoHandler={favoritoHandler} />
          </div>
        </div>
        <h4>Lista de episódios em que o personagem apareceu</h4>
      <div className={"episodios-grade"}>
        {episodios.length && 
          episodios.map((episodio: Episodio) => {
            return <CardEpisodio episodio={episodio} key={episodio.id} />
          })
        }
      </div>
    </div>}
    </>)
}


const mapStateToProps = (state: RootState) => ({
  personagens: state.personagens,
})

const mapDispatchToProps = (dispatch: any) => {
  return bindActionCreators({ fetchPersonagemThunk, updateFavPersonagem }, dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps)(PaginaDetalhe);
