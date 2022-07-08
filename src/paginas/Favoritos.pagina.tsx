import GradePersonagens from "../componentes/personagens/grade-personagens.componente";
import store from '../store/index';
import { connect } from 'react-redux';
import { RootState } from '../types/personagensType';
import { useEffect, useState } from "react";
import { Personagem } from '../types/personagensType';
import { fetchPersonagensStarted, removerTodosFavs } from "../store/actions/personagens.actions";
import { bindActionCreators } from 'redux';

/**
 * Esta é a página de favoritos. Aqui você deve ver todos os personagens marcados como favoritos
 *
 * Uso:
 * ``` <PaginaFavoritos /> ```
 *
 * @returns Página de favoritos
 */
const PaginaFavoritos = () => {
  const { personagens } = store.getState().personagens;

  const personagensFiltrados = personagens.filter((personagem: Personagem) => personagem.favorito ?? personagem); 

  
  const removerFavsHandler = () => {
    store.dispatch(removerTodosFavs());
  }

  return (
    <div className="container">
      <div className="actions">
        <h3>Personagens Favoritos</h3>
        <button className="danger" onClick={removerFavsHandler}>Remover favoritos</button>
      </div>
      <GradePersonagens personagens={personagensFiltrados}/>
    </div>
  );
};


const mapStateToProps = (state: RootState) => ({
  personagens: state.personagens
})

const mapDispatchToProps = (dispatch: any) => {
  return  bindActionCreators({ removerTodosFavs }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(PaginaFavoritos);
